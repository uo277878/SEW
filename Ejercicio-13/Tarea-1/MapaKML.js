"use strict";
class MapaKML {
    constructor (){
        
    }

    cargarDatos(archivoKML){
        archivoKML = archivoKML[0];
        console.log(archivoKML.name);
        var pueblo = {lat: 43.2453800, lng: -5.5629000};
        var mapa = new google.maps.Map(document.querySelector("main"),{zoom: 8,center:pueblo});
        var lector = new FileReader();
        lector.onload = function (evento) {
            var contenido = lector.result;
        }      
        lector.readAsText(archivoKML);
        $.ajax({
            dataType: "xml",
            url: archivoKML.name,
            method: 'GET',
            success: function(data){
                var coordinates = $('coordinates',data);
                var placemarks = $('Placemark',data);
                for(var i = 0; i < coordinates.length; i++){
                    var campos = coordinates[i].innerHTML.split(",");
                    var longitud = campos[0];
                    var latitud = campos[1];
                    var nombre = placemarks[i].textContent;
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
var mapa = new MapaKML();