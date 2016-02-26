aplicacion.controller('iniciarSesionControlador', ['$scope', '$cordovaOauth', '$http','$ionicPlatform', function ($scope, $cordovaOauth, $http,$ionicPlatform) {
 var token = '2981244912.4414c79.632d91df27c64f1797d2362c0279a653';



 var url = "https://api.instagram.com/v1/users/self/?access_token=2981244912.4414c79.632d91df27c64f1797d2362c0279a653&callback=JSON_CALLBACK";

 $http.jsonp(url).success(function (data) {
  console.log(data.data)
  $scope.nombre = data.data.full_name
  $scope.imagenDePerfil = data.data.profile_picture
  $scope.idUsuario = data.data.id
 });


 $scope.login = function () {
  var igClientId = "4414c79c1d9d4ee9b027bf208331ccd1";
  $ionicPlatform.ready(function () {
   $cordovaOauth.instagram(igClientId, ["scope=basic"]).then(function (result) {
    $scope.respuesta = result.access_token; //Obtengo el token
   }, function (error) {
    $scope.respuesta = error;
   });
  });

 };

}])