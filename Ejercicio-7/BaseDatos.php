<?php

class BaseDatos
{
    private $db;
    private $user;
    private $servername;
    private $password;

    public function __construct(){
        $this->db = "universidad";
        $this->user = "DBUSER2022";
        $this->servername = "localhost";
        $this->password = "DBPSWD2022";
        $this->crearBase();
    }

    // Crear base de datos
    public function crearBase(){
        $db = new mysqli($this->servername,$this->user,$this->password);
        if($db->connect_error) {
            exit ("<p>ERROR de conexión:".$db->connect_error."</p>");
        } 
        $cadenaSQL = "CREATE DATABASE IF NOT EXISTS universidad COLLATE utf8_spanish_ci";
        if(!$db->query($cadenaSQL) === TRUE){
            echo "<p>ERROR en la creación de la Base de Datos 'universidad'. Error: " . $db->error . "</p>";
            exit();
        } 
        $db->close();
    }

    // Obtener carreras
    public function obtenerCarreras(){
        $transaccion = new mysqli($this->servername,$this->user,$this->password, $this->db);
        $query = $transaccion->prepare("SELECT nombreCarr FROM carrera");
        $query->execute();
        $resultado = $query->get_result();

        $nombres = array();
        if ($resultado->fetch_assoc() != NULL) {
            $resultado->data_seek(0); 
            while($row = $resultado->fetch_assoc()) {
                $nombre = $row['nombreCarr'];
                array_push($nombres, $nombre);
                echo "<button type='submit' name='$nombre'>" . strtoupper($row["nombreCarr"]) . "</button>";
            }
        }
        $query->close();
        $transaccion->close();
        return $nombres;
    }

    // Obtener carreras
    public function obtenerAsignaturas($carrera){
        $transaccion = new mysqli($this->servername,$this->user,$this->password, $this->db);
        $query = $transaccion->prepare("SELECT nombreAsig, nombreCoor, apellidoCoor FROM asignatura a, carrera c, coordinador co WHERE a.idCarr = c.idCarr AND c.nombreCarr = ? AND co.dniCoor = a.dniCoor;");
        $query->bind_param('s', $carrera);
        $query->execute();
        $resultado = $query->get_result();
        if ($resultado->fetch_assoc() != NULL) {
            $resultado->data_seek(0); 
            while($row = $resultado->fetch_assoc()) {
                echo "<p>-- " . $row["nombreAsig"] . " - Coordinador: " . $row["nombreCoor"] . " " . $row["apellidoCoor"] . "</p>";
            }
        }
        $query->close();
        $transaccion->close();
    }

    // Obtener informe profesor
    public function informeProfesor(){
        $transaccion = new mysqli($this->servername,$this->user,$this->password, $this->db);
        $dni = $_POST["dni"];
        $query = $transaccion->prepare("SELECT nombreProf, nombreAsig FROM profesor p, asignatura a, imparte i WHERE a.idAsig = i.idAsig AND i.dniProf = p.dniProf and p.dniProf = ?");
        $query->bind_param('i', $dni);
        $query->execute();
        $resultado = $query->get_result();
        if ($resultado->fetch_assoc() != NULL) {
            $resultado->data_seek(0); 
            $cont = 0;
            while($row = $resultado->fetch_assoc()) {
                if($cont == 0){
                    echo "<h2>Bienvenido/a, " . $row["nombreProf"] . "</h2>";
                    echo "<h3>Asignaturas que imparte</h3>";
                }
                echo "<p>-- " . $row["nombreAsig"] . "</p>";
                $cont = $cont + 1;
            }
        }
        $query->close();
        $query_2 = $transaccion->prepare("SELECT DISTINCT al.dniAlum, al.nombreAlum, al.apellidoAlum, al.domicilioAlum, a.nombreAsig from alumno al, cursa c, asignatura a, imparte i, 
            profesor p where al.dniAlum = c.dniAlum AND c.idAsig = a.idAsig AND a.idAsig = i.idAsig AND i.dniProf = ?");
        $query_2->bind_param('i', $dni);
        $query_2->execute();
        $resultado_2 = $query_2->get_result();
        if ($resultado_2->fetch_assoc() != NULL) {
            $resultado_2->data_seek(0); 
            $cont_2 = 0;
            while($row_2 = $resultado_2->fetch_assoc()) {
                if($cont_2 == 0){
                    echo "<h3>Alumnos matriculados en dichas asignaturas</h3>";
                }
                echo "<p>-- " . $row_2["dniAlum"] . " " . $row_2["nombreAlum"] . " " .  $row_2["apellidoAlum"] . " " .  " con matrícula en: " . " " .  $row_2["nombreAsig"] . "</p>";
                $cont_2 = $cont_2 + 1;
            }
        }
        $query_2->close();
        $transaccion->close();
    }

    // Obtener asignaturas matriculadas
    public function asignaturasMatriculadas(){
        $transaccion = new mysqli($this->servername,$this->user,$this->password, $this->db);
        $dni = $_POST["dni"];
        $query = $transaccion->prepare("SELECT a.nombreAsig, al.nombreAlum, a.creditos FROM asignatura a, alumno al, cursa c WHERE a.idAsig = c.idAsig AND c.dniAlum = al.dniAlum AND al.dniAlum = ?");
        $query->bind_param('i', $dni);
        $query->execute();
        $resultado = $query->get_result();
        if ($resultado->fetch_assoc() != NULL) {
            $resultado->data_seek(0); 
            $cont = 0;
            while($row = $resultado->fetch_assoc()) {
                if($cont == 0){
                    echo "<h2>Bienvenido/a, " . $row["nombreAlum"] . "</h2>";
                    echo "<h3>Asignaturas matriculadas</h3>";
                }
                echo "<p>-- " . $row["nombreAsig"] . ". Número de créditos: " . $row["creditos"] . "</p>";
                $cont++;
            }
        }
        $query->close();
        $transaccion->close();
    }
}