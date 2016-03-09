aplicacion.controller('menuPrincipalControlador', ['$scope','$state',function ($scope,$state) {

 $scope.promoPointsAbrir = function(){
  $state.go('promoPointsMenu'); //Redirige hacia una ruta
 }
}])