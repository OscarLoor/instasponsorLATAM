aplicacion.controller('pointsPlusCorporateMenuControlador', ['$scope','$state',function ($scope,$state) {

   $scope.publicidadAbrir = function(){
  $state.go('pointsPlusCorporatePublicidad'); //Redirige hacia una ruta
 }
   
   $scope.reportesAbrir = function(){
  $state.go('pointsPlusCorporateReportes'); //Redirige hacia una ruta
 }
   

}])