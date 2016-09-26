'use strict';

app.controller('myCtrl',['$scope','$http','toastr', function ($scope,$http,toastr) {
    
       var API='http://localhost:8081/';
        
       var getMainUser=function(){ 
        $http({method: 'GET',url: API+'user'}).success(function(response) {
                $scope.user=response;
            })
       }; 
       
       var getUsers=function(){ 
           $http({method: 'GET',url: API+'users'}).success(function(response) {
                $scope.userList=response;
            })
       };
       
       getMainUser();
       getUsers();
    
       $scope.subscribe=function(id){
        $scope.editable=true;
          $http({method: 'OPTIONS',data:id,url: API+'subscribe'}).success(function(response) {
              toastr.success(response);
              getUsers();
          }).error(function(status) {
            toastr.error(status);
        });      
    };
    
       $scope.unsubscribe=function(id){
        $scope.editable=true;
          
        $http({method: 'OPTIONS',data:id,url: API+'unsubscribe'}).success(function(response) {
           toastr.success(response);
           getUsers();
        }).error(function(status) {
           toastr.error(status);
        });  
    };
    
       $scope.save=function(){
        $scope.editable=true;
        
        $http({method: 'OPTIONS',data:$scope.user,url: API+'update'}).success(function(response) {
           toastr.success(response);
        }).error(function(status) {
           toastr.error(status);
        });
    };
      
}]);