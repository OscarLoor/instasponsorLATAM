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

 /*Points Plus*/
  $stateProvider.state('pointsPlusMenu', {
  url: '/pointsPlusMenu',
  templateUrl: 'pantallas/pointsPlus/menu.html',
  controller: 'pointsPlusMenuControlador'
 });

   $stateProvider.state('duplicaTusPuntos', {
  url: '/duplicaTusPuntos',
  templateUrl: 'pantallas/pointsPlus/duplicaTusPuntos.html',
  controller: 'duplicaTusPuntosControlador'
 });

 $stateProvider.state('suscribete', {
  url: '/suscribete',
  templateUrl: 'pantallas/pointsPlus/suscribete.html',
  controller: 'suscribeteControlador'
 });

 $stateProvider.state('promociones', {
  url: '/promociones',
  templateUrl: 'pantallas/pointsPlus/promociones.html',
  controller: 'promocionesControlador'
 });

  $stateProvider.state('tarifas', {
  url: '/tarifas',
  templateUrl: 'pantallas/pointsPlus/tarifas.html',
  controller: 'tarifasControlador'
 });

  /*Promocionar Fotos*/
   $stateProvider.state('promocionarFotos', {
  url: '/promocionarFotos',
  templateUrl: 'pantallas/promocionarFotos/fotos.html',
  controller: 'promocionarFotosControlador'
 });

 $stateProvider.state('pFNumeroDeLikes', {
  url: '/pFNumeroDeLikes/:idUsuario/:idImagen/:url',
  templateUrl: 'pantallas/promocionarFotos/seleccionarNumeroDeLikes.html',
  controller: 'pFNumeroDeLikesControlador'
 });

 /*Promocionar Follows*/

  $stateProvider.state('promocionarFollows', {
  url: '/promocionarFollows',
  templateUrl: 'pantallas/promocionarFollows/seleccionarNumeroDeFollows.html',
  controller: 'promocionarFollowsControlador'
 });

 /*Points Plus Corporate*/
   $stateProvider.state('pointsPlusCorporateMenu', {
  url: '/pointsPlusCorporateMenu',
  templateUrl: 'pantallas/pointsPlusCorporate/menu.html',
  controller: 'pointsPlusCorporateMenuControlador'
 });

 $stateProvider.state('pointsPlusCorporatePublicidad', {
  url: '/pointsPlusCorporatePublicidad',
  templateUrl: 'pantallas/pointsPlusCorporate/publicidad.html',
  controller: 'pointsPlusCorporatePublicidadControlador'
 });

 $stateProvider.state('pointsPlusCorporateReportes', {
  url: '/pointsPlusCorporateReportes',
  templateUrl: 'pantallas/pointsPlusCorporate/reportes.html',
  controller: 'pointsPlusCorporateReportesControlador'
 });

 $stateProvider.state('pointsPlusCorporateSeleccionarArchivo', {
  url: '/pointsPlusCorporateSeleccionarArchivo/:descripcion/:precio/{compra:json}',
  templateUrl: 'pantallas/pointsPlusCorporate/SeleccionarArchivo.html',
  controller: 'pointsPlusCorporateSeleccionarArchivoControlador'
 });

 /*Tipo de pago*/
 $stateProvider.state('seleccionarTipoDePago', {
  url: '/seleccionarTipoDePago/:precio/:descripcion/{usuario:json}/{compra:json}',
  templateUrl: 'pantallas/seleccionarTipoDePago.html',
  controller: 'seleccionarTipoDePagoControlador'
 });

  $stateProvider.state('tarjetaDeCredito', {
  url: '/tarjetaDeCredito/:precio/:descripcion/{usuario:json}/{compra:json}',
  templateUrl: 'pantallas/tarjetaDeCredito.html',
  controller: 'tarjetaDeCreditoControlador'
 });

 $stateProvider.state('detallesFacturacion', {
 url: '/detallesFacturacion/:precio/:descripcion/{compra:json}',
 templateUrl: 'pantallas/detallesFacturacion.html',
 controller: 'detallesFacturacionControlador'
});

$stateProvider.state('depositoTransferencia', {
url: '/depositoTransferencia/:precio/:descripcion/{usuario:json}/{compra:json}',
templateUrl: 'pantallas/depositoTransferencia.html',
controller: 'depositoTransferenciaControlador'
});

});
