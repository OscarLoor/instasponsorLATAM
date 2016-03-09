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
 
  $stateProvider.state('menuPrincipal', {
  url: '/menuPrincipal',
  templateUrl: 'pantallas/menuPrincipal.html',
  controller: 'menuPrincipalControlador'
 });
 
 /*PromoPoints*/
  $stateProvider.state('promoPointsMenu', {
  url: '/promoPointsMenu',
  templateUrl: 'pantallas/promoPoints/menu.html',
  controller: 'promoPointsMenuControlador'
 });
 
 $stateProvider.state('promoPointsLike', {
  url: '/promoPointsLike',
  templateUrl: 'pantallas/promoPoints/like.html',
  controller: 'promoPointsLikeControlador'
 });
 
 $stateProvider.state('promoPointsFollow', {
  url: '/promoPointsFollow',
  templateUrl: 'pantallas/promoPoints/follow.html',
  controller: 'promoPointsFollowControlador'
 });


});