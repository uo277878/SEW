class Oro{
	constructor(){
		this.url = "https://api.metalpriceapi.com/v1/latest?api_key=5829141c3ace12ae5457fc90d2c2477b&base=EUR&currencies=XAU,USD";
		console.log(this.url);
		// Ahora mismo XAU: 0.0005929
		// 1/0.0005929 = 1.686,625 euros
	}

	cargarDatos(moneda){
		$.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(data){
                var precioEuros = 1/data.rates.XAU;
				var precioDolares = data.rates.USD/data.rates.XAU;
				if(moneda == "euros"){
					$("main").append("<p>El precio actual del oro es de " + precioEuros.toFixed(2) + "€");
				} else{
					$("main").append("<p>El precio actual del oro es de " + precioDolares.toFixed(2) + "$");
				}
            },
            error:function(data){
				var cod = data.responseJSON.cod;
				var msg = data.responseJSON.message;
				$("main").empty();
				$("main").append("<h2>Error " + cod + ": " + msg + "</h2>");
            }
        });
	}

	verDatos(moneda){
		$("main").empty();
		$("main").append("<h2>Datos obtenidos en <a href='https://metalpriceapi.com/'>Metalprice API</a></h2>");
		this.cargarDatos(moneda);
	}
}

var oro = new Oro();