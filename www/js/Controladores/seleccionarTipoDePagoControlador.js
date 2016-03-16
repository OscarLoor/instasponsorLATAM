aplicacion.controller('seleccionarTipoDePagoControlador', ['$scope','$state','$stateParams',function ($scope,$state,$stateParams) {

$scope.precio =$stateParams.precio;
$scope.descripcion = $stateParams.descripcion;
//console.log($stateParams.usuario)

$scope.tipoDePago = function(tipoDePago){

 if(tipoDePago=='tarjetaDeCredito'){
   $state.go('tarjetaDeCredito', {
     precio: $stateParams.precio,
     descripcion: $stateParams.descripcion,
     usuario: $stateParams.usuario
   });
 }else{
   $state.go('depositoTransferencia', {
     precio: $stateParams.precio,
     descripcion: $stateParams.descripcion,
     usuario: $stateParams.usuario
   });
 }

 }

}])
