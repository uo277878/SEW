<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="author" content="Miriam González Alonso" />
    <meta name="description" content="Página web que obtiene el precio del cobre" />
    <meta name="viewport" content="width=device-width, initial scale=1.0" />
    <title>Ejercicio 4</title>
    <link rel="stylesheet" type="text/css" href="Ejercicio4.css" />
</head>

<body>
    <h1>Datos del precio del petróleo obtenidos en <a href="https://commodities-api.com">Commodities</a></h1>
    <?php
        $key = "6eld8xr3itqbv0202z89vcpol1lj4yc2bmq4pu0jn3uiudtu7emvr7visc1u";
        $url = "https://commodities-api.com/api/latest?access_key=" . $key . "&base=EUR&symbols=XCU";

        $result = file_get_contents($url);
        $json = json_decode($result, true);

        $fecha = $json['data']['date'];
        $precio = 1/$json['data']['rates']['XCU'];
        $unidad = $json['data']['unit'];
        echo "<main>
            <p>Consulta realizada el día " . $fecha ."</p>
            <p>El precio del cobre acutalmente es de " . round($precio,2) . "€/" . $unidad . "</p>
        </main>";
    ?>
</body>
</html>