class Ejercicio7{

	constructor(){
	
	}

	ocultar(){
		$("p").hide();
	}

	mostrar(){
		$("p").show();
	}

	cambiar(){
		$("h3").text("Información sobre versiones");
	}

	resetear(){
		$("h3").text("Versiones de Rust");
	}

	addFooter(){
		$("article").after("<footer><p>Trabajo para la asignatura de SEW - Curso 2022-2023 - Universidad de Oviedo - Miriam González Alonso</p></footer>");
	}

	eliminarFoto(){
		$("img").remove();
	}

	recorrerDom(){
		$("article").after("<section>");
		$("section").append("<h2>Árbol DOM del documento</h2>");
		$("*", document.body).each(function() {
            var etiquetaPadre = $(this).parent().get(0).tagName;
            $("section").append(document.createTextNode( "Etiqueta padre : <"  + etiquetaPadre + "> elemento : <" + $(this).get(0).tagName +">"));
        });
		$("article").after("</section>");
	}

	mostrarSumatorio(){
		var numFilas = 0;
		$("table tr").each(function() {
			numFilas+=1;
		});
		console.log(numFilas);
		var numColumnas = 0;
		$("table th").each(function() {
			numColumnas+=1;
		});
		$("table tr:first").append("<th>Sumatorio</th>");
		$("table tbody tr:not(:first)").append("<td>" + numColumnas + "</td>");
		
		$("table tbody").append("<tr><td>Total: " + numFilas + "</td></tr>");
		$("table tr:last").append("<td>Total: " + numFilas + "</td>");
	}
}

var ejercicio7 = new Ejercicio7();