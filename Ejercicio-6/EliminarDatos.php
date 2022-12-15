<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name = "author" content = "Miriam González Alonso"/>
    <meta name = "description" content = "Página para eliminar los datos de una persona"/>
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
        <a href="ModificarDatos.php" title="Modificar datos de una tabla" tabindex="5">Modificar datos de una tabla</a>
        <a href="GenerarInforme.php" title="Generar un informe" tabindex="7">Generar un informe</a>
        <a href="CargarCSV.php" title="Cargar datos de un CSV" tabindex="8">Cargar datos de un CSV</a>
        <a href="Exportar.php" title="Exportar datos a CSV" tabindex="9">Exportar datos a CSV</a>
    </nav>
    <form action='#' method='post'>
        <p>
            <label for="id">Introduzca el id de la persona que quiere borrar:</label>
            <input id="id" type="text" name="id" />
        </p>
        <input type="submit" name="eliminar" value="Eliminar datos"/>
    </form>
    <?php
        require('BaseDatos.php');
        $base = new BaseDatos();
        if (count($_POST) > 0){
            if (isset($_POST['eliminar'])){
                $base->eliminarDatos();
            }
        }
	?>
</body>
</html>