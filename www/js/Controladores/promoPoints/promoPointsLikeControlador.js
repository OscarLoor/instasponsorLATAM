aplicacion.controller('promoPointsLikeControlador', ['$scope', '$state', '$firebaseArray', '$firebaseObject', 'parametrosUsuarioFactory', '$http', '$ionicPopup', function($scope, $state, $firebaseArray, $firebaseObject, parametrosUsuarioFactory, $http, $ionicPopup) {

  console.log()parametrosUsuarioFactory.obtenerPais();
  //Datos para mostrar en la parte superior sobre el usuario
  $scope.nombre = parametrosUsuarioFactory.obtenerNombre();
  $scope.imagenDePerfil = parametrosUsuarioFactory.obtenerImagenDePerfil();
  if (parametrosUsuarioFactory.obtenerIdUsuario().length != 0) {
    var referenciaUsuario = new Firebase("https://servidorbmn.firebaseio.com/usuarios/" + parametrosUsuarioFactory.obtenerIdUsuario());
    var lecturaReferenciaUsuario = $firebaseObject(referenciaUsuario);
    $scope.datosPromoPoints = {};
    lecturaReferenciaUsuario.$loaded()
      .then(function(x) {

        lecturaReferenciaUsuario.$bindTo($scope, "datosPromoPoints").then(function() {
          //console.log($scope.datosPromoPoints.promoPoints);
        });

      })
  }

  //Funcion para agregar el registro del like en la seccion de reportes para la foto

  var ingresarRegistroEnLaImagen = function(idUsuarioDeLaFoto, idImagen, numeroDeImagen) {
    var referenciaReportesIngresar = new Firebase("https://servidorbmn.firebaseio.com/reportes/promocionarFoto/" + idUsuarioDeLaFoto + "/" + idImagen + "/registroDeLikes");
    var lecturaReferenciaReportesIngresar = $firebaseArray(referenciaReportesIngresar);

    lecturaReferenciaReportesIngresar.$add({
      timestamp: Firebase.ServerValue.TIMESTAMP
    }).then(function(ref) {
      //Verifico que la imagen aún no tenga la cantidad de likes necesarios

      var referenciaReportesIngresar = new Firebase("https://servidorbmn.firebaseio.com/promocionarFoto/" + parametrosUsuarioFactory.obtenerPais() + "/" + idImagen);
      var lecturaReferenciaReportesIngresar = $firebaseObject(referenciaReportesIngresar);
      lecturaReferenciaReportesIngresar.$loaded()
        .then(function(x) {

          var numeroDeLikesNecesarios = lecturaReferenciaReportesIngresar['numeroDeLikesNecesarios']

          var referenciaNumeroDeLikes = new Firebase("https://servidorbmn.firebaseio.com/reportes/promocionarFoto/" + idUsuarioDeLaFoto + "/" + idImagen + "/registroDeLikes");
          var lecturaReferenciaNumeroDeLikes = $firebaseArray(referenciaNumeroDeLikes);

          lecturaReferenciaNumeroDeLikes.$loaded()
            .then(function(x) {
              var numeroDeLikesActuales = lecturaReferenciaNumeroDeLikes.length;
              console.log(numeroDeLikesActuales)
              if (numeroDeLikesActuales > (numeroDeLikesNecesarios-1)) {
                //Se borra de la lista
                var referenciaFotosPromocionadas = new Firebase("https://servidorbmn.firebaseio.com/promocionarFoto/" + parametrosUsuarioFactory.obtenerPais() + "/" + idImagen);
                var lecturaReferenciaFotosPromocionadas = $firebaseObject(referenciaFotosPromocionadas);

                lecturaReferenciaFotosPromocionadas.$loaded()
                  .then(function(x) {
                    lecturaReferenciaFotosPromocionadas.$remove(idImagen).then(function(ref) {

                    });

                  });


              }
            });


        });







      if (numeroDeImagen == 1) {
        popUpUno.close();
      }

      if (numeroDeImagen == 2) {
        popUpDos.close();
      }

      if (numeroDeImagen == 3) {
        popUpTres.close();
      }

      if (numeroDeImagen == 4) {
        popUpCuatro.close();
      }
    });

  }


  //Obtengo el valor que gana el usuario cuando da click en like
  var ref = new Firebase("https://servidorbmn.firebaseio.com/configuracion/promocionarFotoValor");

  var lecturaBaseDeDatos = $firebaseArray(ref);

  lecturaBaseDeDatos.$loaded()
    .then(function(x) {
      $scope.lecturaBaseDeDatos = lecturaBaseDeDatos;
    });


  var listaDeNextRondaActual = [];

  var obtenerTodasLasFotos = function() {
    //Muestro una pantalla de carga
    var myPopup = $ionicPopup.show({
      title: 'Cargando',
      template: '<ion-spinner icon="spiral"></ion-spinner>'
    });
    //Obtengo las fotos

    var listaDeLikes = [];

    var obtenerListaDeLikes = function() {
        var token = parametrosUsuarioFactory.obtenerToken(); //Obtengo el token
        //Creo la URL con el token recibido
        var url = "https://api.instagram.com/v1/users/self/media/liked?access_token=" + token + "&callback=JSON_CALLBACK";

        //Obtengo la lista de likes del usuario, contiene el id de la imagen
        $http.jsonp(url).success(function(data) {
          listaDeLikes = [];
          //Esto es de prueba hasta activar los permisos para public_content
          //console.log(data)
          var data = JSON.parse(' { "data": [{        "location": {            "id": "833",            "latitude": 37.77956816727314,            "longitude": -122.41387367248539,            "name": "Civic Center BART"        },        "comments": {            "count": 16        },        "caption": null,        "link": "http://instagr.am/p/BXsFz/",        "likes": {            "count": 190        },        "created_time": "1296748524",        "images": {            "low_resolution": {                "url": "http://distillery.s3.amazonaws.com/media/2011/02/03/efc502667a554329b52d9a6bab35b24a_6.jpg",                "width": 306,                "height": 306            },            "thumbnail": {                "url": "http://distillery.s3.amazonaws.com/media/2011/02/03/efc502667a554329b52d9a6bab35b24a_5.jpg",                "width": 150,                "height": 150            },            "standard_resolution": {                "url": "http://distillery.s3.amazonaws.com/media/2011/02/03/efc502667a554329b52d9a6bab35b24a_7.jpg",                "width": 612,                "height": 612            }        },        "type": "image",        "users_in_photo": [],        "filter": "Earlybird",        "tags": [],        "id": "1212672498127915006_2981244912",        "user": {            "username": "kevin",            "full_name": "Kevin S",            "profile_picture": "http://distillery.s3.amazonaws.com/profiles/profile_3_75sq_1295574122.jpg",            "id": "3"        }    },{        "location": {            "id": "833",            "latitude": 37.77956816727314,            "longitude": -122.41387367248539,            "name": "Civic Center BART"        },        "comments": {            "count": 16        },        "caption": null,        "link": "http://instagr.am/p/BXsFz/",        "likes": {            "count": 190        },        "created_time": "1296748524",        "images": {            "low_resolution": {                "url": "http://distillery.s3.amazonaws.com/media/2011/02/03/efc502667a554329b52d9a6bab35b24a_6.jpg",                "width": 306,                "height": 306            },            "thumbnail": {                "url": "http://distillery.s3.amazonaws.com/media/2011/02/03/efc502667a554329b52d9a6bab35b24a_5.jpg",                "width": 150,                "height": 150            },            "standard_resolution": {                "url": "http://distillery.s3.amazonaws.com/media/2011/02/03/efc502667a554329b52d9a6bab35b24a_7.jpg",                "width": 612,                "height": 612            }        },        "type": "image",        "users_in_photo": [],        "filter": "Earlybird",        "tags": [],        "id": "1212671926737881073_2981244912",        "user": {            "username": "kevin",            "full_name": "Kevin S",            "profile_picture": "http://distillery.s3.amazonaws.com/profiles/profile_3_75sq_1295574122.jpg",            "id": "3"        }    }]}');

          var contenedorDeLikes = data.data;


          for (i = 0; i < contenedorDeLikes.length; i++) {
            listaDeLikes.push(contenedorDeLikes[i].id)
          }

          //console.log(listaDeLikes)
          llenarFotos();
        }); //$http
      } //obtenerListaDeLikes
    myPopup.then(function(res) {});


    //Obtengo la lista de las fotos promocionadas en la app
    var referenciaFotos = new Firebase("https://servidorbmn.firebaseio.com/promocionarFoto/" + parametrosUsuarioFactory.obtenerPais());

    var lecturaFotos = $firebaseObject(referenciaFotos);
    $scope.lecturaFotos = {};

    lecturaFotos.$loaded()
      .then(function(x) {
        console.log(lecturaFotos)
        console.log(lecturaFotos.length)
        lecturaFotos.$bindTo($scope, "lecturaFotos").then(function() {

          console.log($scope.lecturaFotos)
          console.log($scope.lecturaFotos.length)
          if($scope.lecturaFotos['$value']==null){
            alert("No existen registros en la base de datos")
            myPopup.close();
          }else{
            obtenerListaDeLikes();
          }



        });

      })


    var llenarFotos = function() {
        $scope.imagenUno = {};
        $scope.imagenDos = {};
        $scope.imagenTres = {};
        $scope.imagenCuatro = {};
        for (var contador = 1; contador <= 4; contador++) {

          for (var key in $scope.lecturaFotos) {
            if (key == "$id" || key == "$priority") {
              continue
            }

            var encontroEnLaListaLikes = false;

            for (var j = 0; j < listaDeLikes.length; j++) {
              if (listaDeLikes[j] == key) {
                encontroEnLaListaLikes = true;
              }
            }

            var encontroEnLaListaNext = false;

            for (var k = 0; k < listaDeNextRondaActual.length; k++) {
              if (listaDeNextRondaActual[k] == key) {
                encontroEnLaListaNext = true;
              }
            }

            if (encontroEnLaListaLikes == false && encontroEnLaListaNext == false) {
              if (contador == 1) {
                $scope.imagenUno = {
                  id: key,
                  url: $scope.lecturaFotos[key]['url'],
                  idUsuarioDeLaFoto: $scope.lecturaFotos[key]['idUsuario']
                }
                break;
              } //if

              if (contador == 2) {
                if ($scope.imagenUno.id != key) {
                  $scope.imagenDos = {
                    id: key,
                    url: $scope.lecturaFotos[key]['url'],
                    idUsuarioDeLaFoto: $scope.lecturaFotos[key]['idUsuario']
                  }
                  break;
                }
              } //if

              if (contador == 3) {
                if ($scope.imagenUno.id != key && $scope.imagenDos.id != key) {
                  $scope.imagenTres = {
                    id: key,
                    url: $scope.lecturaFotos[key]['url'],
                    idUsuarioDeLaFoto: $scope.lecturaFotos[key]['idUsuario']
                  }
                  break;
                }
              } //if

              if (contador == 4) {
                if ($scope.imagenUno.id != key && $scope.imagenDos.id != key && $scope.imagenTres.id != key) {
                  $scope.imagenCuatro = {
                    id: key,
                    url: $scope.lecturaFotos[key]['url'],
                    idUsuarioDeLaFoto: $scope.lecturaFotos[key]['idUsuario']
                  }
                  break;
                }
              } //if


            } //if(encontroEnLaListaLikes==false && encontroEnLaListaNext==false)

            //console.log(key)
            // for (var subkey in $scope.lecturaFotos[key]) {
            //   //console.log("Clave: "+subkey+" Valor: "+$scope.lecturaFotos[key][subkey])
            // }
          } //for (var key in $scope.lecturaFotos)


        } //for (var contador=1; contador <=4; contador++)
        // console.log($scope.imagenUno)
        // console.log($scope.imagenDos)
        // console.log($scope.imagenTres)
        // console.log($scope.imagenCuatro)
        if ($scope.imagenUno.id == undefined) {
          $scope.imagenUno = {
            id: '0',
            url: 'No Encontro',
            idUsuarioDeLaFoto: '0'
          }
        }

        if ($scope.imagenDos.id == undefined) {
          $scope.imagenDos = {
            id: '0',
            url: 'No Encontro',
            idUsuarioDeLaFoto: '0'
          }
        }

        if ($scope.imagenTres.id == undefined) {
          $scope.imagenTres = {
            id: '0',
            url: 'No Encontro',
            idUsuarioDeLaFoto: '0'
          }
        }

        if ($scope.imagenCuatro.id == undefined) {
          $scope.imagenCuatro = {
            id: '0',
            url: 'No Encontro',
            idUsuarioDeLaFoto: '0'
          }
        }

        // console.log("Valores Finales")
        // console.log($scope.imagenUno)
        // console.log($scope.imagenDos)
        // console.log($scope.imagenTres)
        // console.log($scope.imagenCuatro)
        myPopup.close();
      } //var llenarFotos = function()


  }

  var popUpUno;
  var popUpDos;
  var popUpTres;
  var popUpCuatro;

  $scope.botonLike = function() {
    console.log("Like");

    var referenciaUsuario = new Firebase("https://servidorbmn.firebaseio.com/usuarios/" + parametrosUsuarioFactory.obtenerIdUsuario());

    var lecturaReferenciaUsuario = $firebaseArray(referenciaUsuario);

    var myPopupTres = $ionicPopup.show({
      title: 'Cargando',
      template: '<ion-spinner icon="spiral"></ion-spinner>'
    });

    myPopupTres.then(function(res) {});

    lecturaReferenciaUsuario.$loaded()
      .then(function(x) {
        //Aumento el numero de promopoints
        var promoPointsFinales = parseInt(lecturaReferenciaUsuario[0].$value) + parseInt($scope.lecturaBaseDeDatos[0].promoPoints);
        referenciaUsuario.update({
          promoPoints: promoPointsFinales
        });

        //Realizar el codigo para hacer like en la foto
        var tokenUsuario = parametrosUsuarioFactory.obtenerToken(); //Obtengo el token
        //Creo la URL con el token recibido
        if ($scope.imagenUno.id != '0') {
          var urlLike = "https://api.instagram.com/v1/media/" + $scope.imagenUno.id + "/likes?access_token=" + tokenUsuario + "&callback=JSON_CALLBACK";

          popUpUno = $ionicPopup.show({
            title: 'Cargando',
            template: '<ion-spinner icon="spiral"></ion-spinner>'
          });

          popUpUno.then(function(res) {});

          //Obtengo la lista de likes del usuario, contiene el id de la imagen
          $http.jsonp(urlLike).success(function(data) {
            ingresarRegistroEnLaImagen($scope.imagenUno.idUsuarioDeLaFoto, $scope.imagenUno.id, 1);

            console.log(data)
          }); //$http
        }

        if ($scope.imagenDos.id != '0') {
          var urlLike = "https://api.instagram.com/v1/media/" + $scope.imagenDos.id + "/likes?access_token=" + tokenUsuario + "&callback=JSON_CALLBACK";

          popUpDos = $ionicPopup.show({
            title: 'Cargando',
            template: '<ion-spinner icon="spiral"></ion-spinner>'
          });

          popUpDos.then(function(res) {});
          //Obtengo la lista de likes del usuario, contiene el id de la imagen
          $http.jsonp(urlLike).success(function(data) {
            ingresarRegistroEnLaImagen($scope.imagenDos.idUsuarioDeLaFoto, $scope.imagenDos.id, 2);
            console.log(data)
          }); //$http
        }

        if ($scope.imagenTres.id != '0') {
          var urlLike = "https://api.instagram.com/v1/media/" + $scope.imagenTres.id + "/likes?access_token=" + tokenUsuario + "&callback=JSON_CALLBACK";

          popUpTres = $ionicPopup.show({
            title: 'Cargando',
            template: '<ion-spinner icon="spiral"></ion-spinner>'
          });

          popUpTres.then(function(res) {});

          //Obtengo la lista de likes del usuario, contiene el id de la imagen
          $http.jsonp(urlLike).success(function(data) {
            ingresarRegistroEnLaImagen($scope.imagenTres.idUsuarioDeLaFoto, $scope.imagenTres.id, 3);
            console.log(data)
          }); //$http
        }

        if ($scope.imagenCuatro.id != '0') {
          var urlLike = "https://api.instagram.com/v1/media/" + $scope.imagenCuatro.id + "/likes?access_token=" + tokenUsuario + "&callback=JSON_CALLBACK";

          popUpCuatro = $ionicPopup.show({
            title: 'Cargando',
            template: '<ion-spinner icon="spiral"></ion-spinner>'
          });

          popUpCuatro.then(function(res) {});

          //Obtengo la lista de likes del usuario, contiene el id de la imagen
          $http.jsonp(urlLike).success(function(data) {
            ingresarRegistroEnLaImagen($scope.imagenCuatro.idUsuarioDeLaFoto, $scope.imagenCuatro.id, 4);
            console.log(data)
          }); //$http
        }


        myPopupTres.close();

      }).catch(function(error) { //lecturaReferenciaUsuario then
        myPopupDos.close();
        $ionicPopup.alert({
          title: 'Error',
          template: 'No se puede conectar con la base de datos'
        });
      })
    obtenerTodasLasFotos();
  }

  $scope.botonNext = function() {
    console.log("Next")
    listaDeNextRondaActual.push($scope.imagenUno.id);
    listaDeNextRondaActual.push($scope.imagenDos.id);
    listaDeNextRondaActual.push($scope.imagenTres.id);
    listaDeNextRondaActual.push($scope.imagenCuatro.id);
    obtenerTodasLasFotos();
  }
  obtenerTodasLasFotos();
}])
