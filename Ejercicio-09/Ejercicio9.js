class Meteo{
	constructor(ciudad){
		this.ciudad = ciudad;
		this.apikey = "408077d50ec2778c2168d6df27083c28";
		this.tipo = "&mode=xml";
		this.unidades = "&units=metric";
		this.idioma = "&lang=es";
		this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
		this.mensajeError = "Hubo algún problema. No puedo obtener información de <a href='http://openweathermap.org'>OpenWeatherMap</a>";
		this.correcto = "¡Todo correcto! JSON recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>"
		console.log(this.url);
	}

	cargarDatos(){
		var ciudad = this.ciudad;
		$.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function(data){
                var datos = "<img alt=\"Imagen del tiempo en " + this.ciudad + "\" src=\"http://openweathermap.org/img/w/" + $('weather',data).attr("icon") + ".png\">";     
				datos += "<p>Ciudad: " + $('city',data).attr("name") + "</p>";
				datos += "<p>País: " + $('country',data).text() + "</p>";
				datos += "<p>Latitud: " + $('coord',data).attr("lat") + " grados</p>";
				datos += "<p>Longitud: " + $('coord',data).attr("lon") + " grados</p>";
				datos += "<p>Temperatura: " + $('temperature',data).attr("value") + "°C</p>";
				datos += "<p>Temperatura máxima: " + $('temperature',data).attr("max") + "°C</p>";
				datos += "<p>Temperatura mínima: " + $('temperature',data).attr("min") + "°C</p>";
				datos += "<p>Presión: " + $('pressure',data).attr("value") + " hPa</p>";
				datos += "<p>Humedad: " + $('humidity',data).attr("value") + "%</p>";
				var minutosZonaHoraria = new Date().getTimezoneOffset();
				var amanecer = $('sun',data).attr("rise");
				var amanecer1970 = Date.parse(amanecer);
				amanecer1970 -= minutosZonaHoraria * 60 * 1000;
				amanecer = (new Date(amanecer1970)).toLocaleTimeString("es-ES");
				datos += "<p>Amanece a las: " + amanecer + "</p>";
				var anochecer = $('sun',data).attr("set");
				var anochecer1970 = Date.parse(anochecer);
				anochecer1970 -= minutosZonaHoraria * 60 * 1000;
				anochecer = (new Date(anochecer1970)).toLocaleTimeString("es-ES");
				datos += "<p>Oscurece a las: " + anochecer + "</p>";
				datos += "<p>Dirección del viento: " + $('direction',data).attr("value") + " grados</p>";
				datos += "<p>Velocidad del viento: " + $('speed',data).attr("value") + " m/s</p>";
				var horaMedida = $('lastupdate',data).attr("value");
                var horaMedida1970 = Date.parse(horaMedida);
                horaMedida1970 -= minutosZonaHoraria * 60 * 1000;
                var horaMedidaLocal       = (new Date(horaMedida1970)).toLocaleTimeString("es-ES");
                var fechaMedidaLocal      = (new Date(horaMedida1970)).toLocaleDateString("es-ES");
				datos += "<p>Hora de la medida: " + horaMedidaLocal + "</p>";
				datos += "<p>Fecha de la medida: " + fechaMedidaLocal + "</p>";
				datos += "<p>Descripción: " + $('weather',data).attr("value") + "</p>";
				datos += "<p>Visibilidad: " + $('visibility',data).attr("value") + " metros</p>";
				datos += "<p>Nubosidad: " + $('clouds',data).attr("value") + "%</p>";

				$("section:first").append(datos);
            },
            error:function(data){
				var cod = $('cod',data.responseText).text();
				var msg = $('message',data.responseText).text();
				if(msg == "city not found"){
					msg = ciudad + " no encontrada";
				}
                $("section").remove();
				$("body").append("<section>");
				$("section:first").append("<h2>Error " + cod + ": " + msg + "</h2>");
				$("section").append("</section>");
            }
        });
	}

	verDatos(){
		$("section").remove();
		$("body").append("<section>");
		$("section:first").append("<h2>Datos en JSON desde <a href='http://openweathermap.org'>OpenWeatherMap</a></h2>");
		$("section:first").append("<h3>" + this.correcto + "</h3>");
		$("section:first").append("<h4>Datos de " + this.ciudad + "</h4>");
		$("section").append("</section>");
		this.cargarDatos();
	}
}