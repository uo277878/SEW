<?php

class BaseDatos
{
    private $db;
    private $user;
    private $servername;
    private $password;

    public function __construct(){
        $this->db = "base_datos";
        $this->user = "DBUSER2022";
        $this->servername = "localhost";
        $this->password = "DBPSWD2022";
    }

    // Crear base de datos
    public function crearBase(){
        $db = new mysqli($this->servername,$this->user,$this->password);
        if($db->connect_error) {
            exit ("<p>ERROR de conexión:".$db->connect_error."</p>");
        } else {
            echo "<p>Conexión establecida con " . $db->host_info . "</p>";
        }
        $cadenaSQL = "CREATE DATABASE IF NOT EXISTS base_datos COLLATE utf8_spanish_ci";
        if($db->query($cadenaSQL) === TRUE){
            echo "<p>Base de datos 'base_datos' creada con éxito</p>";
        } else {
            echo "<p>ERROR en la creación de la Base de Datos 'base_datos'. Error: " . $db->error . "</p>";
            exit();
        }
        $db->close();
    }

    // Crear tabla
    public function crearTabla(){
        $transaccion = new mysqli($this->servername,$this->user,$this->password, $this->db);
        $crearTabla = "CREATE TABLE IF NOT EXISTS PruebasUsabilidad(
                id INT NOT NULL AUTO_INCREMENT,
                nombre VARCHAR(20),
                apellidos VARCHAR(30),
                email VARCHAR(15),
                telefono VARCHAR(9),
                edad INT,
                sexo VARCHAR(20),
                nivel INT,
                tiempo INT,
                resultado VARCHAR(3),
                comentarios VARCHAR(255),
                propuestas VARCHAR(255),
                valoracion INT,
                PRIMARY KEY (id),
                CHECK (nivel BETWEEN 0 AND 10), 
                CHECK (valoracion BETWEEN 0 AND 10)
            )";
        if($transaccion->query($crearTabla) === TRUE){
            echo "<p>Tabla 'PruebasUsabilidad' creada con éxito</p>";
        } else{
            echo "<p>Error en la creación de la tabla 'PruebasUsabilidad'. Error: " . $transaccion->error . "</p>";
            exit();
        }
        $transaccion->close();
    }

    // Insertar datos
    public function insertarDatos(){
        $transaccion = new mysqli($this->servername,$this->user,$this->password, $this->db);
        $query = $transaccion->prepare("INSERT INTO PruebasUsabilidad(nombre,apellidos,email,telefono,edad,sexo,nivel,tiempo,resultado,comentarios,propuestas,valoracion)
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
        
        if((empty($_POST["nombre"])) || (empty($_POST["apellidos"])) || (empty($_POST["email"])) || (empty($_POST["telefono"])) || (empty($_POST["edad"])) || (empty($_POST["sexo"]))
        || (empty($_POST["nivel"])) || (empty($_POST["tiempo"])) || (empty($_POST["resultado"])) || (empty($_POST["comentarios"])) || (empty($_POST["propuestas"])) || (empty($_POST["valoracion"]))){
            echo "<p>No se pueden insertar los datos porque hay algún campo obligatorio vacío</p>";
        } else{
            $query->bind_param('ssssisiisssi', 
            $_POST["nombre"], 
            $_POST["apellidos"], 
            $_POST["email"], 
            $_POST["telefono"], 
            $_POST["edad"], 
            $_POST["sexo"],
            $_POST["nivel"], 
            $_POST["tiempo"], 
            $_POST["resultado"], 
            $_POST["comentarios"], 
            $_POST["propuestas"], 
            $_POST["valoracion"]);

            $query->execute();
            echo "<p>Inserción realizada con éxito</p>";
            $query->close();
        }
        $transaccion->close();
    }

    // Buscar datos
    public function buscarDatos(){
        if(empty($_POST["busqueda"])){
            echo "<p>Debe introducir un id obligatoriamente</p>";
        }
        $transaccion = new mysqli($this->servername,$this->user,$this->password, $this->db);
        $query = $transaccion->prepare("SELECT * FROM PruebasUsabilidad WHERE id = ?");
        $query->bind_param('i', $_POST["busqueda"]);
        $query->execute();

        $resultado = $query->get_result();

        if ($resultado->fetch_assoc() != NULL) {
            echo "<h3>Resultado de la búsqueda:</h3>";
            $resultado->data_seek(0); 
            while($row = $resultado->fetch_assoc()) {
                echo "<p>Nombre: " . $row["nombre"] . "</p>";
                echo "<p>Apellidos: " . $row["apellidos"] . "</p>";
                echo "<p>Email: " . $row["email"] . "</p>";
                echo "<p>Teléfono: " . $row["telefono"] . "</p>";
                echo "<p>Edad: " . $row["edad"] . "</p>";
                echo "<p>Sexo: " . $row["sexo"] . "</p>";
                echo "<p>Pericia informática: " . $row["nivel"] . "</p>";
                echo "<p>Tiempo empleado en completar la tarea: " . $row["tiempo"] . "</p>";
                echo "<p>¿Completó la tarea?: " . $row["resultado"] . "</p>";
                echo "<p>Comentarios extra: " . $row["comentarios"] . "</p>";
                echo "<p>Propuestas de mejora: " . $row["propuestas"] . "</p>";
                echo "<p>Valoración de la aplicación: " . $row["valoracion"] . "</p>";
            }
        } else {
            echo "<p>Búsqueda sin resultados</p>";
        }
        $query->close();
        $transaccion->close();
    }

    // Modificar datos
    public function modificarDatos(){
        if(empty($_POST["id"])){
            echo "<p>Debe introducir un id obligatoriamente</p>";
        }
        $transaccion = new mysqli($this->servername,$this->user,$this->password, $this->db);
        $query = $transaccion->prepare("UPDATE PruebasUsabilidad SET nombre = ?, apellidos = ?, email = ?, telefono = ?,
            edad = ?, sexo = ?, nivel = ?, tiempo = ?, resultado = ?, comentarios = ?, propuestas = ?, valoracion = ? WHERE id = ?");
        
        if((empty($_POST["nombre"])) || (empty($_POST["apellidos"])) || (empty($_POST["email"])) || (empty($_POST["telefono"])) || (empty($_POST["edad"])) || (empty($_POST["sexo"]))
        || (empty($_POST["nivel"])) || (empty($_POST["tiempo"])) || (empty($_POST["resultado"])) || (empty($_POST["comentarios"])) || (empty($_POST["propuestas"])) || (empty($_POST["valoracion"]))){
            echo "<p>No se pueden insertar los datos porque hay algún campo obligatorio vacío</p>";
        } else{
            $query->bind_param('ssssisiisssii', 
            $_POST["nombre"], 
            $_POST["apellidos"], 
            $_POST["email"], 
            $_POST["telefono"], 
            $_POST["edad"], 
            $_POST["sexo"],
            $_POST["nivel"], 
            $_POST["tiempo"], 
            $_POST["resultado"], 
            $_POST["comentarios"], 
            $_POST["propuestas"], 
            $_POST["valoracion"],
            $_POST["id"]);

            $query->execute();
            echo "<p>Inserción realizada con éxito</p>";
            $query->close();
        }
        $transaccion->close();
    }

    // Eliminar datos
    public function eliminarDatos(){
        if(empty($_POST["id"])){
            echo "<p>Debe introducir un id obligatoriamente</p>";
        }
        $transaccion = new mysqli($this->servername,$this->user,$this->password, $this->db);
        // Busca que haya una persona con ese id en la base de datos
        $query_1 = $transaccion->prepare("SELECT * FROM PruebasUsabilidad WHERE id = ?");
        $query_1->bind_param('i', $_POST["id"]);
        $query_1->execute();
        $resultado = $query_1->get_result();
        if ($resultado->fetch_assoc()!=NULL){
            $query_2 = $transaccion->prepare("DELETE FROM PruebasUsabilidad WHERE id = ?");
            $query_2->bind_param('i', $_POST["id"]);
            $query_2->execute();
            $query_2->close();
            echo "<p>Datos de la persona eliminados con éxito</p>";
        } else{
            echo "<p>No existe persona con ese id, inténtelo de nuevo.</p>";
        }
        $transaccion->close();
    }

    // Generar informe
    public function generarInforme(){

    }

    // Cargar datos CSV
    public function cargarCsv(){

    }

    // Exportar datos a CSV
    public function exportarCsv(){

    }

}