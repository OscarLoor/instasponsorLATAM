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
  TCO.loadPubKey('sandbox');

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

    // Make the token request
    TCO.requestToken(function(correct) {
      var token = correct.response.token.token;

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
        Si se realizo correctamente la llamada al servidor
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
              verificado: true
            }).then(function(ref) {
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
            $ionicPopup.confirm({
                title: 'ERROR',
                content: JSON.stringify(error)
              })
              .then(function(result) {});
          }); //$loaded - catch
        console.log("Compra finalizada respuesta del servidor")
        console.log(response)
          // this callback will be called asynchronously
          // when the response is available
      }, function errorCallback(response) {
        myPopup.close();
        $ionicPopup.confirm({
            title: 'Servidor Error',
            content: JSON.stringify(response)
          })
          .then(function(result) {});
        console.log("Error")
        console.log(response)
          // called asynchronously if an error occurs
          // or server returns response with an error status.
      });


    }, function(error) {
      if (error.errorCode === 200) {
        tokenRequest();
      } else {
        myPopup.close();
        $ionicPopup.confirm({
            title: 'Token Error',
            content: JSON.stringify(error.errorMsg)
          })
          .then(function(result) {});
        console.log("Token Error")
        console.log(error.errorMsg);
      }
    }, args);
  };


  $scope.finalizarCompra = function() {
    myPopup = $ionicPopup.show({
      title: 'Cargando',
      template: '<ion-spinner icon="spiral"></ion-spinner>'
    });
    if ($scope.datosTarjeta.numeroDeTarjeta == undefined || $scope.datosTarjeta.CVC == undefined || $scope.datosTarjeta.mesDeExpiracion == undefined || $scope.datosTarjeta.anoDeExpiracion == undefined || $scope.datosTarjeta.numeroDeTarjeta.length == 0 || $scope.datosTarjeta.CVC.length == 0 || $scope.datosTarjeta.mesDeExpiracion.length == 0 || $scope.datosTarjeta.anoDeExpiracion.length == 0) {
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
