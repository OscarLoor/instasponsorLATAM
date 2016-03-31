aplicacion.controller('pointsPlusCorporateSeleccionarArchivoControlador', ['$scope', '$state', '$firebaseArray', '$stateParams', '$ionicPopup', '$http', 'parametrosUsuarioFactory', function($scope, $state, $firebaseArray, $stateParams, $ionicPopup, $http, parametrosUsuarioFactory) {

    var tipoDePublicidad = $stateParams.compra.tipo //Banner, Video
    $scope.tipoDePublicidad = tipoDePublicidad;
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


    $http.jsonp(url).then(function successCallback(data) {
      //console.log(data)
      // var nombre = data.data.full_name
      // var imagenDePerfil = data.data.profile_picture
      // var idUsuario = data.data.id
      $scope.imagenesRecibidas = [];
      var arregloTotal = [];
      var contenedorDeImagenes = data.data.data;
      //
      //console.log(contenedorDeImagenes)

      if (tipoDePublicidad == 'Banner') {
        tipoDePublicidad = 'image'
      } else {
        tipoDePublicidad = 'video'
      }

      for (i = 0; i < contenedorDeImagenes.length; i++) {
        if (contenedorDeImagenes[i].type == tipoDePublicidad) {
          if(contenedorDeImagenes[i].type =='image'){
            var objeto = {
              id: contenedorDeImagenes[i].id,
              url: contenedorDeImagenes[i].images.low_resolution.url,
              urlVideo: contenedorDeImagenes[i].images.low_resolution.url
            }

            arregloTotal.push(objeto)
          }else{
            var objeto = {
              id: contenedorDeImagenes[i].id,
              url: contenedorDeImagenes[i].images.low_resolution.url,
              urlVideo: contenedorDeImagenes[i].videos.low_resolution.url
            }

            arregloTotal.push(objeto)
          }

        } else {



          //console.log("Publicidad diferente a:" + tipoDePublicidad)
        }


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
        if (paginaActual === (contadorDePaginasTotales() - 1)) {
          return true
        }
        return false
      };
      // for (var imagen in contenedorDeImagenes){
      //   console.log(JSON.stringify(imagen.id))
      //   console.log(JSON.stringify(imagen.images.low_resolution.url))
      // // console.log(imagen.images.low_resolution.url);
      // // console.log(imagen.id);
      // console.log("Nueva imagen")
      // }

      myPopup.close();
    }, function errorCallback(response) {
      myPopup.close();
      $ionicPopup.confirm({
          title: 'ERROR',
          content: 'No se pudo conectar con la API de instagram: ' + JSON.stringify(response)
        })
        .then(function(result) {});
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });




    $http.jsonp(url).success(function(data) {

    }); //$http



    $scope.seleccionarContenido = function(idImagenRecibida, urlRecibida) {

        //Agrego los datos a la compra
        var compra = $stateParams.compra;
        compra.idPublicidad = idImagenRecibida;
        compra.urlPublicidad = urlRecibida;

        $state.go('detallesFacturacion', {
          precio: $stateParams.precio,
          descripcion: $stateParams.descripcion,
          compra: compra
        });


      } //seleccionarNumeroDeLikes

  }]) //CONTROLADOR
