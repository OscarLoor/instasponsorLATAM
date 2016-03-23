aplicacion.controller('menuLateralControlador', ['$scope','$state','parametrosUsuarioFactory','$cordovaSQLite','$ionicPopup','$ionicHistory',function ($scope,$state,parametrosUsuarioFactory,$cordovaSQLite,$ionicPopup,$ionicHistory) {

  //Escucho si se realiza algun cambio en los datos de la factory
  $scope.$on("datosActualizados", function(){
    $scope.nombre = parametrosUsuarioFactory.obtenerNombre();
    $scope.imagenDePerfil = parametrosUsuarioFactory.obtenerImagenDePerfil();
  });

 $scope.cerrarSesion = function (){
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
