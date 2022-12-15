<?php
    session_start();
?>
<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name = "author" content = "Miriam González Alonso"/>
    <meta name = "description" content = "Página web de una calculadora RPN"/>
    <meta name ="viewport" content ="width=device-width, initial scale=1.0" />
    <title>Calculadora RPN</title>
    <link rel="stylesheet" type="text/css" href="CalculadoraRPN.css" />
</head>

<body>
    <h1>Calculadora RPN</h1>
    <?php
        class CalculadoraRPN{
            public $pila;
            public $pantalla;
            public $puntoPulsado;
            public $pantallaVisual;

            public function __construct(){
                $this->pila = array();
                $this->pantalla = "";
                $this->puntoPulsado = false;
                $this->pantallaVisual = "";
            }

            public function digitos($num){
                $this->pantalla .= $num;
                $this->puntoPulsado = false;
            }

            public function getPantallaVisual(){
                return $this->pantallaVisual;
            }

            public function setPantallaVisual($contenido){
                $this->pantallaVisual = $contenido;
            }

            public function punto(){
                if(!$this->puntoPulsado){
                    $this->pantalla .= ".";
                    $this->puntoPulsado = true;
                }
            }

            public function suma(){
                if(count($this->pila) >= 2){
                    array_push($this->pila, (array_pop($this->pila) + array_pop($this->pila)));
                }
                $this->puntoPulsado = false;
                $this->setPantallaVisual($this->mostrar());
            }

            public function resta(){
                if(count($this->pila) >= 2){
                    $operando2 = array_pop($this->pila);
                    $operando1 = array_pop($this->pila);
                    array_push($this->pila, ($operando1 - $operando2));
                }
                $this->puntoPulsado = false;
                $this->setPantallaVisual($this->mostrar());
            }

            public function multiplicacion(){
                if(count($this->pila) >= 2){
                    array_push($this->pila, array_pop($this->pila) * array_pop($this->pila));
                }
                $this->puntoPulsado = false;
                $this->setPantallaVisual($this->mostrar());
            }

            public function division(){
                if(count($this->pila) >= 2){
                    $divisor = array_pop($this->pila);
                    $dividendo = array_pop($this->pila);
                    array_push($this->pila, ($dividendo / $divisor));
                }
                $this->puntoPulsado = false;
                $this->setPantallaVisual($this->mostrar());
            }

            public function sin(){
                if(count($this->pila) >= 1){
                    array_push($this->pila, number_format(sin(array_pop($this->pila)), 5));
                }
                $this->puntoPulsado = false;
                $this->setPantallaVisual($this->mostrar());
            }

            public function cos(){
                if(count($this->pila) >= 1){
                    array_push($this->pila, number_format(cos(array_pop($this->pila)),5));
                }
                $this->puntoPulsado = false;
                $this->setPantallaVisual($this->mostrar());
            }

            public function tan(){
                if(count($this->pila) >= 1){
                    array_push($this->pila, number_format(tan(array_pop($this->pila)),5));
                }
                $this->puntoPulsado = false;
                $this->setPantallaVisual($this->mostrar());
            }

            public function asin(){
                if(count($this->pila) >= 1){
                    array_push($this->pila, number_format(asin(array_pop($this->pila)),5));
                }
                $this->puntoPulsado = false;
                $this->setPantallaVisual($this->mostrar());
            }

            public function acos(){
                if(count($this->pila) >= 1){
                    array_push($this->pila, number_format(acos(array_pop($this->pila)),5));
                }
                $this->puntoPulsado = false;
                $this->setPantallaVisual($this->mostrar());
            }

            public function atan(){
                if(count($this->pila) >= 1){
                    array_push($this->pila, number_format(atan(array_pop($this->pila)),5));
                }
                $this->puntoPulsado = false;
                $this->setPantallaVisual($this->mostrar());
            }

            public function borrar(){   
                for($i = 0; $i <= count($this->pila); $i++){
                    array_pop($this->pila);
                }
                $this->pantalla = "";
                $this->setPantallaVisual("");
            }

            public function enter(){
                $numero = $this->pantalla;
                if($numero != ""){
                    array_push($this->pila, $numero);
                }
                $this->pantalla = "";
                $this->setPantallaVisual($this->mostrar());
            }

            public function mostrar(){
                $mostrar = "";
                $size = count($this->pila);
                for($i = $size-1; $i >= 0; $i--){
                    $mostrar .= $i . ":\t\t" . $this->pila[$i] ."\n";
                }
                return $mostrar;
            }
        }

        if (!isset($_SESSION['calculadora'])){
            $_SESSION['calculadora'] = new CalculadoraRPN();
			$calculadora = $_SESSION['calculadora'];
        } else{
            $calculadora = $_SESSION['calculadora'];
        }

        if (count($_POST)>0)  { 
            if (isset($_POST['sin']))
                $calculadora->sin(); 
            elseif (isset($_POST['cos']))
                $calculadora->cos(); 
            elseif (isset($_POST['tan']))
                $calculadora->tan();
            elseif (isset($_POST['C']))
                $calculadora->borrar();
            elseif (isset($_POST['asin']))
                $calculadora->asin();
            elseif (isset($_POST['acos']))
                $calculadora->acos();
            elseif (isset($_POST['atan']))
                $calculadora->atan();
            elseif (isset($_POST['multiplicacion']))
                $calculadora->multiplicacion();
            elseif (isset($_POST['7']))
                $calculadora->digitos("7");
            elseif (isset($_POST['8']))
                $calculadora->digitos("8");
            elseif (isset($_POST['9']))
                $calculadora->digitos("9");
            elseif (isset($_POST['division']))
                $calculadora->division();
            elseif (isset($_POST['4']))
                $calculadora->digitos("4");
            elseif (isset($_POST['5']))
                $calculadora->digitos(5);
            elseif (isset($_POST['6']))
                $calculadora->digitos(6);
            elseif(isset($_POST['1']))
                $calculadora->digitos("1"); 
            elseif (isset($_POST['2']))
                $calculadora->digitos("2"); 
            elseif (isset($_POST['3']))
                $calculadora->digitos("3");
            elseif (isset($_POST['suma']))
                $calculadora->suma();
            elseif (isset($_POST['punto']))
                $calculadora->punto();				
            elseif(isset($_POST['0']))
                $calculadora->digitos("0"); 
            elseif (isset($_POST['Enter']))
                $calculadora->enter();
        };
    
     
    ?>
    <form action='CalculadoraRPN.php' method='post' name='Calculadora'>
        <label for='texto'>Calculadora RPN</label>
        <textarea id='texto' name='pantalla' readonly><?php print_r($calculadora->getPantallaVisual());?></textarea>
        <button type='submit' name='sin'>sin</button>
        <button type='submit' name='cos'>cos</button>
        <button type='submit' name='tan'>tan</button></button>
        <button type='submit' name='C'>C</button>

        <button type='submit' name='asin'>asin</button>
        <button type='submit' name='acos'>acos</button>
        <button type='submit' name='atan'>atan</button>
        <button type='submit' name='multiplicacion'>*</button>

        <button type='submit' name='7'>7</button>
        <button type='submit' name='8'>8</button>
        <button type='submit' name='9'>9</button>
        <button type='submit' name='division'>/</button>

        <button type='submit' name='4'>4</button>
        <button type='submit' name='5'>5</button>
        <button type='submit' name='6'>6</button>
        <button type='submit' name='resta'>-</button>

        <button type='submit' name='1'>1</button>
        <button type='submit' name='2'>2</button>
        <button type='submit' name='3'>3</button>
        <button type='submit' name='suma'>+</button>

        <button type='submit' name='punto'>.</button>
        <button type='submit' name='0'>0</button>
        <button type='submit' name='Enter'>Enter</button>
        
    </form>
</body>
</html>