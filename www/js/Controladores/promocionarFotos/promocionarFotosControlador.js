aplicacion.controller('promocionarFotosControlador', ['$scope','$state',function ($scope,$state) {
$scope.seleccionarNumeroDeLikes = function(idImagen){
  console.log(idImagen)
  $state.go('pFNumeroDeLikes'); //Redirige hacia una ruta
 }
}])