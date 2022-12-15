<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name = "author" content = "Miriam González Alonso"/>
    <meta name = "description" content = "Página para modificar los datos de una persona"/>
    <meta name ="viewport" content ="width=device-width, initial scale=1.0" />
    <title>Ejercicio 6</title>
    <link rel="stylesheet" type="text/css" href="Ejercicio6.css" />

</head>
<body>
    <h1>Ejercicio 6</h1>
    <nav>
        <a href="CrearBD.php" title="Crear base de datos" tabindex="1">Crear base de datos</a>
        <a href="CrearTabla.php" title="Crear una tabla" tabindex="2">Crear una tabla</a>
        <a href="InsertarDatos.php" title="Insertar datos en una tabla" tabindex="3">Insertar datos en una tabla</a>
        <a href="BuscarDatos.php" title="Buscar datos en una tabla" tabindex="4">Buscar datos en una tabla</a>
        <a href="EliminarDatos.php" title="Eliminar datos de una tabla" tabindex="6">Eliminar datos de una tabla</a>
        <a href="GenerarInforme.php" title="Generar un informe" tabindex="7">Generar un informe</a>
        <a href="CargarCSV.php" title="Cargar datos de un CSV" tabindex="8">Cargar datos de un CSV</a>
        <a href="Exportar.php" title="Exportar datos a CSV" tabindex="9">Exportar datos a CSV</a>
    </nav>
    <h2>Modificar los datos</h2>
    <form action='#' method='post'>
            <p>
				<label for="id">Id:</label>
				<input id="id" type="text" name="id" />
			</p>
			<p>
				<label for="nombre">Nombre:</label>
				<input id="nombre" type="text" name="nombre" required />
			</p>
			<p>
				<label for="apellidos">Apellidos:</label>
				<input id="apellidos" type="text" name="apellidos" required />
			</p>
            <p>
				<label>E-mail: <input type="email" name="email" required /></label>
			</p>
            <p>
				<label for="telefono">Teléfono:</label>
				<input id="telefono" type="tel" name="telefono" required />
			</p>
			<p>
				<label for="edad">Edad:</label>
				<input id="edad" type="number" name="edad" required />
			</p>
			<fieldset>
				<legend>Sexo</legend>
				<p>
					<label for="masculino">
						<input id="masculino" type="radio" name="sexo" value="Masculino" />Masculino</label>
				</p>
				<p>
					<label for="femenino">
						<input id="femenino" type="radio" name="sexo" value="Femenino" />Femenino</label>
				</p>
			</fieldset>
			<p>
				<label for="nivel">Nivel de pericia informática de la persona</label>
				<input id="nivel" type="number" name="nivel" required/>
			</p>
            <p>
				<label for="tiempo">Tiempo en hacer la tarea:</label>
				<input id="tiempo" type="number" name="tiempo" required />
			</p>
            <fieldset>
				<legend>¿Completado con éxito?</legend>
				<p>
					<label for="si">
						<input id="si" type="radio" name="resultado" value="Si" />Sí</label>
				</p>
				<p>
					<label for="no">
						<input id="no" type="radio" name="resultado" value="No" />No</label>
				</p>
			</fieldset>
			<p>
				<label for="comentarios">Comentarios sobre problemas 
					<textarea id="comentarios" name="comentarios" maxlength=1000></textarea>
				</label>
			</p>
            <p>
				<label for="propuestas">Propuestas de mejora 
					<textarea id="propuestas" name="propuestas" maxlength=1000></textarea>
				</label>
			</p>
			<p>
				<label for="valoracion">Valoración de la aplicación</label>
				<input id="valoracion" type="number" name="valoracion" required/>
			</p>
			<input type="submit" name="actualizar" value="Actualizar datos"/>
		</form>
	<?php
        require('BaseDatos.php');
        $base = new BaseDatos();
        if (count($_POST) > 0){
            if (isset($_POST['actualizar'])){
                $base->modificarDatos();
            }
        }
	?>
</body>
</html>