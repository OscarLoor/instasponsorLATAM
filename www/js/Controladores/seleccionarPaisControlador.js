aplicacion.controller('seleccionarPaisControlador', ['$scope','$ionicSideMenuDelegate','$state',function ($scope,$ionicSideMenuDelegate,$state) {

$scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

 $scope.paisSeleccionado = function(pais){
 
  console.log(pais)
  $state.go('promoPointsPorDias'); //Redirige hacia una ruta
 }
}])