aplicacion.controller('promoPointsPorDiasControlador', ['$scope', '$state', 'parametrosUsuarioFactory', '$firebaseObject','$ionicPopup', function($scope, $state, parametrosUsuarioFactory, $firebaseObject,$ionicPopup) {

  var myPopup = $ionicPopup.show({
    title: 'Cargando',
    template: '<ion-spinner icon="spiral"></ion-spinner>'
  });
  myPopup.then(function(res) {});

  /*
    Obtengo el último día que ingreso a la app
  */
  var referenciaUsuario = new Firebase("https://servidorbmn.firebaseio.com/usuarios/" + parametrosUsuarioFactory.obtenerIdUsuario() + "/diasIngresados");
  var lecturaReferenciaUsuario = $firebaseObject(referenciaUsuario);

  lecturaReferenciaUsuario.$loaded()
    .then(function(x) {
      //console.log(lecturaReferenciaUsuario)
      //console.log(lecturaReferenciaUsuario.diasAcumulados)
      if(lecturaReferenciaUsuario.diasAcumulados == undefined){
        //Si no existe registro, lo creo
        referenciaUsuario.update({
          timestampUltimoDiaDeIngreso: Firebase.ServerValue.TIMESTAMP,
          diasAcumulados: 0
        }, function(error) {

          if (error) {
            $ionicPopup.alert({
              title: 'Error',
              template: 'No se puede actualizar la fecha del último ingreso'
            });
          } else {
            $scope.mensaje ="Ingresa cada día para ganar PromoPoints";
            $scope.diasAcumulados = 0;
            myPopup.close();
          }
        })//referenciaUsuario.update
      }else{
        var timestampUltimoDia = lecturaReferenciaUsuario.timestampUltimoDiaDeIngreso;

        /*
        En caso de querer hacer la prueba para 2 dias
        */
        // var segundos = 86400;
        // var milisegundos = segundos *1000;
        // timestampUltimoDia = timestampUltimoDia-milisegundos;
        /*
        En caso de querer hacer la prueba para 3 dias
        */
        // var segundos = 172800;
        // var milisegundos = segundos *1000;
        // timestampUltimoDia = timestampUltimoDia-milisegundos;

        var diasAcumulados = lecturaReferenciaUsuario.diasAcumulados;
        $scope.diasAcumulados = diasAcumulados+1;
        if(diasAcumulados==6){
          $scope.diasAcumulados = diasAcumulados;
        }

      //console.log(timestampUltimoDia);
        //Ingreso el día actual
        referenciaUsuario.update({
          timestampUltimoDiaDeIngreso: Firebase.ServerValue.TIMESTAMP
        }, function(error) {

          if (error) {
            $ionicPopup.alert({
              title: 'Error',
              template: 'No se puede actualizar la fecha del último ingreso'
            });
          } else {
            /*
            Vuelvo a realizar la llamada para saber el día de hoy
            */

            var lecturaReferenciaUsuarioDos = $firebaseObject(referenciaUsuario);

            lecturaReferenciaUsuarioDos.$loaded()
              .then(function(x) {
                var timestampMomentoActual = lecturaReferenciaUsuario.timestampUltimoDiaDeIngreso;
                //console.log(timestampMomentoActual)
                var calculoDeTimestamp = timestampMomentoActual-timestampUltimoDia;
                var calculoDeSegundos = calculoDeTimestamp/1000;
                /*
                 Calculo el número de días
                 timestampMomentoActual-timestampUltimoDiaDeIngreso

                 -Opcion Uno
                 Si el numero de segundos esta entre 0 y 86400 (1 día)
                 Guardo el primer timestamp porque aun no termina el dia

                 -Opcion Dos
                 Si el numero de segundos esta entre 86400 y 172800 (2dias)
                 Entrego los puntos tomando en cuenta el número de dias acumulados
                 Guardo el nuevo contador
                 Aumento el numero de dias acumulados

                 -Opcion Tres
                 Si el numero de segundos es mayor a 172800 (2dias)
                 Se paso y ya no cumple con los dias acumulados
                 Guardo el nuevo contador
                 numero de dias acumulados =0
                */

                //console.log(calculoDeSegundos)


                if(0<=calculoDeSegundos && 86400>calculoDeSegundos){
                  //Opcion Uno
                  referenciaUsuario.update({
                    timestampUltimoDiaDeIngreso: timestampUltimoDia
                  }, function(error) {

                    if (error) {
                      $ionicPopup.alert({
                        title: 'Error',
                        template: 'No se puede actualizar la fecha del último ingreso'
                      });
                    } else {
                      myPopup.close();
                      //console.log("Mismo dia")

                      /*
                       Calculo el numero de tiempo restante
                      */
                      var segundosQueFaltan = 86400-calculoDeSegundos;
                      var horasQueFaltan = segundosQueFaltan/3600;


                      var minutosQueFaltan = (horasQueFaltan % 1).toFixed(4)*60;


                      var segundosQueFaltan = (minutosQueFaltan % 1).toFixed(4)*60;


                      $scope.mensaje = "Faltan "+horasQueFaltan.toString().substring(0,2)+" h "+minutosQueFaltan.toString().substring(0,2)+" min "+segundosQueFaltan.toString().substring(0,2)+" seg para la siguiente bonificación"
                    }
                  })//referenciaUsuario.update
                }else if (86400<=calculoDeSegundos && 172800>calculoDeSegundos) {
                  //Opcion Dos
                  diasAcumulados++;
                  var promoPointsGanados = diasAcumulados*10;
                  //console.log("PromoPoints Ganados "+promoPointsGanados)

                  //Para evitar que pase de 7 dias
                  if(diasAcumulados>=7){
                    diasAcumulados=6;
                  }

                  referenciaUsuario.update({
                    timestampUltimoDiaDeIngreso: Firebase.ServerValue.TIMESTAMP,
                    diasAcumulados: diasAcumulados
                  }, function(error) {

                    if (error) {
                      $ionicPopup.alert({
                        title: 'Error',
                        template: 'No se puede actualizar la fecha del último ingreso'
                      });
                    } else {
                      //console.log("Se registro el nuevo dia y los dias acumulados")
                      var referenciaPromoPoints = new Firebase("https://servidorbmn.firebaseio.com/usuarios/" + parametrosUsuarioFactory.obtenerIdUsuario());

                      var lecturaReferenciaPromoPoints = $firebaseObject(referenciaPromoPoints);

                      lecturaReferenciaPromoPoints.$loaded()
                        .then(function(x) {
                          var promoPointsActuales = lecturaReferenciaPromoPoints.promoPoints;
                          var promoPointsTotales = parseInt(promoPointsActuales)+parseInt(promoPointsGanados);

                          //console.log("PromoPoints que se guardan"+promoPointsTotales)
                          referenciaPromoPoints.update({
                            promoPoints: promoPointsTotales
                          }, function(error) {

                            if (error) {
                              $ionicPopup.alert({
                                title: 'Error',
                                template: 'No se puede actualizar los promopoints'
                              });
                            } else {
                              myPopup.close();
                              //console.log("Se registro los nuevos promopoints")
                              $scope.mensaje="Acabas de ganar "+promoPointsGanados+" PromoPoints";
                            }
                          })//referenciaPromoPoints.update
                        })



                    }
                  })//referenciaUsuario.update


                }else{
                  //Opcion Tres

                  referenciaUsuario.update({
                    timestampUltimoDiaDeIngreso: Firebase.ServerValue.TIMESTAMP,
                    diasAcumulados: 0
                  }, function(error) {

                    if (error) {
                      $ionicPopup.alert({
                        title: 'Error',
                        template: 'No se puede actualizar la fecha del último ingreso'
                      });
                    } else {
                      myPopup.close();
                      $scope.mensaje="Vuelve cada día para conseguir PromoPoints Gratis";
                      $scope.diasAcumulados = 0;
                      //console.log("Pasaron mas de dos dias pero se guardo el nuevo contador")

                    }
                  })//referenciaUsuario.update

                }

              })
          }
        })//referenciaUsuario.update

      }





    })
  $scope.menuPrincipal = function() {
    $state.go('menuPrincipal'); //Redirige hacia una ruta
  }

}])
