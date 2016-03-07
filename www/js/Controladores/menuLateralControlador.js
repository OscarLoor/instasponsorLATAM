aplicacion.controller('menuLateralControlador', ['$scope','$state',function ($scope,$state) {
 $scope.cerrarSesion = function (){
  $state.go('iniciarSesion'); //Redirige hacia una ruta
 };
                                              
}])