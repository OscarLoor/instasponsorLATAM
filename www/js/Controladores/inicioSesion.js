aplicacion.controller('iniciarSesionControlador', ['$scope', '$cordovaOauth', '$http', '$ionicPlatform', function ($scope, $cordovaOauth, $http, $ionicPlatform) {
 $scope.login = function () {
  var igClientId = "4414c79c1d9d4ee9b027bf208331ccd1";
  $ionicPlatform.ready(function () {
   $cordovaOauth.instagram(igClientId, ["scope=basic"]).then(function (result) {
    var token = result.access_token; //Obtengo el token

    //Creo la URL con el token recibido
    var url = "https://api.instagram.com/v1/users/self/?access_token=" + token + "&callback=JSON_CALLBACK";

    //Hago la llamada a la API de Instagram
    $http.jsonp(url).success(function (data) {
     console.log(data.data)
     $scope.nombre = data.data.full_name
     $scope.imagenDePerfil = data.data.profile_picture
     $scope.idUsuario = data.data.id
    });



   }, function (error) {
    $scope.respuesta = error;
   });
  });

 };

}])