aplicacion.controller('suscribeteControlador', ['$scope','$state','$firebaseArray',function ($scope,$state,$firebaseArray) {

 var ref = new Firebase("https://servidorbmn.firebaseio.com/configuracion/suscripcion");

 var suscripciones = $firebaseArray(ref);

 suscripciones.$loaded()
    .then(function(x) {
      $scope.suscripciones = suscripciones;
    });

 $scope.pagosAbrir = function(precioRecibido,descripcionRecibida){
  $state.go('detallesFacturacion', {precio:precioRecibido, descripcion:descripcionRecibida});
 }

}])
