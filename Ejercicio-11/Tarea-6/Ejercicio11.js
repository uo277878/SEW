"use strict";
class MapaDinamico {
    constructor (){
        
    }
    initMap(){
        if(document.querySelector('input[type=text][name=\"busqueda\"]').value != ""){
            var valor = document.querySelector('input[type=text][name=\"busqueda\"]').value;
            var pueblo = {lat: 43.2453800, lng: -5.5629000};
            var mapa = new google.maps.Map(document.querySelector("main"),{zoom: 12});
            var request = {
                query: valor,
                fields: ['name', 'geometry'],
            };

            var service = new google.maps.places.PlacesService(mapa);

            service.findPlaceFromQuery(request, function(results, status) {
                var lugar = results[0];
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    var marcador = new google.maps.Marker({position:lugar.geometry.location,map:mapa});
                    mapa.setCenter(lugar.geometry.location);
                }
            });
        }
    }     
}
var mapaDinamico = new MapaDinamico();