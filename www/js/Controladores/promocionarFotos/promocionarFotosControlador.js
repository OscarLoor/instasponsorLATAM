aplicacion.controller('promocionarFotosControlador', ['$scope', '$state', 'parametrosUsuarioFactory', '$http', '$ionicPopup', function($scope, $state, parametrosUsuarioFactory, $http, $ionicPopup) {

    //Muestro una pantalla de carga
    var myPopup = $ionicPopup.show({
      title: 'Cargando',
      template: '<ion-spinner icon="spiral"></ion-spinner>'
    });

    myPopup.then(function(res) {});

    var token = parametrosUsuarioFactory.obtenerToken(); //Obtengo el token

    //Creo la URL con el token recibido
    var url = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + token + "&callback=JSON_CALLBACK";

    //Hago la llamada a la API de Instagram
    $http.jsonp(url).success(function(data) {

      // var nombre = data.data.full_name
      // var imagenDePerfil = data.data.profile_picture
      // var idUsuario = data.data.id
      $scope.imagenesRecibidas = [];
      var arregloTotal = [];
      var contenedorDeImagenes = data.data;
      //
      for (i = 0; i < contenedorDeImagenes.length; i++) {
        var objeto = {
          id: contenedorDeImagenes[i].id,
          url: contenedorDeImagenes[i].images.low_resolution.url
        }

        arregloTotal.push(objeto)

      }

      //Tengo el arreglo con todos los elementos, necesito dividirlo para mostrarlo al usuario de poco en poco
      var contadorDeElementos = function(offset, limite) {
        return arregloTotal.slice(offset, offset + limite);
      }

      var totalDeElementos = arregloTotal.length;

      var itemsPorPagina = 10;
      var paginaActual = 0;

      $scope.imagenesRecibidas = contadorDeElementos(paginaActual * itemsPorPagina, itemsPorPagina);

      $scope.cargarMas = function() {
        paginaActual++;
        var nuevosElementos = contadorDeElementos(paginaActual * itemsPorPagina, itemsPorPagina);
        $scope.imagenesRecibidas = $scope.imagenesRecibidas.concat(nuevosElementos);
      };

      var contadorDePaginasTotales = function() {
        //Redondeo al numero mayor de 2.3 a 3
        return Math.ceil(totalDeElementos / itemsPorPagina);
      };

      $scope.claseDesactivarSiguientePagina = function() {
        if(paginaActual === (contadorDePaginasTotales() - 1)){
          return true
        }
        return  false
      };
      // for (var imagen in contenedorDeImagenes){
      //   console.log(JSON.stringify(imagen.id))
      //   console.log(JSON.stringify(imagen.images.low_resolution.url))
      // // console.log(imagen.images.low_resolution.url);
      // // console.log(imagen.id);
      // console.log("Nueva imagen")
      // }

      myPopup.close();
    }); //$http

    $scope.seleccionarNumeroDeLikes = function(idImagenRecibida, urlRecibida) {

      $state.go('pFNumeroDeLikes', {
        idUsuario: parametrosUsuarioFactory.obtenerIdUsuario(),
        idImagen: idImagenRecibida,
        url: urlRecibida
      });

    }
  }])
  //
  // [{
  //   "attribution": null,
  //   "tags": [],
  //   "type": "image",
  //   "location": null,
  //   "comments": {
  //     "count": 0
  //   },
  //   "filter": "Normal",
  //   "created_time": "1458747150",
  //   "link": "https://www.instagram.com/p/BDTPnvzTMZVcL1KlmRuPeRhYpHLx2lbipUQevc0/",
  //   "likes": {
  //     "count": 0
  //   },
  //   "images": {
  //     "low_resolution": {
  //       "url": "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/12531075_1685081915077682_778162309_n.jpg",
  //       "width": 320,
  //       "height": 320
  //     },
  //     "thumbnail": {
  //       "url": "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/12531075_1685081915077682_778162309_n.jpg",
  //       "width": 150,
  //       "height": 150
  //     },
  //     "standard_resolution": {
  //       "url": "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12531075_1685081915077682_778162309_n.jpg",
  //       "width": 640,
  //       "height": 640
  //     }
  //   },
  //   "users_in_photo": [],
  //   "caption": null,
  //   "user_has_liked": false,
  //   "id": "1212381426776589909_2981244912",
  //   "user": {
  //     "username": "mogulheart",
  //     "profile_picture": "https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-19/12725106_1523062291330441_1327147976_a.jpg",
  //     "id": "2981244912",
  //     "full_name": "Oscar Loor"
  //   }
  // }, {
  //   "attribution": null,
  //   "tags": [],
  //   "type": "image",
  //   "location": null,
  //   "comments": {
  //     "count": 0
  //   },
  //   "filter": "Normal",
  //   "created_time": "1458747127",
  //   "link": "https://www.instagram.com/p/BDTPk_VTMZOaPT6NBZYcwgSQTJGjkIcS_8cmj40/",
  //   "likes": {
  //     "count": 0
  //   },
  //   "images": {
  //     "low_resolution": {
  //       "url": "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/915511_1747839865436121_117903370_n.jpg",
  //       "width": 320,
  //       "height": 320
  //     },
  //     "thumbnail": {
  //       "url": "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/915511_1747839865436121_117903370_n.jpg",
  //       "width": 150,
  //       "height": 150
  //     },
  //     "standard_resolution": {
  //       "url": "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/915511_1747839865436121_117903370_n.jpg",
  //       "width": 640,
  //       "height": 640
  //     }
  //   },
  //   "users_in_photo": [],
  //   "caption": null,
  //   "user_has_liked": false,
  //   "id": "1212381237294712398_2981244912",
  //   "user": {
  //     "username": "mogulheart",
  //     "profile_picture": "https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-19/12725106_1523062291330441_1327147976_a.jpg",
  //     "id": "2981244912",
  //     "full_name": "Oscar Loor"
  //   }
  // }, {
  //   "attribution": null,
  //   "tags": [],
  //   "type": "image",
  //   "location": null,
  //   "comments": {
  //     "count": 0
  //   },
  //   "filter": "Normal",
  //   "created_time": "1458747100",
  //   "link": "https://www.instagram.com/p/BDTPhndzMZGh4C1dYE-xlDfTwVGH7WsqUJQkHA0/",
  //   "likes": {
  //     "count": 0
  //   },
  //   "images": {
  //     "low_resolution": {
  //       "url": "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/917896_1568464976797412_2043131959_n.jpg",
  //       "width": 320,
  //       "height": 320
  //     },
  //     "thumbnail": {
  //       "url": "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/917896_1568464976797412_2043131959_n.jpg",
  //       "width": 150,
  //       "height": 150
  //     },
  //     "standard_resolution": {
  //       "url": "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/917896_1568464976797412_2043131959_n.jpg",
  //       "width": 640,
  //       "height": 640
  //     }
  //   },
  //   "users_in_photo": [],
  //   "caption": null,
  //   "user_has_liked": false,
  //   "id": "1212381005509084742_2981244912",
  //   "user": {
  //     "username": "mogulheart",
  //     "profile_picture": "https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-19/12725106_1523062291330441_1327147976_a.jpg",
  //     "id": "2981244912",
  //     "full_name": "Oscar Loor"
  //   }
  // }, {
  //   "attribution": null,
  //   "tags": [],
  //   "type": "image",
  //   "location": null,
  //   "comments": {
  //     "count": 0
  //   },
  //   "filter": "Normal",
  //   "created_time": "1458747074",
  //   "link": "https://www.instagram.com/p/BDTPeeVTMZBhc-e4Z6LYwpmtCQEoXPL7zFO5TQ0/",
  //   "likes": {
  //     "count": 0
  //   },
  //   "images": {
  //     "low_resolution": {
  //       "url": "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/12383099_1124868104198347_511241246_n.jpg",
  //       "width": 320,
  //       "height": 320
  //     },
  //     "thumbnail": {
  //       "url": "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/12383099_1124868104198347_511241246_n.jpg",
  //       "width": 150,
  //       "height": 150
  //     },
  //     "standard_resolution": {
  //       "url": "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12383099_1124868104198347_511241246_n.jpg",
  //       "width": 640,
  //       "height": 640
  //     }
  //   },
  //   "users_in_photo": [],
  //   "caption": null,
  //   "user_has_liked": false,
  //   "id": "1212380789544371777_2981244912",
  //   "user": {
  //     "username": "mogulheart",
  //     "profile_picture": "https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-19/12725106_1523062291330441_1327147976_a.jpg",
  //     "id": "2981244912",
  //     "full_name": "Oscar Loor"
  //   }
  // }, {
  //   "attribution": null,
  //   "tags": [],
  //   "type": "image",
  //   "location": null,
  //   "comments": {
  //     "count": 0
  //   },
  //   "filter": "Normal",
  //   "created_time": "1458747039",
  //   "link": "https://www.instagram.com/p/BDTPaLnzMY0XdFuXlw4xjfAOf5lvDqeSJwPwQ80/",
  //   "likes": {
  //     "count": 0
  //   },
  //   "images": {
  //     "low_resolution": {
  //       "url": "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/918137_469237833282643_998909592_n.jpg",
  //       "width": 320,
  //       "height": 320
  //     },
  //     "thumbnail": {
  //       "url": "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/918137_469237833282643_998909592_n.jpg",
  //       "width": 150,
  //       "height": 150
  //     },
  //     "standard_resolution": {
  //       "url": "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/918137_469237833282643_998909592_n.jpg",
  //       "width": 640,
  //       "height": 640
  //     }
  //   },
  //   "users_in_photo": [],
  //   "caption": null,
  //   "user_has_liked": false,
  //   "id": "1212380494575748660_2981244912",
  //   "user": {
  //     "username": "mogulheart",
  //     "profile_picture": "https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-19/12725106_1523062291330441_1327147976_a.jpg",
  //     "id": "2981244912",
  //     "full_name": "Oscar Loor"
  //   }
  // }]
