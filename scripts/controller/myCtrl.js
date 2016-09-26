'use strict';

app.controller('myCtrl',['$scope','$http','toastr', function ($scope,$http,toastr) {
    
       var API='http://localhost:8081/';
        $scope.temp=API;
        
       var getMainUser=function(){ 
           $http({
            method: 'GET',
            url: API+'user'
            }).
            success(function(response) {
                $scope.user=response;
            }).
            error(function(status) {
                //your code when fails
            });
       } 
       var getUsers=function(){ 
           $http({
            method: 'GET',
            url: API+'users'
            }).
            success(function(response) {
                $scope.userList=response;
            }).
            error(function(status) {
                //your code when fails
            });
       }
       
       getMainUser();
       getUsers();
    
    $scope.subscribe=function(id){
        $scope.editable=true;
          $http({
            method: 'OPTIONS',
            data:id,
            url: API+'subscribe'
        }).
        success(function(response) {
              toastr.success(response);
              getUsers();
        }).
        error(function(status) {
            toastr.error(status);
        });  
        
    }
    
    $scope.unsubscribe=function(id){
        $scope.editable=true;
          $http({
            method: 'OPTIONS',
            data:id,
            url: API+'unsubscribe'
        }).
        success(function(response) {
           toastr.success(response);
           getUsers();
        }).
        error(function(status) {
           toastr.error(status);
        });  
       
    }
    
    $scope.save=function(){
        $scope.editable=true;
          $http({
            method: 'OPTIONS',
            data:$scope.user,
            url: API+'update'
        }).
        success(function(response) {
           console.log(response);
              toastr.success(response);
        }).
        error(function(status) {
           toastr.error(status);
        });
    };
      
    }]);