aplicacion.controller('seleccionarPaisControlador', ['$scope','$ionicSideMenuDelegate','$state','$cordovaSQLite','$ionicPlatform','parametrosUsuarioFactory',function ($scope,$ionicSideMenuDelegate,$state, $cordovaSQLite, $ionicPlatform,parametrosUsuarioFactory) {
  ionic.Platform.ready(function() {

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };

     $scope.paisSeleccionado = function(pais){

       parametrosUsuarioFactory.actualizarPais(pais);
       $state.go('promoPointsPorDias'); //Redirige hacia una ruta

       //Guardo el pais seleccionado
      //  $cordovaSQLite.execute(db, "UPDATE usuario SET pais='"+pais+"' WHERE idInstragram='"+$scope.idUsuario+"'").then(function(res) {
      //   $state.go('promoPointsPorDias'); //Redirige hacia una ruta
      //  }, function(err) {
      //    $state.go('iniciarSesion');
      //  });//execute


     }

  });//ionicPlatform

}])
