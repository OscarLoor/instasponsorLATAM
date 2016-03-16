aplicacion.controller('detallesFacturacionControlador', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {


  $scope.seleccionarFormaDePago = function(datosUsuario) {
    if(datosUsuario.guardarInformacion==true){
      console.log("Guardado en la base de datos")
    }
    
    console.log(datosUsuario);
    $state.go('seleccionarTipoDePago', {
      precio: $stateParams.precio,
      descripcion: $stateParams.descripcion,
      usuario: datosUsuario
    });
  }

}])
