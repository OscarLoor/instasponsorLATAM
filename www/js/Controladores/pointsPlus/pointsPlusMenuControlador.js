aplicacion.controller('pointsPlusMenuControlador', ['$scope','$state',function ($scope,$state) {

   $scope.duplicaTusPuntosAbrir = function(){
  $state.go('duplicaTusPuntos'); //Redirige hacia una ruta
 }
   
   $scope.suscribeteAbrir = function(){
  $state.go('suscribete'); //Redirige hacia una ruta
 }
   
   $scope.promocionesAbrir = function(){
  $state.go('promociones'); //Redirige hacia una ruta
 }
   
   $scope.tarifasAbrir = function(){
  $state.go('tarifas'); //Redirige hacia una ruta
 }
}])