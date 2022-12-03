class Lector{

	constructor(){
	
	}

	leerFichero(archivo){
        var archivo = archivo[0];
		var lector = new FileReader();
        lector.onload = function (evento) {
            var contenido = lector.result;
			var area = $("main").children("textarea").eq(1);
			area.text(lector.result);
        }      
        lector.readAsText(archivo);
	}

	dragAndDrop(event){
		event.preventDefault();
		var files = event.dataTransfer.files;
		var archivo = files[0];
		var lector = new FileReader();
        lector.onload = function (evento) {
            var contenido = lector.result;
			var area = $("main").children("textarea").eq(1);
			area.text(lector.result);
        }      
        lector.readAsText(archivo);
	}

	dragOverHandler(event){
		event.preventDefault();
	}

	copiar(){
		var texto = $("main").children("textarea").eq(1).text();
		console.log(texto);
		navigator.clipboard.writeText(texto)
	}
	
}

var lector = new Lector();