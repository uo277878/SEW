"use strict";
class MapaGeoJSON {
    constructor (){
        
    }

    cargarDatos(archivoGeoJson){
        archivoGeoJson = archivoGeoJson[0];
        console.log(archivoGeoJson.name);
        var pueblo = {lat: 43.2453800, lng: -5.5629000};
        var mapa = new google.maps.Map(document.querySelector("main"),{zoom: 8,center:pueblo});
        var lector = new FileReader();
        lector.onload = function (evento) {
            var contenido = lector.result;
        }      
        lector.readAsText(archivoGeoJson);
        $.ajax({
            dataType: "json",
            url: archivoGeoJson.name,
            method: 'GET',
            success: function(data){
                var coordinates = [];
                for(var i = 0; i < data.features.length; i++){
                    coordinates.push(data.features[i].geometry.coordinates);
                }
                for(var i = 0; i < coordinates.length; i++){
                    var longitud = coordinates[i][0];
                    var latitud = coordinates[i][1];
                    var nombre = data.features[i].properties.description;
                    var punto = {lat: Number(latitud), lng: Number(longitud)};
                    var marcador = new google.maps.Marker({
                        position:punto,
                        map:mapa,
                        title: nombre
                    });
                }
            },
            error:function(data){
				var cod = $('cod',data.responseText).text();
				var msg = $('message',data.responseText).text();
                $("main").remove();
				$("body").append("<main>");
				$("main").append("<h2>Error " + cod + ": " + msg + "</h2>");
				$("main").append("</main>");
            }
        });
	}
}
var mapa = new MapaGeoJSON();