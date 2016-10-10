// Define the `phonecatApp` module
var phonecatApp = angular.module('phonecatApp', ['ui.bootstrap']);

// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('PhoneListController', function PhoneListController($scope, $http, $uibModal) {
  
  var $ctrl = this;

  $http({
    method : "GET",
    url : "/contacts"
  }).then(function success(response){
    $scope.records = response.data
  }, function error(response){
    console.log("error", response);
  });

  $ctrl.items = ['item1', 'item2', 'item3'];

  $ctrl.open = function (size, record) {
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      resolve: {
        items: function () {
          return record;
        },
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      
    });
  };

  $ctrl.delete = function (size, record) {
    console.log("delete");
    console.debug("record", record);
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent2.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: 'md',
      resolve: {
        items: function () {
          return record;
        },
      }
    });
  } 


  $ctrl.add = function (){

  }


});

angular.module('phonecatApp').controller('ModalInstanceCtrl', function ($uibModalInstance, items, $http) {
  var $ctrl = this;
  $ctrl.items = items;
  $ctrl.selected = {
    item: $ctrl.items[0]
  };

  $ctrl.update = function (user) {
    console.log("update!!!");
    console.log("user", user)
        $http({
          method : "PUT",
          url : "/contacts/"+user._id,
          data : user
        }).then(function success(response){
          console.log("success");
          $uibModalInstance.dismiss('cancel');
          // location.reload()
        }, function error(response){
          console.log("error");
        });
  } 

  $ctrl.delete = function(id){
      $http({
          method : "DELETE",
          url : "/contacts/"+id,
          data : id
        }).then(function success(response){
          console.log("success of delete");
          location.reload()
        }, function error(response){
          console.log("error of delete");
        });
  }

  $ctrl.create = function (user) {
    console.log("create!!!");
    console.log("user", user)
        $http({
          method : "POST",
          url : "/contacts",
          data : user
        }).then(function success(response){
          console.log("success");
          location.reload()
        }, function error(response){
          console.log("error");
        }); 
  }

  // $ctrl.ok = function () {
  //   $uibModalInstance.close($ctrl.selected.item);
  // };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
