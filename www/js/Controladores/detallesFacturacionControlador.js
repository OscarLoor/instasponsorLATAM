aplicacion.controller('detallesFacturacionControlador', ['$scope', '$state', '$stateParams', 'parametrosUsuarioFactory', '$firebaseArray', '$ionicPopup', function($scope, $state, $stateParams, parametrosUsuarioFactory, $firebaseArray, $ionicPopup) {

    /*
    Comprobar que no tenga la información previamente almacenada en la bdd
    */
    var myPopup = $ionicPopup.show({
      title: 'Cargando',
      template: '<ion-spinner icon="spiral"></ion-spinner>'
    });
    var ref = new Firebase("https://servidorbmn.firebaseio.com/usuarios/" + parametrosUsuarioFactory.obtenerIdUsuario() + "/detallesFacturacion");
    var lecturaBaseDeDatos = $firebaseArray(ref);
    //Muestro una pantalla de carga
    lecturaBaseDeDatos.$loaded()
      .then(function(x) {
        $scope.lecturaBaseDeDatos = lecturaBaseDeDatos;

        //Si existe lo almaceno
        if ($scope.lecturaBaseDeDatos.length != 0) {
          /*
          0- apellido
          1 - ciudad
          2 - direccion
          3- email
          4- nombre
          5- pais
          6- provincia
          7 -telefono
          */

          $scope.datosUsuario.nombre = $scope.lecturaBaseDeDatos[4].$value;
          $scope.datosUsuario.apellido = $scope.lecturaBaseDeDatos[0].$value;
          $scope.datosUsuario.email = $scope.lecturaBaseDeDatos[3].$value;
          $scope.datosUsuario.emailVerificacion = $scope.lecturaBaseDeDatos[3].$value;
          $scope.datosUsuario.telefono = $scope.lecturaBaseDeDatos[7].$value;
          $scope.datosUsuario.pais = $scope.lecturaBaseDeDatos[5].$value;
          $scope.datosUsuario.provincia = $scope.lecturaBaseDeDatos[6].$value;
          $scope.datosUsuario.ciudad = $scope.lecturaBaseDeDatos[1].$value;
          $scope.datosUsuario.direccion = $scope.lecturaBaseDeDatos[2].$value;
          $scope.datosUsuario.guardarInformacion = true;
        }

        myPopup.close();

      }).catch(function(error) {
        myPopup.close();
        $ionicPopup.confirm({
            title: 'ERROR',
            content: JSON.stringify(error)
          })
          .then(function(result) {});

      });; //catch


    $scope.datosUsuario = {};

    $scope.seleccionarFormaDePago = function(datosUsuario) {
        var myPopup = $ionicPopup.show({
          title: 'Cargando',
          template: '<ion-spinner icon="spiral"></ion-spinner>'
        });

        if (datosUsuario.nombre == undefined || datosUsuario.apellido == undefined || datosUsuario.email == undefined || datosUsuario.telefono == undefined || datosUsuario.pais == undefined || datosUsuario.provincia == undefined || datosUsuario.ciudad == undefined || datosUsuario.direccion == undefined || datosUsuario.nombre.length == 0 || datosUsuario.apellido.length == 0 || datosUsuario.email.length == 0 || datosUsuario.telefono.length == 0 || datosUsuario.pais.length == 0 || datosUsuario.provincia.length == 0 || datosUsuario.ciudad.length == 0 || datosUsuario.direccion.length == 0) {
          myPopup.close();
          $ionicPopup.confirm({
              title: 'ERROR',
              content: 'Los campos requeridos están marcados con *'
            })
            .then(function(result) {});
        } else { //else - datosUsuario.nombre==undefined
          if (datosUsuario.email == datosUsuario.emailVerificacion) {
            if (datosUsuario.guardarInformacion == true) {
              var ref = new Firebase("https://servidorbmn.firebaseio.com/usuarios/" + parametrosUsuarioFactory.obtenerIdUsuario() + "/detallesFacturacion");
              var lecturaBaseDeDatos = $firebaseArray(ref);
              //Muestro una pantalla de carga
              lecturaBaseDeDatos.$loaded()
                .then(function(x) {
                  $scope.lecturaBaseDeDatos = lecturaBaseDeDatos;

                  ref.update({
                    "nombre": datosUsuario.nombre,
                    "apellido": datosUsuario.apellido,
                    "email": datosUsuario.email,
                    "telefono": datosUsuario.telefono,
                    "pais": datosUsuario.pais,
                    "provincia": datosUsuario.provincia,
                    "ciudad": datosUsuario.ciudad,
                    "direccion": datosUsuario.direccion
                  }); //update


                  myPopup.close();
                  console.log("Guardado en la base de datos y enviado")
                  $state.go('seleccionarTipoDePago', {
                    precio: $stateParams.precio,
                    descripcion: $stateParams.descripcion,
                    usuario: datosUsuario
                  });
                }).catch(function(error) {
                  myPopup.close();
                  $ionicPopup.confirm({
                      title: 'ERROR',
                      content: JSON.stringify(error)
                    })
                    .then(function(result) {});

                });; //catch

            } else {
              //Elimino los datos del usuario de la app


              //Se borra de la lista
              var ref = new Firebase("https://servidorbmn.firebaseio.com/usuarios/" + parametrosUsuarioFactory.obtenerIdUsuario() + "/detallesFacturacion");
              var lecturaBaseDeDatos = $firebaseArray(ref);
              //Muestro una pantalla de carga
              lecturaBaseDeDatos.$loaded()
                .then(function(x) {
                  $scope.lecturaBaseDeDatos = lecturaBaseDeDatos;

                  //Si existe lo almaceno
                  if ($scope.lecturaBaseDeDatos.length != 0) {
                    ref.remove(function(error) {
                      if (error) {
                        $ionicPopup.confirm({
                            title: 'ERROR',
                            content: 'No se logró eliminar la información de tu usuario en la base de datos, inténtalo de nuevo '
                          })
                          .then(function(result) {});
                      } else {
                        console.log("Enviado sin guardar y eliminado")
                        $state.go('seleccionarTipoDePago', {
                          precio: $stateParams.precio,
                          descripcion: $stateParams.descripcion,
                          usuario: datosUsuario
                        });
                      }
                    });
                  } else {
                    console.log("Enviado sin guardar")
                    $state.go('seleccionarTipoDePago', {
                      precio: $stateParams.precio,
                      descripcion: $stateParams.descripcion,
                      usuario: datosUsuario
                    });
                  }

                  myPopup.close();

                }).catch(function(error) {
                  myPopup.close();
                  $ionicPopup.confirm({
                      title: 'ERROR',
                      content: JSON.stringify(error)
                    })
                    .then(function(result) {});

                });; //catch



            } //else - datosUsuario.guardar
          } else {
            myPopup.close();
            $ionicPopup.confirm({
                title: 'ERROR',
                content: 'Los emails ingresados no son iguales'
              })
              .then(function(result) {});
          } //else - datosUsuario.email
        } //if - datosUsuario.nombre==undefined






      } //$scope.seleccionarFormaDePago

  }]) //CONTROLADOR
