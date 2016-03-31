aplicacion.controller('menuLateralControlador', ['$scope','$state','parametrosUsuarioFactory','$cordovaSQLite','$ionicPopup','$ionicHistory','$firebaseObject',function ($scope,$state,parametrosUsuarioFactory,$cordovaSQLite,$ionicPopup,$ionicHistory, $firebaseObject) {

  //Escucho si se realiza algun cambio en los datos de la factory
  $scope.$on("datosActualizados", function(){
    $scope.nombre = parametrosUsuarioFactory.obtenerNombre();
    $scope.imagenDePerfil = parametrosUsuarioFactory.obtenerImagenDePerfil();
    if(parametrosUsuarioFactory.obtenerIdUsuario().length!=0){
      var referenciaUsuario = new Firebase("https://servidorbmn.firebaseio.com/usuarios/" + parametrosUsuarioFactory.obtenerIdUsuario());
      var lecturaReferenciaUsuario = $firebaseObject(referenciaUsuario);
      $scope.datosPromoPoints = {};
      lecturaReferenciaUsuario.$loaded()
        .then(function(x) {

          lecturaReferenciaUsuario.$bindTo($scope, "datosPromoPoints").then(function() {
            //console.log($scope.datosPromoPoints.promoPoints);
          });

        })
    }
  });



 $scope.cerrarSesion = function (){
   //Muestro una pantalla de carga
   var myPopup = $ionicPopup.show({
     title: 'Cargando',
     template: '<ion-spinner icon="spiral"></ion-spinner>'
   });

   myPopup.then(function(res) {});
   //Borro los datos de factory
   parametrosUsuarioFactory.actualizarNombre('');
   parametrosUsuarioFactory.actualizarToken('');
   parametrosUsuarioFactory.actualizarPais('');
   parametrosUsuarioFactory.actualizarIdUsuario('');
   parametrosUsuarioFactory.actualizarImagenDePerfil('');



   //Borro los datos de la base de datos
   //Creo la sesion con el usuario
   var db = $cordovaSQLite.openDB({
     name: "com.datosBMN"
   });
   //Borro todos los registros de la tabla para asegurar siempre un registro
   $cordovaSQLite.execute(db, "DELETE FROM usuario").then(function(res) {
myPopup.close();
     $ionicPopup.confirm({
         title: 'Cerrar Sesión',
         content: 'La sesión se ha cerrado correctamente'
       })
       .then(function(result) {
         $ionicHistory.nextViewOptions({
           disableBack: true
         });
        $state.go('iniciarSesion'); //Redirige hacia una ruta
       });
   }, function(err) {
     myPopup.close();
     $ionicPopup.confirm({
         title: 'Error al cerrar la sesión',
         content: JSON.stringify(err)
       })
       .then(function(result) {
       });
   });//execute

 };
$scope.promoPointsAbrir = function(){
  $state.go('promoPointsMenu'); //Redirige hacia una ruta
 }

$scope.pointsPlusAbrir = function(){
  $state.go('pointsPlusMenu'); //Redirige hacia una ruta
 }

 $scope.promocionarFotosAbrir = function(){
  $state.go('promocionarFotos'); //Redirige hacia una ruta
 }

 $scope.promocionarFollowsAbrir = function(){
  $state.go('promocionarFollows'); //Redirige hacia una ruta
 }

 $scope.pointsPlusCorporateAbrir = function(){
  $state.go('pointsPlusCorporateMenu'); //Redirige hacia una ruta
 }


}])
