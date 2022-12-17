<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name = "author" content = "Miriam González Alonso"/>
    <meta name = "description" content = "Página web para los profesores"/>
    <meta name ="viewport" content ="width=device-width, initial scale=1.0" />
    <title>Ejercicio 7</title>
    <link rel="stylesheet" type="text/css" href="Ejercicio7.css" />

</head>
<body>
    <h1>Ejercicio 7</h1>
    <nav>
        <a href="Carreras.php" title="Carreras" tabindex="1">Carreras</a>
        <a href="Profesores.php" title="Profesores" tabindex="2">Para profesores</a>
        <a href="Alumnos.php" title="Alumnos" tabindex="3">Para alumnos</a>
    </nav>
    <form action="#" method="post">
        <label for="dni">Introduzca su dni:</label>
        <input type="text" name="dni"/>
        <input type="submit" name = "generar" value="Generar informe de alumnos" />
    </form>
    <?php
        require("BaseDatos.php");
        $base = new BaseDatos();
        if (count($_POST) > 0){
            if (isset($_POST["generar"])){
                $base->informeProfesor();
            } 
        }
	?>
</body>
</html>