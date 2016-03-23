// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var aplicacion = angular.module('starter', ['ionic', 'ngCordova', 'ngCordovaOauth', 'firebase'])

aplicacion.run(function($ionicPlatform, $rootScope, $location, $state, parametrosUsuarioFactory, $cordovaSQLite, $ionicPopup) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    //Creo la capa de autenticación
    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams, options) {
          event.preventDefault();

          /*Si no pongo ningun state transitionTo se ira a la ruta solicitada
          unicamente utilizarlo cuando no quiero que vaya a la ruta deseada sin antes pasar por controles
          */
          //console.log(toState.url)
          if (toState.url != '/iniciarSesion' && toState.url != '/seleccionarPais') {
            /*
            Verfico si hay pais en la factory, si no existe paso a seleccionarPais, caso contrario continua a la siguiente validacion
            Verifico si hay idInstragram en la factory, si no existe paso a iniciar sesion, caso contrario le envio a la ruta seleccionada
            */
            //console.log("Pais:"+parametrosUsuarioFactory.obtenerPais().length);
            if (parametrosUsuarioFactory.obtenerPais().length!=0) {
              //console.log("ID1:"+parametrosUsuarioFactory.obtenerIdUsuario().length);
              if (parametrosUsuarioFactory.obtenerIdUsuario().length!=0) {
                //console.log("Ir a * dentro de *")
                //$state.transitionTo(toState.url.substr(1), null, {reload:true});
                //$state.go(toState.url.substr(1),{reload: true});
              } else {
                //console.log("Ir a iniciar sesion dentro de *")
                //$state.go('iniciarSesion',{reload: true});
                $state.transitionTo('iniciarSesion', null, {reload:true});
              }
            } else {
              //console.log("Ir a seleccionar pais dentro de *")
              $state.transitionTo('seleccionarPais', null, {reload:true});
              //$state.go('seleccionarPais',{reload: true});

            }
          }

          if (toState.url == '/seleccionarPais') {
            //console.log("ID2:"+parametrosUsuarioFactory.obtenerIdUsuario().length);
            //Si existe un usuario en factory le mando a seleccionarPais caso contrario lo envio a iniciar sesion
            if (parametrosUsuarioFactory.obtenerIdUsuario().length!=0) {
              //console.log("Ir a seleccionar pais")
              //$state.go('seleccionarPais',{reload: true});
              //$state.transitionTo('seleccionarPais', null, {reload:true});
            } else {
              //console.log("Ir a iniciar Sesion dentro de seleccionar pais")
              //$state.go('iniciarSesion',{reload: true});
              $state.transitionTo('iniciarSesion', null, {reload:true});

            }
          }


          if (toState.url == '/iniciarSesion') {
            //console.log("Ir a iniciar Sesion")
            //$state.transitionTo('iniciarSesion', null, { reload: true});
            //$state.go('iniciarSesion',{reload: true});
          }



        }) //$on

  });
})
aplicacion.config(function($ionicConfigProvider) {
  $ionicConfigProvider.backButton.text('')
  $ionicConfigProvider.navBar.alignTitle('center')
})
