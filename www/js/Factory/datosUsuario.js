aplicacion.factory("parametrosUsuarioFactory", function($rootScope){
    var datos={
      nombre : '',
      promoPoints: '',
      pais:'',
      imagenDePerfil:'',
      idUsuario:'',
      token:''
    }

    var interfaz = {
      actualizarNombre: function(nombreRecibido){
          datos.nombre = nombreRecibido;
          $rootScope.$broadcast("datosActualizados");
      },
     obtenerNombre: function(){
            //console.log("Datos adentro:"+datos);
            return datos.nombre;
        },
        actualizarPromoPoints: function(promoPointsRecibidos){
            datos.promoPoints = promoPointsRecibidos;
            $rootScope.$broadcast("datosActualizados");
        },
        obtenerPromoPoints: function(){
            //console.log("Datos adentro:"+datos);
            return datos.promoPoints;
        },
        actualizarPais: function(paisRecibido){
            datos.pais = paisRecibido;
            $rootScope.$broadcast("datosActualizados");
        },
        obtenerPais: function(){
            //console.log("Datos adentro:"+datos);
            return datos.pais;
        },
        actualizarImagenDePerfil: function(imagenDePerfilRecibido){
            datos.imagenDePerfil = imagenDePerfilRecibido;
            $rootScope.$broadcast("datosActualizados");
        },
        obtenerImagenDePerfil: function(){
            //console.log("Datos adentro:"+datos);
            return datos.imagenDePerfil;
        },
        actualizarIdUsuario: function(idUsuarioRecibido){
            datos.idUsuario = idUsuarioRecibido;
            $rootScope.$broadcast("datosActualizados");
        },
        obtenerIdUsuario: function(){
            //console.log("Datos adentro:"+datos);
            return datos.idUsuario;
        },
        actualizarToken: function(tokenRecibido){
            datos.token = tokenRecibido;
            $rootScope.$broadcast("datosActualizados");
        },
        obtenerToken: function(){
            //console.log("Datos adentro:"+datos);
            return datos.token;
        }


    }
    return interfaz;
})
