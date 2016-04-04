aplicacion.controller('tarjetaDeCreditoControlador', ['$scope', '$state', '$http', '$stateParams','$ionicPopup','$firebaseArray','parametrosUsuarioFactory','$ionicHistory', function($scope, $state, $http, $stateParams, $ionicPopup, $firebaseArray, parametrosUsuarioFactory, $ionicHistory) {
  $scope.datosTarjeta = {};

  $scope.precio = $stateParams.precio;
  $scope.descripcion = $stateParams.descripcion;

  /*
  Eliminar la siguiente información despues
  */
  $scope.datosTarjeta.numeroDeTarjeta = '4000000000000002';
  $scope.datosTarjeta.CVC = '123';
  $scope.datosTarjeta.mesDeExpiracion = '11';
  $scope.datosTarjeta.anoDeExpiracion = '2017';
var myPopup;
myPopup = $ionicPopup.show({
  title: 'Cargando',
  template: '<ion-spinner icon="spiral"></ion-spinner>'
});
$.getScript('https://www.2checkout.com/checkout/api/2co.min.js', function() {
                    try {
                          myPopup.close();
                            // Pull in the public encryption key for our environment
                            TCO.loadPubKey('sandbox');


                        } catch(e) {
                          myPopup.close();
                          $ionicPopup.confirm({
                              title: 'ERROR',
                              content: 'Vuelve a intentarlo, o selecciona otro método de pago'
                            })
                            .then(function(result) {
                              $ionicHistory.goBack();
                            });

                        }
                });

  var tokenRequest = function() {
    // Setup token request arguments
    var args = {
      sellerId: "901308762",
      publishableKey: "1852A139-0A09-46DA-8853-11D1241EC6FC",
      ccNo: $scope.datosTarjeta.numeroDeTarjeta,
      cvv: $scope.datosTarjeta.CVC,
      expMonth: $scope.datosTarjeta.mesDeExpiracion,
      expYear: $scope.datosTarjeta.anoDeExpiracion
    };

    /*
    Envio solicitud de token al servidor
    */

    TCO.requestToken(function(correct) {
      /*
      Si el servidor envío el token
      */
      var token = correct.response.token.token;

      /*
      Envio la compra con el token entregado
      */
      // Simple GET request example:
      $http({
        method: 'POST',
        //url: 'https://sandbox.2checkout.com/checkout/api/1/901308762/rs/authService',
        url: 'https://warm-sea-11569.herokuapp.com/apiPagoTarjeta',
        data: {
          tokenEnviado: token,
          nombre: $stateParams.usuario.nombre,
          apellido: $stateParams.usuario.apellido,
          email: $stateParams.usuario.email,
          telefono: $stateParams.usuario.telefono,
          provincia: $stateParams.usuario.provincia,
          ciudad: $stateParams.usuario.ciudad,
          direccion: $stateParams.usuario.direccion,
          pais: $stateParams.usuario.pais,
          precio: $stateParams.precio,
          merchantOrderId: $stateParams.descripcion
        }
      }).then(function successCallback(response) {
        /*
        Si se realizo correctamente la llamada al servidor y este realizo la compra en 2CO
        */

        /*
        Guardo la compra en la base de datos
        */
        var referenciaCompra = new Firebase("https://servidorbmn.firebaseio.com/compras/tarjetasDeCredito");
        var lecturaReferenciaCompra = $firebaseArray(referenciaCompra);
        lecturaReferenciaCompra.$loaded()
          .then(function(x) {
            lecturaReferenciaCompra.$add({
              apellido: $stateParams.usuario.apellido,
              ciudad: $stateParams.usuario.ciudad,
              direccion: $stateParams.usuario.direccion,
              email: $stateParams.usuario.email,
              nombre: $stateParams.usuario.nombre,
              pais: $stateParams.usuario.pais,
              provincia: $stateParams.usuario.provincia,
              telefono: $stateParams.usuario.telefono,
              precio: $stateParams.precio,
              descripcion: $stateParams.descripcion,
              timestamp: Firebase.ServerValue.TIMESTAMP,
              idUsuario: parametrosUsuarioFactory.obtenerIdUsuario(),
              verificado: true,
              tipoDeCompra: $stateParams.compra.tipoDeCompra,
              promoPoints: $stateParams.compra.promoPoints,
              tipo:$stateParams.compra.tipo,
              tiempo:$stateParams.compra.tiempo,
              duracionDeCompra:$stateParams.compra.duracionDeCompra,
              idPublicidad:$stateParams.compra.idPublicidad,
              urlPublicidad: $stateParams.compra.urlPublicidad
            }).then(function(ref) {

              /*
              Si se agrego correctamente el registro en la base de datos
              */

              /*

              FALTA EL CODIGO PARA ACTIVAR LOS DIFERENTES SERVICIOS

              */
              myPopup.close();
              $ionicPopup.confirm({
                  title: 'Compra finalizada',
                  content: 'Te enviaremos la factura al email ingresado'
                })
                .then(function(result) {});

                $ionicHistory.nextViewOptions({
                  disableBack: true
                });

                $ionicHistory.clearHistory();
                $ionicHistory.clearCache().then(function() {
                  $state.go('menuPrincipal');
                });

            }); //add -then


          }) //$loaded - then
          .catch(function(error) {

            /*
            Si existe algun error para cargar la referencia con firebase
            */
            myPopup.close();
            $ionicPopup.confirm({
                title: 'ERROR',
                content: JSON.stringify(error)
              })
              .then(function(result) {});
          }); //$loaded - catch

      }, function errorCallback(response) {

        /*
        Si se realizo no se realizo la compra con el servidor en 2CO
        */

        myPopup.close();
        $ionicPopup.confirm({
            title: 'Servidor Error',
            content: JSON.stringify(response)
          })
          .then(function(result) {});
      });


    }, function(error) {
      /*
      Si existe error con la solicitud de token con el servidor
      */

      if (error.errorCode === 200) {
        // This error code indicates that the ajax call failed. We recommend that you retry the token request.
        myPopup.close();
        $ionicPopup.confirm({
            title: 'Fallo con la comunicación',
            content: 'Se presentó un error con la comunicación, vuelve a intentarlo'
          })
          .then(function(result) {});
      } else {
        myPopup.close();
        $ionicPopup.confirm({
            title: 'Token Error',
            content: JSON.stringify(error.errorMsg)
          })
          .then(function(result) {});
      }
    }, args);
  };


  $scope.finalizarCompra = function() {
    myPopup = $ionicPopup.show({
      title: 'Cargando',
      template: '<ion-spinner icon="spiral"></ion-spinner>'
    });
    if ($scope.datosTarjeta.numeroDeTarjeta == undefined || $scope.datosTarjeta.CVC == undefined || $scope.datosTarjeta.mesDeExpiracion == undefined || $scope.datosTarjeta.anoDeExpiracion == undefined || $scope.datosTarjeta.numeroDeTarjeta.length == 0 || $scope.datosTarjeta.CVC.length == 0 || $scope.datosTarjeta.mesDeExpiracion.length == 0 || $scope.datosTarjeta.anoDeExpiracion.length == 0) {
      myPopup.close();
      $ionicPopup.confirm({
          title: 'ERROR',
          content: 'Los campos requeridos están marcados con *'
        })
        .then(function(result) {});
    } else {
      tokenRequest();
    }


  }

  // Called when token created successfully.



}])
