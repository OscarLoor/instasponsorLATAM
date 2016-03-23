aplicacion.controller('promoPointsPorDiasControlador', ['$scope','$state',function ($scope,$state) {

$scope.menuPrincipal = function(){
  $state.go('menuPrincipal'); //Redirige hacia una ruta
 }

}])
