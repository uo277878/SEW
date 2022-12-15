<?php
    session_start();
?>
<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name = "author" content = "Miriam González Alonso"/>
    <meta name = "description" content = "Página web de una calculadora Milán"/>
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <title>Calculadora Milán</title>
    <link rel="stylesheet" type="text/css" href="CalculadoraMilan.css" />

</head>

<body>
    <h1>Calculadora Milán</h1>
    <?php
        class CalculadoraMilan{
            public $pantalla;
            public $mem;
            public $sqr;
            public $equal;
            public $raizValor;
            public $porc;
            public $porcValor;
            public $on;
            public $operadorPulsado;
            public $numOperandos;
            public $pantallaVisual;
            
            public function __construct(){
                $this->pantalla = "";
                $this->mem = "0";
                $this->sqr = false;
                $this->equal = false;
                $this->raizValor = "";
                $this->porc = false;
                $this->porcValor = "";
                $this->on = true;
                $this->operadorPulsado = false;
                $this->numOperandos = 1;
                $this->pantallaVisual = "0";
            }

            public function digitos($num){
                $this->equal = false;
                if($this->on){
                    $this->setPantallaVisual("");
                    $this->on = false;
                }
                if($this->sqr){
                    if($this->operadorPulsado){
                        $this->setPantallaVisual($num);
                    } else{
                        $this->setPantallaVisual($this->getPantallaVisual() . $num);
                    }
                    $this->pantalla .= "*";
                    $this->pantalla .= ($num);
                    $this->sqr = false;
                    $this->operadorPulsado = false;
                } else{
                    if($this->operadorPulsado){
                        $this->setPantallaVisual($num);
                    } else{
                        $this->setPantallaVisual($this->getPantallaVisual() . $num);
                    }
                    $this->pantalla .= ($num);
                    $this->operadorPulsado = false;
                }
            }

            public function getPantallaVisual(){
                return $this->pantallaVisual;
            }

            public function setPantallaVisual($contenido){
                $this->pantallaVisual = $contenido;
            }
        
        
            public function punto(){
                $this->sqr = false;
                $valorVisual = ($this->getPantallaVisual() . ".");
                $this->setPantallaVisual($valorVisual);
                $this->pantalla .= ".";
            }
        
            public function suma(){
                $this->sqr = false;
                if(!$this->operadorPulsado){
                    $this->equal = false;
                    $this->operadorPulsado = true;
                    $this->numOperandos += 1;
                    $this->calcularOperacion();
                }
                $this->pantalla .= "+";
            }
        
            public function resta(){
                $this->sqr = false;
                if(!$this->operadorPulsado){
                    $this->equal = false;
                    $this->operadorPulsado = true;
                    $this->numOperandos += 1;
                    $this->calcularOperacion();
                }
                $this->pantalla .= "-";
            }
        
            public function multiplicacion(){
                $this->sqr = false;
                if(!$this->operadorPulsado){
                    $this->equal = false;
                    $this->operadorPulsado = true;
                    $this->numOperandos += 1;
                    $this->calcularOperacion();
                }
                $this->pantalla .= "*";
            }
        
            public function division(){
                $this->sqr = false;
                if(!$this->operadorPulsado){
                    $this->equal = false;
                    $this->operadorPulsado = true;
                    $this->numOperandos += 1;
                    $this->calcularOperacion();
                }
                $this->pantalla .= "/";
            }
        
            public function calcularOperacion(){
                if($this->numOperandos > 2){
                    $this->pantalla = eval("return $this->pantalla;");
                    $this->numOperandos = 1;
                }
            }
        
            public function mrc(){
                $this->setPantallaVisual($this->mem);
                $this->pantalla = $this->mem;
            }
        
            public function mMenos(){
                $this->pantalla = $this->mem . "-" . $this->getPantallaVisual();
                $this->mem = eval("return $this->pantalla;");
            }
        
            public function mMas(){
                $this->pantalla = $this->mem . "+" . $this->getPantallaVisual();
                $this->mem = eval("return $this->pantalla;");
            }
        
            public function borrar(){
                $this->pantalla = substr($this->pantalla, 0,-1);
                $this->setPantallaVisual(substr($this->getPantallaVisual(), 0,-1));
                if($this->getPantallaVisual() == ""){
                    $this->setPantallaVisual("0");
                    $this->on = true;
                    $this->pantalla = "";
                    $this->sqr = false;
                    $this->numOperandos = 1;
                }
            }
        
            public function borrarTodo(){
                $this->setPantallaVisual("0");
                $this->on = true;
                $this->pantalla = "";
                $this->sqr = false;
                $this->numOperandos = 1;
            }
        
            public function porcentaje(){
                $this->porc = true;
                if(str_contains($this->pantalla, "/")){
                    $result = explode('/', $this->pantalla);
                    $operando = $result[count($result)-1];
                    $pantalla = $this->pantalla.substr(0, strlen($this->pantalla)-(strlen($operando)+1));
                    $previo = substr($pantalla, 0, -(strlen($operando)+1));
                    $signo = substr($pantalla, -(strlen($operando)+1), -(strlen($operando)));
                    $pc = eval("return $operando/100;");
                    $resultado = $previo . $signo . $pc;
                    $this->setPantallaVisual(eval("return $resultado;"));
                }
                else if(str_contains($this->pantalla, "+") || str_contains($this->pantalla, "-")){
                    $result = preg_split("/[+-]/", $this->pantalla);
                    $operando = $result[count($result)-1];
                    $pantalla = $this->pantalla.substr(0, strlen($this->pantalla)-(strlen($operando)+1));
                    $signo = substr($pantalla, -(strlen($operando)+1), -(strlen($operando)));
                    $previo = substr($pantalla, 0, -(strlen($operando)+1));
                    $pc = eval("return $previo*$operando/100;");
                    $resultado = $previo . $signo . $pc;
                    $this->setPantallaVisual(eval("return $resultado;"));
                } else{
                    $this->setPantallaVisual(eval("return $this->pantalla / 100;"));
                }
                $this->pantalla = $this->getPantallaVisual();
            }
        
            public function raiz(){
                $this->sqr = true;
                $this->operadorPulsado = true;
                $pantalla = eval("return $this->pantalla;");
                $this->raizValor = sqrt($pantalla);
                $this->pantalla = $this->raizValor;
                $this->setPantallaVisual($this->raizValor);
            }
        
            public function cambiarSigno(){
                $visual = $this->getPantallaVisual();
                $resultado = $visual*(-1);
                $this->setPantallaVisual($resultado);
                $this->pantalla = substr($this->pantalla, 0, -strlen($visual));
                $this->pantalla .= $this->getPantallaVisual();
                if(str_contains($this->pantalla,"--")){
                    $this->pantalla = str_replace("--", "+", $this->pantalla);
                }
            }
        
            public function igual(){
                try{
                    if(str_contains($this->pantalla, "+") && $this->equal){
                        $result = explode("+", $this->pantalla);
                        $result[0] = eval("return $this->pantallaVisual;");
                        $this->pantalla = $result[0] . "+" . $result[1];
                        $this->setPantallaVisual(eval("return $this->pantalla;"));
                    } else if(str_contains($this->pantalla, "-") && $this->equal){
                        $result = explode("-", $this->pantalla);
                        $result[0] = eval("return $this->pantallaVisual;");
                        $this->pantalla = $result[0] . "-" . $result[1];
                        $this->setPantallaVisual(eval("return $this->pantalla;"));
        
                    } else if(str_contains($this->pantalla, "*") && substr($this->pantalla,-1) == "*"){
                        $result = explode("*", $this->pantalla);
                        $this->pantalla .= $result[0];
                        $this->setPantallaVisual(eval("return $this->pantalla;"));
                        
                    } else if(str_contains($this->pantalla, "*") && $this->equal){
                        $result = explode("*", $this->pantalla);
                        $result[0] = eval("return $this->pantalla;");
                        $this->pantalla = $result[0] . "*" . $result[1];
                        $this->setPantallaVisual(eval("return $this->pantalla;"));
        
                    } else if(str_contains($this->pantalla, "/") && substr($this->pantalla,-1) == "/"){
                        $result = explode("/", $this->pantalla);
                        $this->pantalla = "1/" . $result[0];
                        $this->setPantallaVisual(eval("return $this->pantalla;"));
                    } else if(str_contains($this->pantalla, "/") && $this->equal){
                        $result = explode("/", $this->pantalla);
                        $result[0] = eval("return $this->pantalla;");
                        $this->pantalla = $result[0] . "/" . $result[1];
                        $this->setPantallaVisual(eval("return $this->pantalla;"));
                    } else {
                        $this->setPantallaVisual(eval("return $this->pantalla;"));
                    }
                    $this->equal = true;
                } catch(error){
                    $this->setPantallaVisual("Error");
                }
            }
        }

        if (!isset($_SESSION['calculadora'])){
            $_SESSION['calculadora'] = new CalculadoraMilan();
			$calculadora = $_SESSION['calculadora'];
        } else{
            $calculadora = $_SESSION['calculadora'];
        }

        if (count($_POST)>0)  { 
            if (isset($_POST['borrarTodo']))
                $calculadora->borrarTodo(); 
            elseif (isset($_POST['borrar']))
                $calculadora->borrar(); 
            elseif (isset($_POST['cambiarSigno']))
                $calculadora->cambiarSigno();
            elseif (isset($_POST['raiz']))
                $calculadora->raiz();
            elseif (isset($_POST['porcentaje']))
                $calculadora->porcentaje();
            elseif (isset($_POST['7']))
                $calculadora->digitos("7");
            elseif (isset($_POST['8']))
                $calculadora->digitos("8");
            elseif (isset($_POST['9']))
                $calculadora->digitos("9");
            elseif (isset($_POST['multiplicacion']))
                $calculadora->multiplicacion();
            elseif (isset($_POST['division']))
                $calculadora->division();
            elseif (isset($_POST['4']))
                $calculadora->digitos("4");
            elseif (isset($_POST['5']))
                $calculadora->digitos("5");
            elseif (isset($_POST['6']))
                $calculadora->digitos("6");
            elseif (isset($_POST['resta']))
                $calculadora->resta();
            elseif (isset($_POST['mrc']))
                $calculadora->mrc();
            elseif(isset($_POST['1']))
                $calculadora->digitos("1"); 
            elseif (isset($_POST['2']))
                $calculadora->digitos("2"); 
            elseif (isset($_POST['3']))
                $calculadora->digitos("3");
            elseif (isset($_POST['suma']))
                $calculadora->suma();
            elseif (isset($_POST['mMenos']))
                $calculadora->mMenos();				
            elseif(isset($_POST['0']))
                $calculadora->digitos("0"); 
            elseif (isset($_POST['punto']))
                $calculadora->punto();
            elseif (isset($_POST['igual']))
                $calculadora->igual();
            elseif (isset($_POST['mMas']))
                $calculadora->mMas();
        };
    ?>
    <form action='CalculadoraMilan.php' method="post" name='Calculadora'>
        <label for="texto">nata by MILAN</label>
        <input id="texto" type="text" value = "<?php print_r($calculadora->getPantallaVisual());?>" name="pantalla" readonly />
        <button type="submit" name="borrarTodo">ON/C</button>
        <button type="submit" name="borrar">CE</button>
        <button type="submit" name="cambiarSigno">+/-</button>
        <button type="submit" name="raiz">√</button>
        <button type="submit" name="porcentaje">%</button>
        <button type="submit" name="7">7</button>
        <button type="submit" name="8">8</button>
        <button type="submit" name="9">9</button>
        <button type="submit" name="multiplicacion">*</button>
        <button type="submit" name="division">/</button>
        <button type="submit" name="4">4</button>
        <button type="submit" name="5">5</button>
        <button type="submit" name="6">6</button>
        <button type="submit" name="resta">-</button>
        <button type="submit" name="mrc">Mrc</button>
        <button type="submit" name="1">1</button>
        <button type="submit" name="2">2</button>
        <button type="submit" name="3">3</button>
        <button type="submit" name="suma">+</button>
        <button type="submit" name="mMenos">M-</button>
        <button type="submit" name="0">0</button>
        <button type="submit" name="punto">.</button>
        <button type="submit" name="igual">=</button>
        <button type="submit" name="mMas">M+</button>
    </form>
</body>
</html>