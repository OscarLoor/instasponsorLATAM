aplicacion.controller('iniciarSesionControlador', ['$scope', '$cordovaOauth', '$http', '$ionicPlatform', '$ionicPopup', '$timeout', '$ionicHistory', '$state', '$firebaseArray', '$cordovaSQLite', 'parametrosUsuarioFactory', '$firebaseObject', function($scope, $cordovaOauth, $http, $ionicPlatform, $ionicPopup, $timeout, $ionicHistory, $state, $firebaseArray, $cordovaSQLite, parametrosUsuarioFactory, $firebaseObject) {
  $ionicPlatform.ready(function() {

    //Muestro una pantalla de carga
    var myPopup = $ionicPopup.show({
      title: 'Cargando',
      template: '<ion-spinner icon="spiral"></ion-spinner>'
    });

    myPopup.then(function(res) {});

      //Verifico la sesion
    var db = $cordovaSQLite.openDB({
      name: "com.datosBMN"
    }); //db
    //Obtengo el id del usuario y valido la sesion
    $cordovaSQLite.execute(db, "SELECT * FROM usuario").then(function(res) {
      console.log(res.rows.length)
      if (res.rows.length !=0) {
        //Si exite registro en la base de datos
        parametrosUsuarioFactory.actualizarNombre(res.rows.item(0).nombre);
        parametrosUsuarioFactory.actualizarIdUsuario(res.rows.item(0).idInstagram);
        parametrosUsuarioFactory.actualizarToken(res.rows.item(0).access_token);
        parametrosUsuarioFactory.actualizarImagenDePerfil(res.rows.item(0).imagenDePerfil);
        myPopup.close();
      $ionicHistory.nextViewOptions({
          disableBack: true
        });
        //Los promopoints se actualizan directo con firebase
        $state.go('seleccionarPais'); //Redirige hacia una ruta
      } else {
        myPopup.close();
      }
    }, function(err) {
      myPopup.close();
      //No existe la tabla en caso de ser la primera vez
    }); //execute

  }); //$ionicPlatform.ready

  //console.log("Dentro de iniciarsesion.js")
  $scope.login = function() {

    //Muestro una pantalla de carga
    var myPopup = $ionicPopup.show({
      title: 'Cargando',
      template: '<ion-spinner icon="spiral"></ion-spinner>'
    });

    myPopup.then(function(res) {});

    //Configuracion de Inicio de Sesion
    var igClientId = "4414c79c1d9d4ee9b027bf208331ccd1";
    $ionicPlatform.ready(function() {

      $cordovaOauth.instagram(igClientId, ["scope=basic"]).then(function(result) {
        var token = result.access_token; //Obtengo el token

        //Creo la URL con el token recibido
        var url = "https://api.instagram.com/v1/users/self/?access_token=" + token + "&callback=JSON_CALLBACK";

        //Hago la llamada a la API de Instagram
        $http.jsonp(url).success(function(data) {

          var nombre = data.data.full_name
          var imagenDePerfil = data.data.profile_picture
          var idUsuario = data.data.id

          /*Datos base de datos*/
          var ref = new Firebase("https://servidorbmn.firebaseio.com/usuarios/" + idUsuario);

          var lecturaBaseDeDatos = $firebaseArray(ref);

          lecturaBaseDeDatos.$loaded()
            .then(function(x) {
              $scope.lecturaBaseDeDatos = lecturaBaseDeDatos;

              //Si no existe el registro del usuario lo creo en la base de datos de firebase con 0 promoPoints
              if ($scope.lecturaBaseDeDatos.length == 0) {
                ref.update({
                  promoPoints: 0,
                  duplicaTusPuntos: {
                    estado: false,
                    timestampInicio: false,
                    timestampFin: false
                  },
                  suscripcion: {
                    estado: false,
                    timestampInicio: false,
                    timestampFin: false,
                    promoPoints: false
                  },
                  reportes: {
                    estado: false,
                    timestampInicio: false,
                    timestampFin: false,
                    tipo: false
                  }
                });
              }

              //Creo la sesion con el usuario
              var db = $cordovaSQLite.openDB({
                name: "com.datosBMN"
              });

              $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS usuario (idInstagram varchar primary key NOT NULL, pais varchar, nombre varchar NOT NULL, access_token varchar NOT NULL, imagenDePerfil varchar NOT NULL)").then(function(res) {

                //Borro todos los registros de la tabla para asegurar siempre un registro
                $cordovaSQLite.execute(db, "DELETE FROM usuario").then(function(res) {

                  /*Inserto el usuario*/
                  $cordovaSQLite.execute(db, "INSERT INTO usuario (idInstagram, nombre, access_token, imagenDePerfil) VALUES ('"+idUsuario+"','"+nombre+"', '"+token+"', '"+encodeURI(imagenDePerfil)+"')").then(function(res) {
                    parametrosUsuarioFactory.actualizarNombre(nombre);
                    parametrosUsuarioFactory.actualizarImagenDePerfil(imagenDePerfil);
                    parametrosUsuarioFactory.actualizarIdUsuario(idUsuario);
                    parametrosUsuarioFactory.actualizarToken(token);
                    myPopup.close();
                    $ionicHistory.nextViewOptions({
                      disableBack: true
                    });
                    $state.go('seleccionarPais'); //Redirige hacia una ruta



                  }, function(err) {
                    myPopup.close();
                    $ionicPopup.confirm({
                        title: 'ERROR INSERT',
                        content: JSON.stringify(err)
                      })
                      .then(function(result) {
                      });
                  });//execute

                }, function(err) {
                  myPopup.close();
                  $ionicPopup.confirm({
                      title: 'ERROR DELETE',
                      content: JSON.stringify(err)
                    })
                    .then(function(result) {
                    });
                });//execute

              }, function(err) {
                myPopup.close();
                $ionicPopup.confirm({
                    title: 'ERROR CREATE',
                    content: JSON.stringify(err)
                  })
                  .then(function(result) {
                  });
              });//execute

            }).catch(function(error) {
              myPopup.close();
              $ionicPopup.confirm({
                  title: 'ERROR',
                  content: JSON.stringify(error)
                })
                .then(function(result) {});

            });; //catch

        }); //$http

        /*
        Cambiar
        para
        que
        solo
        cuando
        este
        correcto
        muestre*/
        // myPopup.close();
        // $ionicHistory.nextViewOptions({
        //   disableBack: true
        // });
        //
        // $state.go('seleccionarPais'); //Redirige hacia una ruta

      }, function(error) {
        myPopup.close();
        $ionicPopup.confirm({
            title: 'ERROR',
            content: JSON.stringify(error)
          })
          .then(function(result) {});

      });
    });

  };

}])
