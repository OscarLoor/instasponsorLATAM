aplicacion.config(function ($stateProvider, $urlRouterProvider) {
 $urlRouterProvider.otherwise('/iniciarSesion')

 $stateProvider.state('iniciarSesion', {
  url: '/iniciarSesion',
  templateUrl: 'pantallas/iniciarSesion.html',
  controller: 'iniciarSesionControlador'
 });

 

});