aplicacion.controller('pointsPlusCorporatePublicidadControlador', ['$scope', '$state', '$firebaseArray', function($scope, $state, $firebaseArray) {

  var ref = new Firebase("https://servidorbmn.firebaseio.com/configuracion/publicidad");

  var lecturaBaseDeDatos = $firebaseArray(ref);

  lecturaBaseDeDatos.$loaded()
    .then(function(x) {
      $scope.lecturaBaseDeDatos = lecturaBaseDeDatos;
    });

  $scope.pagosAbrir = function(precioRecibido, descripcionRecibida, tipoRecibido, tiempoRecibido, duracionRecibida) {
    //console.log(tipoRecibido)
    $state.go('pointsPlusCorporateSeleccionarArchivo', {
      precio: precioRecibido,
      descripcion: descripcionRecibida,
      compra: {
        tipoDeCompra: 'publicidad',
        promoPoints: null,
        tipo: tipoRecibido, //Banner, Video
        tiempo: tiempoRecibido, //Tiempo en segundos
        duracionDeCompra: duracionRecibida //semanal, mensual
      }
    });
  }//pagosAbrir

}])//CONTROLADOR
