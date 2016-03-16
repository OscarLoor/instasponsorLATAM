aplicacion.controller('promocionarFollowsControlador', ['$scope','$state','$ionicPopup','$state','$ionicHistory','$firebaseArray',function ($scope,$state,$ionicPopup,$state,$ionicHistory,$firebaseArray) {
  var ref = new Firebase("https://servidorbmn.firebaseio.com/configuracion/promocionarFollows");

  var lecturaBaseDeDatos = $firebaseArray(ref);

  lecturaBaseDeDatos.$loaded()
     .then(function(x) {
       $scope.lecturaBaseDeDatos = lecturaBaseDeDatos;
     });

 // A confirm dialog
 $scope.confirmarNumeroDeFollows = function(promoPoints, valido) {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Promocionar Follows',
     template: 'Se descontarán '+promoPoints+' promo points de tu cuenta. ¿Estás seguro?',
    cancelText: 'No',
        okText: 'Si'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log("Valido "+valido);
       var alertPopup = $ionicPopup.alert({
         title: '¡Gracias por tu pedido!',
         template: '¡Será promocionado durante los siguientes días!'
       });

       alertPopup.then(function(res) {
         $ionicHistory.nextViewOptions({
          disableBack: true
         });

         $state.go('menuPrincipal'); //Redirige hacia una ruta
       });
     } else {
       console.log('No');
     }
   });
 };
}])
