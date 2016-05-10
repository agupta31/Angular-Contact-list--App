
var myApp=angular.module("contactApp",["ui.router","ngRoute"]);

myApp.config(function($stateProvider,$routeProvider){
    
      $stateProvider.
         state("form",{
            url:"/form",
            templateUrl:"form.html",
            controller:"appCtrl"
              
      })
          
});

myApp.service("myService",function($http){
     
        this.getData=function(){
            
              return $http({
                      method:"get",
                      url:"/contactList"
              })
        };
    
        this.addRecord=function(formData){
            console.log(formData);
             $http({
                   method:"post",
                    url:"/contactList",
                    data:formData
             })
        };
        
       this.editRecord=function(dataItem){
             
           return $http({
                 method:"get",
                 url:"/contactList/"+dataItem._id
           });
       };
    
        this.updateRecord=function(data){
              console.log(data._id);
            
              $http({
                     method:"put",
                     url:"/contactList/"+data._id,
                     data:data
              });
               
        };
    
       this.deleteRecord=function(dataItem){
             
           $http({
               method:"delete",
               url:"/contactList/"+dataItem._id
           });
        }
    
});
myApp.controller("appCtrl",function($scope,myService){
    //function which displays my data from the database
      function refresh(){
      myService.getData().then(function(responseText){
            $scope.items=responseText.data;
      });
      }
    refresh();
    
    //function for adding a record
     $scope.addItem=function(){
          myService.addRecord($scope.item);
           refresh();
          $scope.item="";
     };
    
    //function for editing a particular item
    
    $scope.editItem=function(dataItem){
       myService.editRecord(dataItem).then(function(responseText){
           
              $scope.items=responseText.data;
       });
             
    };
    
    $scope.updateItem=function(){
          
          myService.updateRecord($scope.item);
                
          refresh();
          $scope.items="";
    };
    
    $scope.deleteItem=function(dataItem){
        
        myService.deleteRecord(dataItem);
        refresh();
    }
       
});


myApp.directive("contacts",function(){
    
      return{
            
            templateUrl:"contacts.html",
            replace:true,
            scope:{
                 itemObj:"=",
                  editItemObj:"&",
                  deleteItemObj:"&"
            }
      }
});
    
