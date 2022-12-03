class Meteo{
	constructor(ciudad){
		this.ciudad = ciudad;
		this.apikey = "408077d50ec2778c2168d6df27083c28";
		this.unidades = "&units=metric";
		this.idioma = "&lang=es";
		this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.unidades + this.idioma + "&APPID=" + this.apikey;
		this.mensajeError = "Hubo algún problema. No puedo obtener información de <a href='http://openweathermap.org'>OpenWeatherMap</a>";
		this.correcto = "¡Todo correcto! JSON recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>"
		console.log(this.url);
	}

	cargarDatos(){
		var ciudad = this.ciudad;
		$.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(data){
                var datos = "<img alt=\"Imagen del tiempo en " + this.ciudad + "\" src=\"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png\">";     
				datos += "<p>Ciudad: " + data.name + "</p>";
				datos += "<p>País: " + data.sys.country + "</p>";
				datos += "<p>Latitud: " + data.coord.lat + " grados</p>";
				datos += "<p>Longitud: " + data.coord.lon + " grados</p>";
				datos += "<p>Temperatura: " + data.main.temp + "°C</p>";
				datos += "<p>Temperatura máxima: " + data.main.temp_max + "°C</p>";
				datos += "<p>Temperatura mínima: " + data.main.temp_min + "°C</p>";
				datos += "<p>Presión: " + data.main.pressure + " hPa</p>";
				datos += "<p>Humedad: " + data.main.humidity + "%</p>";
				datos += "<p>Amanece a las: " + new Date(data.sys.sunrise *1000).toLocaleTimeString() + "</p>";
				datos += "<p>Oscurece a las: " + new Date(data.sys.sunset *1000).toLocaleTimeString() + "</p>";
				datos += "<p>Dirección del viento: " + data.wind.deg + " grados</p>";
				datos += "<p>Velocidad del viento: " + data.wind.speed + " m/s</p>";
				datos += "<p>Hora de la medida: " + new Date(data.dt *1000).toLocaleTimeString() + "</p>";
				datos += "<p>Fecha de la medida: " + new Date(data.dt *1000).toLocaleDateString() + "</p>";
				datos += "<p>Descripción: " + data.weather[0].description + "</p>";
				datos += "<p>Visibilidad: " + data.visibility + " metros</p>";
				datos += "<p>Nubosidad: " + data.clouds.all + "%</p>";

				$("section:first").append(datos);
            },
            error:function(data){
				var cod = data.responseJSON.cod;
				var msg = data.responseJSON.message;
				if(msg == "city not found"){
					msg = ciudad + " no existe";
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
		this.cargarDatos();
		$("section").append("</section>");
	}
}