aplicacion.controller('tarjetaDeCreditoControlador', ['$scope', '$state','$http','$stateParams', function ($scope, $state,$http,$stateParams) {
 $scope.datosTarjeta = {};

 $scope.precio = $stateParams.precio;
 $scope.descripcion = $stateParams.descripcion;

 TCO.loadPubKey('sandbox');

 var tokenRequest = function () {
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
  TCO.requestToken(function (correct) {
   var token = correct.response.token.token;

   // Simple GET request example:
   $http({
    method: 'POST',
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
     nombreDeLaEmpresa: $stateParams.usuario.empresa,
     pais: $stateParams.usuario.pais,
     precio: "321",
     merchantOrderId: "001"
    }
   }).then(function successCallback(response) {
    console.log(response)
    // this callback will be called asynchronously
    // when the response is available
   }, function errorCallback(response) {
    console.log(response)
    // called asynchronously if an error occurs
    // or server returns response with an error status.
   });


  }, function (error) {
   if (error.errorCode === 200) {
    tokenRequest();
   } else {
    console.log(error.errorMsg);
   }
  }, args);
 };


 $scope.enviarDatos = function () {
  console.log($scope.datosTarjeta)

  tokenRequest();
 }

 // Called when token created successfully.



}])
