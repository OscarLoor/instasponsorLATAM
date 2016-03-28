aplicacion.controller('depositoTransferenciaControlador', ['$scope', '$state', '$http', '$stateParams','$firebaseArray','$ionicPopup','parametrosUsuarioFactory','$ionicHistory', function($scope, $state, $http, $stateParams,$firebaseArray, $ionicPopup, parametrosUsuarioFactory, $ionicHistory) {

  $scope.precio = $stateParams.precio
  $scope.descripcion = $stateParams.descripcion
  var myPopup;

  $scope.finalizarCompra = function() {
    myPopup = $ionicPopup.show({
      title: 'Cargando',
      template: '<ion-spinner icon="spiral"></ion-spinner>'
    });
    
      var referenciaCompra = new Firebase("https://servidorbmn.firebaseio.com/compras/depositoTransferencia");
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
            verificado: false
          }).then(function(ref) {
            myPopup.close();
            $ionicPopup.confirm({
                title: 'Compra finalizada',
                content: 'Envíanos el comprobante de la compra a nuestro email: info@bmnapp.com'
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


    } //$scope.finalizarCompra
}])
