aplicacion.config(function ($stateProvider, $urlRouterProvider) {
 $urlRouterProvider.otherwise('/iniciarSesion')

 $stateProvider.state('iniciarSesion', {
  url: '/iniciarSesion',
  templateUrl: 'pantallas/iniciarSesion.html',
  controller: 'iniciarSesionControlador'
 });
 
 $stateProvider.state('seleccionarPais', {
  url: '/seleccionarPais',
  templateUrl: 'pantallas/seleccionarPais.html',
  controller: 'seleccionarPaisControlador'
 });

 $stateProvider.state('promoPointsPorDias', {
  url: '/promoPointsPorDias',
  templateUrl: 'pantallas/promoPointsPorDias.html',
  controller: 'promoPointsPorDiasControlador'
 });



});