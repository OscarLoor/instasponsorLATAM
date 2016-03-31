aplicacion.controller('duplicaTusPuntosControlador', ['$scope', '$state', '$firebaseArray', function($scope, $state, $firebaseArray) {

      var ref = new Firebase("https://servidorbmn.firebaseio.com/configuracion/duplicaTusPuntos");

      var lecturaBaseDeDatos = $firebaseArray(ref);

      lecturaBaseDeDatos.$loaded()
        .then(function(x) {
          $scope.lecturaBaseDeDatos = lecturaBaseDeDatos;
        });

      $scope.pagosAbrir = function(precioRecibido, descripcionRecibida) {
        $state.go('detallesFacturacion', {
              precio: precioRecibido,
              descripcion: descripcionRecibida,
              compra: {
                tipoDeCompra: 'duplicaTusPuntos',
                promoPoints: null,
                tipo: null, //Banner, Video
                tiempo: null, //Tiempo en segundos
                duracionDeCompra: null, //semanal, mensual
                idPublicidad: null,
                urlPublicidad: null
              }
            }); //state
          } //pagosAbrir
      }]) //CONTROLADOR
