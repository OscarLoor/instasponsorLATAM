aplicacion.controller('iniciarSesionControlador', ['$scope', '$cordovaOauth', '$http', '$ionicPlatform','$ionicPopup','$timeout','$ionicHistory','$state',function ($scope, $cordovaOauth, $http, $ionicPlatform, $ionicPopup, $timeout,$ionicHistory,$state) {
 $scope.login = function () {
  
  //Muestro una pantalla de carga
  var myPopup = $ionicPopup.show({
   title: 'Cargando',
    template: '<ion-spinner icon="spiral"></ion-spinner>'
  });

  myPopup.then(function(res) {
    console.log('Tapped!', res);
  });

    
  
  //Configuracion de Inicio de Sesion
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

    /*
    Cambiar 
    para
    que
    solo
    cuando
    este
    correcto
    muestre*/
    
    myPopup.close();
$ionicHistory.nextViewOptions({
      disableBack: true
     });

     $state.go('seleccionarPais'); //Redirige hacia una ruta
    
        var ref = new Firebase("https://servidorbmn.firebaseio.com");
    ref.authAnonymously(function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
    
    
   }, function (error) {
    $scope.respuesta = error;
    
    myPopup.close();
    $ionicHistory.nextViewOptions({
      disableBack: true
     });

     $state.go('seleccionarPais'); //Redirige hacia una ruta
    
            var ref = new Firebase("https://servidorbmn.firebaseio.com");
    ref.authAnonymously(function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
    
    
   });
  });

 };

}])
