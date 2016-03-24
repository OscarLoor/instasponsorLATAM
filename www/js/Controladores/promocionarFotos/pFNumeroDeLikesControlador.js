aplicacion.controller('pFNumeroDeLikesControlador', ['$scope', '$state', '$ionicPopup', '$state', '$ionicHistory', '$firebaseArray', 'parametrosUsuarioFactory', '$stateParams','$firebaseObject',function($scope, $state, $ionicPopup, $state, $ionicHistory, $firebaseArray, parametrosUsuarioFactory, $stateParams, $firebaseObject) {

  var referenciaUsuario = new Firebase("https://servidorbmn.firebaseio.com/usuarios/" + parametrosUsuarioFactory.obtenerIdUsuario());
  var lecturaReferenciaUsuario = $firebaseObject(referenciaUsuario);
  $scope.datosPromoPoints = {};
  lecturaReferenciaUsuario.$loaded()
    .then(function(x) {

      lecturaReferenciaUsuario.$bindTo($scope, "datosPromoPoints").then(function() {
        //console.log($scope.datosPromoPoints.promoPoints);
      });

    })


  var ref = new Firebase("https://servidorbmn.firebaseio.com/configuracion/promocionarFotos");

  var lecturaBaseDeDatos = $firebaseArray(ref);

  //Muestro una pantalla de carga
  var myPopup = $ionicPopup.show({
    title: 'Cargando',
    template: '<ion-spinner icon="spiral"></ion-spinner>'
  }); //myPopup

  myPopup.then(function(res) {}); //myPopupthen

  lecturaBaseDeDatos.$loaded()
    .then(function(x) {
      myPopup.close();
      $scope.lecturaBaseDeDatos = lecturaBaseDeDatos;
    }); //$loaded

  // A confirm dialog
  $scope.confirmarNumeroDeLikes = function(promoPoints, valido) {

      var confirmPopup = $ionicPopup.confirm({
        title: 'Promocionar Foto',
        template: 'Se descontarán ' + promoPoints + ' promo points de tu cuenta. ¿Estás seguro?',
        cancelText: 'No',
        okText: 'Si'
      }); //confirmPopup

      confirmPopup.then(function(res) {
          if (res) {
            var idImagen = $stateParams.idImagen;
            /*Datos base de datos*/
            var refDos = new Firebase("https://servidorbmn.firebaseio.com/promocionarFoto/" + parametrosUsuarioFactory.obtenerPais() + "/" + idImagen);

            var lecturaBaseDeDatosDos = $firebaseArray(refDos);

            var refTres = new Firebase("https://servidorbmn.firebaseio.com/reportes/promocionarFoto/" + $stateParams.idUsuario);

            var lecturaBaseDeDatosTres = $firebaseArray(refTres);

            var referenciaUsuario = new Firebase("https://servidorbmn.firebaseio.com/usuarios/" + $stateParams.idUsuario);

            var lecturaReferenciaUsuario = $firebaseArray(referenciaUsuario);

            //Muestro una pantalla de carga
            var myPopupDos = $ionicPopup.show({
              title: 'Cargando',
              template: '<ion-spinner icon="spiral"></ion-spinner>'
            });

            myPopupDos.then(function(res) {});
            lecturaBaseDeDatosDos.$loaded()
              .then(function(x) {
                lecturaBaseDeDatosTres.$loaded()
                  .then(function(x) {

                    lecturaReferenciaUsuario.$loaded()
                      .then(function(x) {

                        if(lecturaReferenciaUsuario[0].$value>=promoPoints){


                          myPopupDos.close();


                          $scope.lecturaBaseDeDatosDos = lecturaBaseDeDatosDos;

                          //Si no existe el registro de la imagen la creo
                          if ($scope.lecturaBaseDeDatosDos.length == 0) {
                            //Creo el codigo para ingresar la imagen en la cola
                            //Muestro una pantalla de carga
                            var myPopupTres = $ionicPopup.show({
                              title: 'Cargando',
                              template: '<ion-spinner icon="spiral"></ion-spinner>'
                            });

                            myPopupTres.then(function(res) {});
                            refDos.update({
                              idUsuario: $stateParams.idUsuario,
                              numeroDeLikesNecesarios: valido,
                              numeroDeLikesActuales: 0,
                              fechaDeInicioDePromocion: Firebase.ServerValue.TIMESTAMP,
                              url: $stateParams.url
                            }, function(error) {
                              myPopupTres.close();
                              if (error) {
                                $ionicPopup.alert({
                                  title: 'Error',
                                  template: 'Fallo el ingreso en la base de datos'
                                });
                              } else {


                                lecturaBaseDeDatosTres.$add({
                                  idImagen: idImagen,
                                  url: $stateParams.url
                                }).then(function(ref) {
                                  //Si todo esta correcto


                                  var promoPointsFinales = lecturaReferenciaUsuario[0].$value-promoPoints;
                                  referenciaUsuario.update({promoPoints: promoPointsFinales});


                                  var alertPopup = $ionicPopup.alert({
                                    title: '¡Gracias por tu pedido!',
                                    template: '¡Será promocionado durante los siguientes días!'
                                  });

                                  alertPopup.then(function(res) {
                                    $ionicHistory.nextViewOptions({
                                      disableBack: true
                                    });

                                    $state.go('menuPrincipal'); //Redirige hacia una ruta
                                  })
                                });


                              }


                            }); //Update
                          } else { //Muestro que la imagen ya esta promocionada - $scope.lecturaBaseDeDatos.length
                            $ionicPopup.alert({
                              title: 'Error',
                              template: 'La imagen seleccionada ya se encuentra en promoción'
                            });
                          }
                        }else{
                          myPopupDos.close();
                          $ionicPopup.alert({
                            title: 'Error',
                            template: 'No tienes suficientes PromoPoints'
                          });
                        }

                      })

                  }).catch(function(error) { //lecturaBaseDeDatos then
                    myPopupDos.close();
                    $ionicPopup.alert({
                      title: 'Error',
                      template: 'No se puede conectar con la base de datos'
                    });
                  })

              }).catch(function(error) { //lecturaBaseDeDatos then
                myPopupDos.close();
                $ionicPopup.alert({
                  title: 'Error',
                  template: 'No se puede conectar con la base de datos'
                });

              }); //catch
          } //if res

        }) //ConfirmPopupthen
    } //confirmarNumeroDeLikes

}])
