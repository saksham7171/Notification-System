# Notification-System

```
A demo application using node.js and angular.js . It allows users to get notified in realtime via email when their subscribed data is changed.
```

# Required-Software

1. Node
2. Bower
3. MongoDB

# Steps to use
```
1. Clone this repo.
2. cd to Notification_System
3. Run bower install
4. Create a database named 'demo' in mongodb
5. cd to node folder and execute command 'node main.js'
6. Open your browser and hit ' localhost:8081/createUsers ' to create Dummy users
7. Open index.html in browser
```

# Configuration

1. You can create and configure users email id to receive Mail Notification.

```
 var user1={_id:1,"name":"Dummy User","email":"","data":"My dummy user data","subscribers":[],"subscribed":false};
 var user2={_id:2,"name":"Saksham gmail","email":"saksham.shrm03@gmail.com","data":"","subscribers":[],"subscribed":false};
 var user3={_id:3,"name":"Saksham hotmail","email":"saksham.shrm03@hotmail.com","data":"","subscribers":[],"subscribed":false};
 
```

`*** Don't Forget to Configure Email ids else you won't receive notifications ***`



