aplicacion.controller('pointsPlusCorporateReportesControlador', ['$scope','$state','$firebaseArray',function ($scope,$state,$firebaseArray) {

  var ref = new Firebase("https://servidorbmn.firebaseio.com/configuracion/reportes");

  var lecturaBaseDeDatos = $firebaseArray(ref);

  lecturaBaseDeDatos.$loaded()
     .then(function(x) {
       $scope.lecturaBaseDeDatos = lecturaBaseDeDatos;
     });

     $scope.pagosAbrir = function(precioRecibido,descripcionRecibida, tipoRecibido){
       $state.go('detallesFacturacion', {
         precio: precioRecibido,
         descripcion: descripcionRecibida,
         compra: {
           tipoDeCompra: 'reportes',
           promoPoints: null,
           tipo: tipoRecibido, //Silver - Gold - Black
           tiempo: null,
           duracionDeCompra: null,
           idPublicidad: null,
           urlPublicidad: null
         }
       });
     }




}])
