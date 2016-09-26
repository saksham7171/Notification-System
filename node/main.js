var http = require("http");
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var nodemailer = require('nodemailer');
var url = 'mongodb://localhost:27017/demo';

var server=http.createServer(function (request, response) {
    allowCORS(request,response);
    
    var transporter = nodemailer.createTransport('smtps://{{email-id}}:{{password}}@smtp.gmail.com');

    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        console.log('Connection established to', url);

        var collection = db.collection('users');
   
        if (request.url === '/favicon.ico') {
            response.writeHead(200, {'Content-Type': 'image/x-icon'} );
            response.end();
            console.log('favicon requested');
        return;
        }
        else if(request.url==='/user'){
           response.writeHead('Content-Type', 'application/json');
           
             collection.find({_id: 1}).toArray(function (err, result) {
              if (err) {
                console.log(err);
              } else if (result.length) {
                console.log('Found:', result);
                response.end(JSON.stringify(result[0]));
              } else {
                console.log('No document(s) found with defined "find" criteria!');
              }  
	       });
        }
        else if(request.url==='/createUsers'){
           response.writeHead('Content-Type', 'application/json');
            var user1={_id:1,"name":"Dummy User","email":"","data":"My dummy user data","subscribers":[],"subscribed":false};
            var user2={_id:2,"name":"Saksham gmail","email":"saksham.shrm03@gmail.com","data":"","subscribers":[],"subscribed":false};
            var user3={_id:3,"name":"Saksham hotmail","email":"saksham.shrm03@hotmail.com","data":"","subscribers":[],"subscribed":false};
            
           db.createCollection('users', function(err, collection) {
                 collection.insert([user1, user2, user3], function (err, result) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                  }
                 });
           });
           response.end("Database Created");
        }
        else if(request.url==='/users'){
           response.writeHead('Content-Type', 'application/json');
           
             collection.find({_id:{$gt:1}}).toArray(function (err, result) {
              if (err) {
                console.log(err);
              } else if (result.length) {
                console.log('Found:', result);
                response.end(JSON.stringify(result));
              } else {
                console.log('No document(s) found with defined "find" criteria!');
              }  
	       });
        } 
          else if(request.url==='/subscribe'){
            var id;
            if (request.method == 'OPTIONS') {
                request.on('data', function (data) {
                    id=(JSON.parse(data));
                    console.log("Request payload: " + id);
                      collection.update({_id:id }, {$set: {'subscribed': true}}, function (err, numUpdated) {
                          if (err) {
                            console.log(err);
                          } else if (numUpdated) {
                            console.log('Updated Successfully document(s) with', data);
                          } else {
                            console.log('No document found with defined "find" criteria!');
                          }
                      });
                     collection.update({_id:1 }, {$push: {'subscribers': id}}, function (err, numUpdated) {
                          if (err) {
                            console.log(err);
                          } else if (numUpdated) {
                            console.log('Updated Successfully document(s) with', data);
                          } else {
                            console.log('No document found with defined "find" criteria!');
                          }
                      });
                  });  
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end('Successfully Subscribed !!');
            }
        } 
          else if(request.url==='/unsubscribe'){
            var id;
            if (request.method == 'OPTIONS') {
                request.on('data', function (data) {
                    id=(JSON.parse(data));
                    console.log("Request payload: " + id);
                      collection.update({_id:id }, {$set: {'subscribed': false}}, function (err, numUpdated) {
                          if (err) {
                            console.log(err);
                          } else if (numUpdated) {
                            console.log('Updated Successfully document(s) with', data);
                          } else {
                            console.log('No document found with defined "find" criteria!');
                          }
                      }); 
                    collection.update({_id:1 }, {$pull: {'subscribers': id}}, function (err, numUpdated) {
                          if (err) {
                            console.log(err);
                          } else if (numUpdated) {
                            console.log('Updated Successfully document(s) with', data);
                          } else {
                            console.log('No document found with defined "find" criteria!');
                          }
                      });
                  });  
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end('Successfully Unsubscribed !!');
            }
        }
        else if(request.url==='/update'){
             var id,data;
            if (request.method == 'OPTIONS') {
                request.on('data', function (data) {
                    id=(JSON.parse(data))._id;
                    data=(JSON.parse(data)).data;
                    console.log("Request payload: " + id+ "Data:"+data);
                    
                      collection.update({_id:id }, {$set: {'data': data}}, function (err, numUpdated) {
                          if (err) {
                            console.log(err);
                          } else if (numUpdated) {
                            console.log('Updated Successfully document(s) with', data);
                          } else {
                            console.log('No document found with defined "find" criteria!');
                          }
                      });
                    
                     collection.find({_id:id }).toArray(function (err, result) {
                      if (err) {
                        console.log(err);
                      } else if (result.length) {
                        console.log('Found:', result);
                        console.log('subscribers:', result[0].subscribers);

                     result[0].subscribers.forEach(function(id){
                        collection.find({_id: id}).toArray(function (err, result) {
                              if (err) {
                                console.log(err);
                              } else if (result.length) {
                                console.log('Found:', result[0].email);
                                      var mailOptions = {
                                          from: 'Notification System', // sender address
                                          to: result[0].email, // list of receivers
                                          subject: 'Alert', // Subject line
                                          text: 'Hello Subscribers, Subscribed Data has been changed !!', // plaintext body
                                              // html body
                                          };
                              transporter.sendMail(mailOptions, function(error, info){
                                if(error){
                                    return console.log(error);
                                }
                                    console.log('Message sent: ' + info.response);
                                });
                              }
                        });
                     });
                    }
                });
                
                    
                  });  
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end('Successfully Updated');
            }
        }
      }
    });
});
server.listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');

var allowCORS= function(request,response){
    response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Request-Method', '*');
	response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	response.setHeader('Access-Control-Allow-Headers', '*');
};



