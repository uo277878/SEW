"use strict";
class MapaDinamico {
    constructor (){
        
    }
    initMap(){
        var centro = {lat: 43.3672702, lng: -5.8502461};
        var mapa = new google.maps.Map(document.querySelector('main'),{
            zoom: 8,
            center:centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    
        var infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Localización encontrada');
                infoWindow.open(mapa);
                mapa.setCenter(pos);
            }, function() {
                handleLocationError(true, infoWindow, mapa.getCenter());
            });
            } else {
                handleLocationError(false, infoWindow, mapa.getCenter());
            }
    }

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: Ha fallado la geolocalización' :
                              'Error: Su navegador no soporta geolocalización');
        infoWindow.open(mapa);
    }        
}
var mapaDinamico = new MapaDinamico();