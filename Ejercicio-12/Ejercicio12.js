"use strict";
class LectorTexto {
    constructor (){
        
    }

    leerArchivos(){
        $("p").remove();
        var nBytes = 0;
        var archivos = document.querySelector('input[type=file]').files;
        var numArchivos = archivos.length;
        for (var i = 0; i < numArchivos; i++) {
          nBytes += archivos[i].size;
        }
        var nombresTiposTamaños="";
        for (var i = 0; i < numArchivos; i++) {
          nombresTiposTamaños += "<p>Archivo nº " + (i+1) +": "+ archivos[i].name  + " Tamaño: " + archivos[i].size +" bytes " + " Tipo: " + archivos[i].type+"</p>" ;
        }
        
        $("main").append("<p>Número de archivos seleccionados: " + numArchivos + "</p>");
        $("main").append("<p>Tamaño total: " + nBytes + " bytes</p>");
        $("main").append(nombresTiposTamaños);
    }
}
var lectorTexto = new LectorTexto();