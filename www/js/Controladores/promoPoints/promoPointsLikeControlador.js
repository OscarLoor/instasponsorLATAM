aplicacion.controller('promoPointsLikeControlador', ['$scope','$state','$firebaseArray',function ($scope,$state,$firebaseArray) {

  var ref = new Firebase("https://servidorbmn.firebaseio.com/configuracion/promocionarFotoValor");

  var lecturaBaseDeDatos = $firebaseArray(ref);

  lecturaBaseDeDatos.$loaded()
     .then(function(x) {
       $scope.lecturaBaseDeDatos = lecturaBaseDeDatos;
     });
}])
