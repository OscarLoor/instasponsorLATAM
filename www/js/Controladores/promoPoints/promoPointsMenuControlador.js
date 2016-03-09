aplicacion.controller('promoPointsMenuControlador', ['$scope','$state',function ($scope,$state) {

  $scope.likeAbrir = function(){
  $state.go('promoPointsLike'); //Redirige hacia una ruta
 }
  
  $scope.followAbrir = function(){
  $state.go('promoPointsFollow'); //Redirige hacia una ruta
 }
}])