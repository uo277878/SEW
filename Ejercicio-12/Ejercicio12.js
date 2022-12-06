"use strict";
class LectorTexto {
    constructor (){
        
    }

    leerArchivos(){
        $("p").remove();
        var archivo = document.querySelector('input[type=file]').files[0];
        var nBytes = archivo.size;
        var nombreTipoTamaño= "<p>Archivo: "+ archivo.name  + " Tamaño: " + archivo.size +" bytes " + " Tipo: " + archivo.type+"</p>" ;
        var lector = new FileReader();
        lector.onload = function (evento) {
          console.log(lector.result);
			    $("aside").text(lector.result);
        }      
        lector.readAsText(archivo);
        
        $("main").append(nombreTipoTamaño);
    }
}
var lectorTexto = new LectorTexto();