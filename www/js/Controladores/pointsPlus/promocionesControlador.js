aplicacion.controller('promocionesControlador', ['$scope','$state','$firebaseArray',function ($scope,$state,$firebaseArray) {
  var ref = new Firebase("https://servidorbmn.firebaseio.com/configuracion/promociones");

  var lecturaBaseDeDatos = $firebaseArray(ref);

  lecturaBaseDeDatos.$loaded()
     .then(function(x) {
       $scope.lecturaBaseDeDatos = lecturaBaseDeDatos;
     });

     $scope.pagosAbrir = function(precioRecibido,descripcionRecibida, promoPointsRecibidos){
      $state.go('detallesFacturacion', {precio:precioRecibido, descripcion:descripcionRecibida, compra:{tipoDeCompra: 'promocion', promoPoints: promoPointsRecibidos, tipo:null,tiempo:null,duracionDeCompra:null,idPublicidad:null,urlRecibida:null}});
     }
}])
