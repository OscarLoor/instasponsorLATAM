aplicacion.controller('depositoTransferenciaControlador', ['$scope', '$state','$http','$stateParams', function ($scope, $state,$http,$stateParams) {
 $scope.precio = $stateParams.precio;
 $scope.descripcion = $stateParams.descripcion;

}])
