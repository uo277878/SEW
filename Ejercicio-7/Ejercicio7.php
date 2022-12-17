<?php
    session_start();
    require("BaseDatos.php");
    $base = new BaseDatos();
    $base->crearBase();
?>
<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name = "author" content = "Miriam González Alonso"/>
    <meta name = "description" content = "Página web para obtener información sobre asignaturas, profesores, etc"/>
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
    <main>
        <p>Bienvenido/a a la página web de la Universidad, donde podrá realizar distintos trámites tanto si es profesor, alumno o coordinador.</p>    
    </main>
</body>
</html>