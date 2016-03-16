aplicacion.controller('menuLateralControlador', ['$scope','$state',function ($scope,$state) {
 $scope.cerrarSesion = function (){
  $state.go('iniciarSesion'); //Redirige hacia una ruta
 };
$scope.promoPointsAbrir = function(){
  $state.go('promoPointsMenu'); //Redirige hacia una ruta
 }

$scope.pointsPlusAbrir = function(){
  $state.go('pointsPlusMenu'); //Redirige hacia una ruta
 }

 $scope.promocionarFotosAbrir = function(){
  $state.go('promocionarFotos'); //Redirige hacia una ruta
 }
 
 $scope.promocionarFollowsAbrir = function(){
  $state.go('promocionarFollows'); //Redirige hacia una ruta
 }
 
 $scope.pointsPlusCorporateAbrir = function(){
  $state.go('pointsPlusCorporateMenu'); //Redirige hacia una ruta
 }
 
 
}])