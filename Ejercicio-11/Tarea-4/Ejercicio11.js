"use strict";
class MapaDinamico {
    constructor(){
        
    }
    initMap(){
        
        var pueblo = {lat: 43.2453800, lng: -5.5629000};
        var mapa = new google.maps.Map(document.querySelector("section"),{zoom: 8,center:pueblo});
        var marcador = new google.maps.Marker({position:pueblo,map:mapa});
    }
}
var mapaDinamico = new MapaDinamico();