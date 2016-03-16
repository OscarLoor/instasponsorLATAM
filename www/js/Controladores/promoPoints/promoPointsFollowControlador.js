aplicacion.controller('promoPointsFollowControlador', ['$scope','$state','$firebaseArray',function ($scope,$state,$firebaseArray) {

  var ref = new Firebase("https://servidorbmn.firebaseio.com/configuracion/promocionarFollowValor");

  var lecturaBaseDeDatos = $firebaseArray(ref);

  lecturaBaseDeDatos.$loaded()
     .then(function(x) {
       $scope.lecturaBaseDeDatos = lecturaBaseDeDatos;
     });
}])
