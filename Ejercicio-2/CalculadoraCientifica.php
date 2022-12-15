<?php
    session_start();
?>
<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name = "author" content = "Miriam González Alonso"/>
    <meta name = "description" content = "Página web de una calculadora científica"/>
    <meta name ="viewport" content ="width=device-width, initial scale=1.0" />
    <title>Calculadora Científica</title>
    <link rel="stylesheet" type="text/css" href="CalculadoraCientifica.css" />

</head>

<body>
    <h1>Calculadora Científica</h1>
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
                    $this->numOperandos .= 1;
                    $this->calcularOperacion();
                }
                $this->pantalla .= "+";
            }
        
            public function resta(){
                $this->sqr = false;
                if(!$this->operadorPulsado){
                    $this->equal = false;
                    $this->operadorPulsado = true;
                    $this->numOperandos .= 1;
                    $this->calcularOperacion();
                }
                $this->pantalla .= "-";
            }
        
            public function multiplicacion(){
                $this->sqr = false;
                if(!$this->operadorPulsado){
                    $this->equal = false;
                    $this->operadorPulsado = true;
                    $this->numOperandos .= 1;
                    $this->calcularOperacion();
                }
                $this->pantalla .= "*";
            }
        
            public function division(){
                $this->sqr = false;
                if(!$this->operadorPulsado){
                    $this->equal = false;
                    $this->operadorPulsado = true;
                    $this->numOperandos .= 1;
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

        class CalculadoraCientifica extends CalculadoraMilan{
            public $expTecla;
            public $shiftPulsado;
            public $hypPulsado;
            public $fePulsado;
            public $containsExp;
            public $botonDeg;
            public $botonSin;
            public $botonCos;
            public $botonTan;

            public function __construct(){
                parent::__construct();
                $this->expTecla = false;
                $this->shiftPulsado = false;
                $this->hypPulsado = false;
                $this->fePulsado = false;
                $this->containsExp = false;
                $this->botonDeg = 'DEG';
                $this->botonSin = 'sin';
                $this->botonCos = 'cos';
                $this->botonTan = 'tan';
            }

            public function contieneOperadores(){
                return (str_contains($this->pantalla, "+") || str_contains($this->pantalla, "-") || str_contains($this->pantalla, "*") || str_contains($this->pantalla, "/"));
            }

            public function splitCadenaUltimo($cadena, $argumento){
                $result = preg_split($argumento, $cadena);
                $result = $result[count($result)-1];
                return $result;
            }

            public function digitos($num){
                $this->equal = false;
                if($this->on){
                    $this->setPantallaVisual("");
                    $this->on = false;
                }
                $ultimoNumero = substr($this->getPantallaVisual(), -1);
                $this->setPantallaVisual($this->getPantallaVisual() . $num);
                if($this->sqr){
                    $this->pantalla .= "*";
                    $this->pantalla = $num;
                    $this->setPantallaVisual($num);
                    $this->sqr = false;
                } else{
                    $this->pantalla .= $num;
                }
                if($this->expTecla){
                    if($ultimoNumero == 0){
                        $this->pantalla = substr($this->pantalla, 0,-2);
                        $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-2));
                    } else{
                        $this->pantalla = substr($this->pantalla, 0,-1);
                        $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-1));
                    }
                    
                    $this->pantalla .= $num;
                    $this->setPantallaVisual($this->getPantallaVisual() . $num);
                }
            }

            public function setBotonDeg($contenido){
                $this->botonDeg = $contenido;
            }

            public function getBotonDeg(){
                return $this->botonDeg;
            }

            public function deg(){
                if($this->getBotonDeg() == "DEG"){
                    $this->setBotonDeg("RAD");
                } else if($this->getBotonDeg() == "RAD"){
                    $this->setBotonDeg("GRAD");
                } else{
                    $this->setBotonDeg("DEG");
                }
            }

            public function setBotonSin($contenido){
                $this->botonSin = $contenido;
            }

            public function getBotonSin(){
                return $this->botonSin;
            }

            public function setBotonCos($contenido){
                $this->botonCos = $contenido;
            }

            public function getBotonCos(){
                return $this->botonCos;
            }

            public function setBotonTan($contenido){
                $this->botonTan = $contenido;
            }

            public function getBotonTan(){
                return $this->botonTan;
            }

            public function hyp(){
                if(!$this->hypPulsado){
                    $this->hypPulsado = true;
                } else{
                    $this->hypPulsado = false;
                }
                if($this->shiftPulsado && $this->hypPulsado){
                    $this->setbotonSin("asinh");
                    $this->setbotonCos("acosh");
                    $this->setbotonTan("atanh");
                } else if(!$this->hypPulsado && $this->shiftPulsado){
                    $this->setbotonSin("asin");
                    $this->setbotonCos("acos");
                    $this->setbotonTan("atan");
                } else if(!$this->hypPulsado && !$this->shiftPulsado){
                    $this->setbotonSin("sin");
                    $this->setbotonCos("cos");
                    $this->setbotonTan("tan");
                } else{
                    $this->setbotonSin("sinh");
                    $this->setbotonCos("cosh");
                    $this->setbotonTan("tanh");
                }
            }

            public function fe(){
                if(!$this->fePulsado){
                    $this->fePulsado = true;
                } else{
                    $this->fePulsado = false;
                }
                if($this->equal){
                    $this->setPantallaVisual($this->pantalla);
                }
            }

            public function mc(){
                $this->mem = 0;
            }

            public function ms(){
                if($this->contieneOperadores()){
                    $this->mem = $this->splitCadenaUltimo($this->pantalla, "/[\\/*+-]/");
                } else{
                    $this->mem = $this->pantalla;
                }
            }

            public function potencia2(){
                if($this->contieneOperadores()){
                    $pot = $this->splitCadenaUltimo($this->pantalla, "/[\\/*+-]/");
                    $this->pantalla = substr($this->pantalla, 0,-strlen($pot));
                    $this->pantalla .= "pow(" . $pot .",2)";
                } else{
                    $pot = $this->pantalla;
                    $this->pantalla = "pow(" . $pot .",2)";
                }
                $this->setPantallaVisual(substr($this->getPantallaVisual(), -strlen($pot)));
                $this->setPantallaVisual("sqr(" . $pot . ")");
            }

            public function potencia(){
                $this->setPantallaVisual($this->getPantallaVisual() . "^");
                $this->pantalla .= "**";
            }

            public function sin(){
                if($this->shiftPulsado && $this->hypPulsado){
                    $this->asinh();
                } else if($this->shiftPulsado){
                    $this->asin();
                } else if($this->hypPulsado){
                    $this->sinh();
                } else{
                    if($this->contieneOperadores()){
                        $seno = $this->splitCadenaUltimo($this->pantalla, "/[*\\/+-]/");
                    } else{
                        $seno = $this->pantalla;
                    }
                    $this->pantalla = substr($this->pantalla, 0,-strlen($seno));
                    if($this->getBotonDeg() == "RAD"){
                        $this->pantalla .= "sin(" . $seno .")";
                    } else if($this->getBotonDeg() == "DEG"){
                        $degrees = floatval($seno) * (pi() / 180);
                        $this->pantalla .= "sin(" . $degrees . ")";
                    } else{
                        $gradians = floatval($seno) * pi() / 200;
                        $this->pantalla .= "sin(" . $gradians . ")";
                    }
                    $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($seno)));
                    $this->setPantallaVisual($this->getPantallaVisual() . "sin(" . $seno . ")");
                }
            }

            public function cos(){
                if($this->shiftPulsado && $this->hypPulsado){
                    $this->acosh();
                } else if($this->shiftPulsado){
                    $this->acos();
                } else if($this->hypPulsado){
                    $this->cosh();
                }else{
                    if($this->contieneOperadores()){
                        $coseno = $this->splitCadenaUltimo($this->pantalla, "/[*\\/+-]/");
                    } else{
                        $coseno = $this->pantalla;
                    }
                    $this->pantalla = substr($this->pantalla, 0,-strlen($coseno));
                    if($this->getBotonDeg() == "RAD"){
                        $this->pantalla .= "cos(" . $coseno . ")";
                    } else if($this->getBotonDeg() == "DEG"){
                        $degrees = floatval($coseno) * (pi() / 180);
                        $this->pantalla .= "cos(" . $degrees . ")";
                    } else{
                        $gradians = floatval($coseno) * pi() / 200;
                        $this->pantalla .= "cos(" . $gradians . ")";
                    }
                    $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($coseno)));
                    $this->setPantallaVisual($this->getPantallaVisual() . "cos(" . $coseno . ")");
                }
            }

            public function tan(){
                if($this->shiftPulsado && $this->hypPulsado){
                    $this->atanh();
                } else if($this->shiftPulsado){
                    $this->atan();
                } else if($this->hypPulsado){
                    $this->tanh();
                }else{
                    if($this->contieneOperadores()){
                        $tangente = $this->splitCadenaUltimo($this->pantalla, "/[*\\/+-]/");
                    } else{
                        $tangente = $this->pantalla;
                    }
                    $this->pantalla = substr($this->pantalla, 0,-strlen($tangente));
                    if($this->getBotonDeg() == "RAD"){
                        $this->pantalla .= "tan(" . $tangente . ")";
                    } else if($this->getBotonDeg() == "DEG"){
                        $degrees = $tangente * (pi() / 180);
                        $this->pantalla .= "tan(" . $degrees .")";
                    } else{
                        $gradians = $tangente * pi() / 200;
                        $this->pantalla .= "tan(" . $gradians . ")";
                    }
                    $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($tangente)));
                    $this->setPantallaVisual($this->getPantallaVisual() . "tan(" . $tangente . ")");
                }
            }

            public function asin(){
                if($this->contieneOperadores()){
                    $arcoseno = $this->splitCadenaUltimo($this->pantalla, "/[*\\/+-]/");
                } else{
                    $arcoseno = $this->pantalla;
                }
                $this->pantalla = substr($this->pantalla, 0,-strlen($arcoseno));
                if($this->getBotonDeg() == "RAD"){
                    $this->pantalla .= "asin(" . $arcoseno . ")";
                } else if($this->getBotonDeg() == "DEG"){
                    $degrees = $arcoseno * (pi() / 180);
                    $this->pantalla .= "asin(" . $degrees . ")";
                } else{
                    $gradians = $arcoseno * pi() / 200;
                    $this->pantalla .= "asin(" . $gradians . ")";
                }
                $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($arcoseno)));
                $this->setPantallaVisual($this->getPantallaVisual() . "asin(" . $arcoseno . ")");
            }

            public function acos(){
                if($this->contieneOperadores()){
                    $arcocoseno = $this->splitCadenaUltimo($this->pantalla, "/[*\\/+-]/");
                } else{
                    $arcocoseno = $this->pantalla;
                }
                $this->pantalla = substr($this->pantalla, 0,-strlen($arcocoseno));
                if($this->getBotonDeg() == "RAD"){
                    $this->pantalla .= "acos(" . $arcocoseno .")";
                } else if($this->getBotonDeg() == "DEG"){
                    $degrees = $arcocoseno * (pi() / 180);
                    $this->pantalla .= "acos(" . $degrees . ")";
                } else{
                    $gradians = $arcocoseno * pi() / 200;
                    $this->pantalla .= "acos(" . $gradians . ")";
                }
                $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($arcocoseno)));
                $this->setPantallaVisual($this->getPantallaVisual() . "acos(" . $arcocoseno . ")");
            }

            public function atan(){
                if($this->contieneOperadores()){
                    $arcotangente = $this->splitCadenaUltimo($this->pantalla, "/[*\\/+-]/");
                } else{
                    $arcotangente = $this->pantalla;
                }
                $this->pantalla = substr($this->pantalla, 0,-strlen($arcotangente));
                if($this->getBotonDeg() == "RAD"){
                    $this->pantalla .= "atan(" . $arcotangente .")";
                } else if($this->getBotonDeg() == "DEG"){
                    $degrees = $arcotangente * (pi() / 180);
                    $this->pantalla .= "atan(" . $degrees .")";
                } else{
                    $gradians = $arcotangente * pi() / 200;
                    $this->pantalla .= "atan(" . $gradians . ")";
                }
                $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($arcotangente)));
                $this->setPantallaVisual($this->getPantallaVisual() . "atan(" . $arcotangente . ")");
            }

            public function sinh(){
                if($this->contieneOperadores()){
                    $hypsen = $this->splitCadenaUltimo($this->pantalla, "/[*\\/+-]/");
                } else{
                    $hypsen = $this->pantalla;
                }
                $this->pantalla = substr($this->pantalla, 0,-strlen($hypsen));
                $this->pantalla .= "sinh(" + $hypsen +")";
                $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($hypsen)));
                $this->setPantallaVisual($this->getPantallaVisual() . "sinh(" . $hypsen . ")");
            }

            public function cosh(){
                if($this->contieneOperadores()){
                    $hypcos = $this->splitCadenaUltimo($this->pantalla, "/[*\\/+-]/");
                } else{
                    $hypcos = $this->pantalla;
                }
                $this->pantalla = substr($this->pantalla, 0,-strlen($hypcos));
                $this->pantalla .= "cosh(" + $hypcos +")";
                $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($hypcos)));
                $this->setPantallaVisual($this->getPantallaVisual() . "cosh(" . $hypcos . ")");
            }

            public function tanh(){
                if($this->contieneOperadores()){
                    $hyptan = $this->splitCadenaUltimo($this->pantalla, "/[*\\/+-]/");
                } else{
                    $hyptan = $this->pantalla;
                }
                $this->pantalla = substr($this->pantalla, 0,-strlen($hypcos));
                $this->pantalla .= "tanh(" + $hyptan +")";
                $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($hyptan)));
                $this->setPantallaVisual($this->getPantallaVisual() . "tanh(" . $hyptan . ")");
            }

            public function asinh(){
                if($this->contieneOperadores()){
                    $ahypsen = $this->splitCadenaUltimo($this->pantalla, "/[*\\/+-]/");
                } else{
                    $ahypsen = $this->pantalla;
                }
                $this->pantalla = substr($this->pantalla, 0,-strlen($ahypsen));
                $this->pantalla .= "asinh(" + $ahypsen +")";
                $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($ahypsen)));
                $this->setPantallaVisual($this->getPantallaVisual() . "ainh(" . $ahypsen . ")");
            }

            public function acosh(){
                if($this->contieneOperadores()){
                    $ahypcos = $this->splitCadenaUltimo($this->pantalla, "/[*\\/+-]/");
                } else{
                    $ahypcos = $this->pantalla;
                }
                $this->pantalla = substr($this->pantalla, 0,-strlen($ahypcos));
                $this->pantalla .= "acosh(" + $ahypcos +")";
                $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($ahypcos)));
                $this->setPantallaVisual($this->getPantallaVisual() . "acosh(" . $ahypcos . ")");
            }

            public function atanh(){
                if($this->contieneOperadores()){
                    $ahyptan = $this->splitCadenaUltimo($this->pantalla, "/[*\\/+-]/");
                } else{
                    $ahyptan = $this->pantalla;
                }
                $this->pantalla = substr($this->pantalla, 0,-strlen($ahyptan));
                $this->pantalla .= "atanh(" + $ahyptan +")";
                $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($ahyptan)));
                $this->setPantallaVisual($this->getPantallaVisual() . "atanh(" . $ahyptan . ")");
            }

            public function raiz(){
                $this->sqr = true;
                if($this->contieneOperadores()){
                    $result = $this->splitCadenaUltimo($this->pantalla, "/[\\/*+-]/");
                    if(str_contains($result, "(")){
                        $result = substr($result, 1, strlen($result));
                    }
                    $signo = substr(substr($this->pantalla, -(strlen($result)+1)), 0,1);
                    $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($result)));
                    $this->setPantallaVisual($this->getPantallaVisual() . "√(" . $result . ")");
                    $this->pantalla = substr($this->pantalla, 0,-strlen($result)-1);
                    $this->pantalla .= ($signo . sqrt($result));
                } else{
                    $this->setPantallaVisual("");
                    $this->setPantallaVisual($this->getPantallaVisual() . "√(" . $this->pantalla . ")");
                    $numero = $this->pantalla;
                    $this->pantalla = substr($this->pantalla, 0,-strlen($this->pantalla)-1);
                    $this->pantalla .= sqrt($numero);
                }
            }

            public function potencia10(){
                if(strlen($this->pantalla) == 0){
                    $this->pantalla .= pow(10,0);
                } else{
                    if($this->contieneOperadores()){
                        $ultimo = $this->splitCadenaUltimo($this->pantalla, "/[\\/*+-]/");
                    } else{
                        $ultimo = $this->pantalla;
                    }
                }
                $this->pantalla = substr($this->pantalla, 0,-strlen($ultimo));
                $this->pantalla .= pow(10,$ultimo);
                $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($ultimo)));
                $this->setPantallaVisual($this->pantalla);
            }

            public function log(){
                if($this->contieneOperadores()){
                    $ultimo = $this->splitCadenaUltimo($this->pantalla, "/[\\/*+-]/");
                } else{
                    $ultimo = $this->pantalla;
                }
                $this->pantalla = substr($this->pantalla, 0,-strlen($ultimo));
                $this->pantalla .= log10($ultimo);
                $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($ultimo)));
                $this->setPantallaVisual($this->pantalla);
            }

            public function exp(){
                $this->expTecla = true;
                $this->containsExp = true;
                $this->pantalla .= ",e+0";
                $this->setPantallaVisual($this->getPantallaVisual() . ",e+0");
            }

            public function porcentaje(){
                $this->pantalla .= "%";
                $this->setPantallaVisual($this->getPantallaVisual() . " Mod ");
            }

            public function flecha(){
                if(!$this->shiftPulsado){
                    $this->shiftPulsado = true;
                } else{
                    $this->shiftPulsado = false;
                }
                if($this->shiftPulsado && $this->hypPulsado){
                    $this->setbotonSin("asinh");
                    $this->setbotonCos("acosh");
                    $this->setbotonTan("atanh");
                } else if(!$this->hypPulsado && $this->shiftPulsado){
                    $this->setbotonSin("asin");
                    $this->setbotonCos("acos");
                    $this->setbotonTan("atan");
                } else if($this->hypPulsado && !$this->shiftPulsado){
                    $this->setbotonSin("sin");
                    $this->setbotonCos("cos");
                    $this->setbotonTan("tan");
                } else{
                    $this->setbotonSin("sin");
                    $this->setbotonCos("cos");
                    $this->setbotonTan("tan");
                }
            }

            public function ce(){
                if(str_contains("%", $this->pantalla)){
                    $ultimo = $this->splitCadenaUltimo($this->pantalla, "%");
                    $ultimoVisual = $this->splitCadenaUltimo($this->getPantallaVisual(), " Mod ");
                    $this->pantalla = substr($this->pantalla, 0,-strlen($ultimo));
                    $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($ultimoVisual)));
                } else if($this->contieneOperadores()){
                    $ultimo = $this->splitCadenaUltimo($this->pantalla, "/[\\/*+-]/");
                    $ultimoVisual = $this->splitCadenaUltimo($this->getPantallaVisual(), "/[\\/*+-]/");
                    $this->pantalla = substr($this->pantalla, 0,-strlen($ultimo));
                    $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($ultimoVisual)));
                } else{
                    $this->pantalla = "";
                    $this->setPantallaVisual("0");
                    $this->on = true;
                }
                if($this->sqr){
                    $this->sqr = false;
                }
            }

            public function borrar(){
                if($this->contieneDiferenteVisualmente()){
                    $this->ce();
                } else if(str_contains("%", $this->pantalla)){
                    if(substr($this->pantalla, -1) == "%"){
                        $this->pantalla = substr($this->pantalla, 0,-1);
                        $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-5));
                    } else{
                        $ultimo = $this->splitCadenaUltimo($this->pantalla, "%");
                        $ultimoVisual = $this->splitCadenaUltimo($this->getPantallaVisual(), " Mod ");
                        $this->pantalla = substr($this->pantalla, 0,-strlen($ultimo));
                        $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($ultimoVisual)));
                    }
                } else if(str_contains("**", $this->pantalla)){
                    if(substr($this->pantalla, 0, strlen($this->pantalla)-2) == "**"){
                        $this->pantalla = substr($this->pantalla, 0, strlen($this->pantalla)-2);
                        $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-1));
                    } else{
                        $ultimo = $this->splitCadenaUltimo($this->pantalla, "**");
                        $ultimoVisual = $this->splitCadenaUltimo($this->getPantallaVisual(), "^");
            
                        $this->pantalla = substr($this->pantalla, 0,-strlen($ultimo));
                        $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($ultimoVisual)));
                    }
                } else{
                    parent::borrar();
                }
                if($this->sqr){
                    $this->sqr = false;
                }
                if($this->getPantallaVisual() == ""){
                    $this->setPantallaVisual("0");
                    $this->on = true;
                    $this->pantalla = "";
                }
            }

            public function contieneDiferenteVisualmente(){
                if(!is_int($this->getPantallaVisual())){
                    $visual = $this->getPantallaVisual();
                    return str_contains("sqr", $visual) || str_contains("fact", $visual) || str_contains("sin", $visual) || str_contains("cos", $visual)
                        || str_contains("tan", $visual) || str_contains("sinh", $visual) || str_contains("cosh", $visual) || str_contains("tanh", $visual)
                        || str_contains("asin", $visual) || str_contains("acos", $visual) || str_contains("atan", $visual) || str_contains("asinh", $visual)
                        || str_contains("acosh", $visual) || str_contains("atanh", $visual) || str_contains("√", $visual);
                }
                
            }

            public function pi(){
                if($this->on){
                    $this->setPantallaVisual("");
                }
                $this->setPantallaVisual($this->getPantallaVisual() . pi());
                $this->pantalla .= pi();
            }

            public function multiplicacion(){
                $this->on = false;
                $this->sqr = false;
                if($this->fePulsado && !$this->equal && !$this->expTecla){
                    if($this->contieneOperadores()){
                        $result = $this->splitCadenaUltimo($this->pantalla, "/[\\/*+-]/");
                    } else{
                        $result = $this->getPantallaVisual();
                    }
                    $this->pantalla = substr($this->pantalla, 0,-strlen($result));
                    $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($result)));
                    $result = sprintf("%e", $result);
                    $this->pantalla .= $result;
                    $this->setPantallaVisual($this->getPantallaVisual() . $result);
                }
                $this->equal = false;
                $this->expTecla = false;
                $this->pantalla .= "*";
                $this->setPantallaVisual($this->getPantallaVisual() . "*");
                $this->cambiarExponente();
            }

            public function factorial(){
                if($this->contieneOperadores()){
                    $n = $this->splitCadenaUltimo($this->pantalla, "/[\\/*+-]/");
                } else{
                    $n = $this->getPantallaVisual();
                }
                if(str_contains("(", $n)){
                    $n = substr($n, 1,-strlen($n));
                }
                $total = 1;
                for ($i=1; $i<=floatval($n); $i++) {
                    $total = $total * $i; 
                }
                $this->pantalla = substr($this->pantalla, 0,-strlen($n));
                $this->pantalla .= $total;
                $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($n)));
                $this->setPantallaVisual($this->getPantallaVisual() . "fact(" . $n . ")");
                
            }

            public function resta(){
                $this->on = false;
                $this->sqr = false;
                if($this->fePulsado && !$this->equal && !$this->expTecla){
                    if($this->contieneOperadores()){
                        $result = $this->splitCadenaUltimo($this->pantalla,  "/[\\/*+-]/");
                    } else{
                        $result = $this->getPantallaVisual();
                    }
                    $this->pantalla = substr($this->pantalla, 0,-strlen($result));
                    $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($result)));
                    $result = sprintf("%e", $result);
                    $this->pantalla .= $result;
                    $this->setPantallaVisual($this->getPantallaVisual() . $result);
                }
                $this->equal = false;
                $this->expTecla = false;
                $this->pantalla .= "-";
                $this->setPantallaVisual($this->getPantallaVisual() . "-");
                $this->cambiarExponente();
            }

            public function cambiarSigno(){
                if($this->contieneOperadores()){
                    $result = preg_split("/[*\\/+-]/", $this->pantalla);
                    $ultimo = $result[count($result)-1];
                    $operador = substr($this->pantalla,-strlen($ultimo)-1,-strlen($ultimo));
                    if($operador == "+" || $operador == "-"){
                        $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($ultimo)-1));
                        $this->pantalla = substr($this->pantalla, 0,-strlen($ultimo)-1);
                        if($operador == "+"){
                            $ultimo = "-" . $ultimo;
                        } else if($operador == "-"){
                            $ultimo = "+" . $ultimo;
                        }
                        $this->setPantallaVisual($this->getPantallaVisual() . $ultimo);
                        $this->pantalla .= $ultimo;
                    } else{
                        $penultimo = $result[count($result)-2];
                        $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($penultimo)-1));
                        $this->setPantallaVisual($this->getPantallaVisual() . ($operador . floatval($ultimo) * (-1)));
                        $this->pantalla = substr($this->pantalla, 0,-strlen($penultimo)-1);
                        $this->pantalla .= ($operador . floatval($ultimo) * (-1));
                    }
                } else{
                    $this->setPantallaVisual(floatval($this->getPantallaVisual()) * (-1));
                    $this->pantalla = $this->getPantallaVisual();
                }
            }

            public function suma(){
                $this->on = false;
                $this->sqr = false;
                if($this->fePulsado && !$this->equal && !$this->expTecla){
                    if($this->contieneOperadores()){
                        $result = $this->splitCadenaUltimo($this->pantalla, "/[\\/*+-]/");
                    } else{
                        $result = $this->getPantallaVisual();
                    }
                    $this->pantalla = substr($this->pantalla, 0,-strlen($result));
                    $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($result)));
                    $result = sprintf("%e", $result);
                    $this->pantalla .= $result;
                    $this->setPantallaVisual($this->getPantallaVisual() . $result);
                }
                $this->equal = false;
                $this->expTecla = false;
                $this->pantalla .= "+";
                $this->setPantallaVisual($this->getPantallaVisual() . "+");
                $this->cambiarExponente();
            }

            public function cambiarExponente(){
                if(str_contains($this->pantalla, ",e+")){
                    $numAnterior = explode($this->pantalla, ",");
                    $numAnterior = $numAnterior[0];
                    if($this->contieneOperadores()){
                        $numAnterior = $this->splitCadenaUltimo($numAnterior, "/[\\/*+-]/");
                    } 
                    $numPosterior = explode($this->pantalla. ",e+");
                    $numPosterior = substr($numPosterior[1], 0, -1);
                    if($numPosterior == 0){
                        $this->pantalla = str_replace(",e+0","", $this->pantalla);
                    } else{
                        $multiplicar = 10**$numPosterior;
                        $this->pantalla = str_replace($numAnterior . ",e+" . $numPosterior,$numAnterior*$multiplicar, $this->pantalla);
                    }
                }
            }

            public function parentesisIzq(){
                if($this->on){
                    $this->setPantallaVisual("");
                    $this->on = false;
                }
                $this->setPantallaVisual($this->getPantallaVisual() . "(");
                $this->pantalla .= "(";
            }

            public function parentesisDcha(){
                if($this->on){
                    $this->setPantallaVisual("");
                    $this->on = false;
                }
                $this->setPantallaVisual($this->getPantallaVisual() . ")");
                $this->pantalla .= ")";
            }

            public function division(){
                $this->on = false;
                $this->sqr = false;
                if($this->fePulsado && !$this->equal && !$this->expTecla){
                    if($this->contieneOperadores()){
                        $result = $this->splitCadenaUltimo($this->pantalla,  "/[\\/*+-]/");
                    } else{
                        $result = $this->getPantallaVisual();
                    }
                    $this->pantalla = substr($this->pantalla, 0,-strlen($result));
                    $this->setPantallaVisual(substr($this->getPantallaVisual(),0,-strlen($result)));
                    $result = sprintf("%e", $result);
                    $this->pantalla .= $result;
                    $this->setPantallaVisual($this->getPantallaVisual() . $result);
                }
                $this->equal = false;
                $this->expTecla = false;
                $this->pantalla .= "/";
                $this->setPantallaVisual($this->getPantallaVisual() . "/");
                $this->cambiarExponente();
            }

            public function igual(){
                if(str_contains($this->pantalla, "--")){
                    $this->pantalla = str_replace("--", "+", $this->pantalla);
                } else if(str_contains($this->pantalla, "++")){
                    $this->pantalla = str_replace("++", "+", $this->pantalla);
                } else if(str_contains($this->pantalla, "+-")){
                    $this->pantalla = str_replace("+-", "-", $this->pantalla);
                } else if(str_contains($this->pantalla, "-+")){
                    $this->pantalla = str_replace("-+", "-", $this->pantalla);
                }
                if(str_contains($this->pantalla, ",e+")){
                    $numAnterior = explode(",", $this->pantalla);;
                    $numAnterior = $numAnterior[0];
                    if($this->contieneOperadores()){
                        $numAnterior = $this->splitCadenaUltimo($numAnterior,  "/[\\/*+-]/");
                    } 
                    $numPosterior = explode(",e+", $this->pantalla);
                    $numPosterior = $numPosterior[1];
                    if($numPosterior == 0){
                        $this->pantalla = str_replace(",e+0", "", $this->pantalla);
                    } else{
                        $multiplicar = 10**$numPosterior;
                        $this->pantalla = str_replace($numAnterior . ",e+" . $numPosterior, $numAnterior*$multiplicar, $this->pantalla);
                    }
                    $this->setPantallaVisual($this->pantalla);
                }
                parent::igual();
                if($this->fePulsado){
                    $valor = sprintf("%e", eval("return $this->pantalla;"));
                    $this->pantalla = $valor;
                    $this->setPantallaVisual($valor);
                }
                $this->equal = true;
            }
        }

        if (!isset($_SESSION['calculadora'])){
            $_SESSION['calculadora'] = new CalculadoraCientifica();
			$calculadora = $_SESSION['calculadora'];
        } else{
            $calculadora = $_SESSION['calculadora'];
        }

        if (count($_POST)>0)  { 
            if (isset($_POST['deg']))
                $calculadora->deg(); 
            elseif (isset($_POST['hyp']))
                $calculadora->hyp(); 
            elseif (isset($_POST['fe']))
                $calculadora->fe();
            elseif (isset($_POST['mc']))
                $calculadora->mc();
            elseif (isset($_POST['mr']))
                $calculadora->mrc();
            elseif (isset($_POST['mMas']))
                $calculadora->mMas();
            elseif (isset($_POST['mMenos']))
                $calculadora->mMenos();
            elseif (isset($_POST['ms']))
                $calculadora->ms();
            elseif (isset($_POST['potencia2']))
                $calculadora->potencia2();
            elseif (isset($_POST['potencia']))
                $calculadora->potencia();
            elseif (isset($_POST['sin']))
                $calculadora->sin();
            elseif (isset($_POST['cos']))
                $calculadora->cos();
            elseif (isset($_POST['tan']))
                $calculadora->tan();
            elseif (isset($_POST['raiz']))
                $calculadora->raiz();
            elseif (isset($_POST['potencia10']))
                $calculadora->potencia10();
            elseif(isset($_POST['logaritmo']))
                $calculadora->log(); 
            elseif(isset($_POST['exponente']))
                $calculadora->exp(); 
            elseif(isset($_POST['modulo']))
                $calculadora->porcentaje(); 
            elseif(isset($_POST['flecha']))
                $calculadora->flecha(); 
            elseif (isset($_POST['ce']))
                $calculadora->ce(); 
            elseif (isset($_POST['borrarTodo']))
                $calculadora->borrarTodo(); 
            elseif (isset($_POST['borrar']))
                $calculadora->borrar(); 
            elseif (isset($_POST['division']))
                $calculadora->division(); 
            elseif (isset($_POST['pi']))
                $calculadora->pi();
            elseif (isset($_POST['7']))
                $calculadora->digitos("7"); 
            elseif (isset($_POST['8']))
                $calculadora->digitos("8"); 
            elseif (isset($_POST['9']))
                $calculadora->digitos("9");
            elseif (isset($_POST['multiplicacion']))
                $calculadora->multiplicacion(); 
            elseif (isset($_POST['factorial']))
                $calculadora->factorial();
            elseif (isset($_POST['4']))
                $calculadora->digitos("4"); 
            elseif (isset($_POST['5']))
                $calculadora->digitos("5"); 
            elseif (isset($_POST['6']))
                $calculadora->digitos("6"); 
            elseif (isset($_POST['resta']))
                $calculadora->resta();
            elseif (isset($_POST['cambiarSigno']))
                $calculadora->cambiarSigno();
            elseif (isset($_POST['1']))
                $calculadora->digitos("1"); 
            elseif (isset($_POST['2']))
                $calculadora->digitos("2"); 
            elseif (isset($_POST['3']))
                $calculadora->digitos("3");
            elseif (isset($_POST['suma']))
                $calculadora->suma();
            elseif (isset($_POST['parentesisIzq']))
                $calculadora->parentesisIzq();	
            elseif (isset($_POST['parentesisDcha']))
                $calculadora->parentesisDcha();				
            elseif(isset($_POST['0']))
                $calculadora->digitos("0"); 
            elseif (isset($_POST['punto']))
                $calculadora->punto();
            elseif (isset($_POST['igual']))
                $calculadora->igual();
        };

    ?>
    <form action='CalculadoraCientifica.php' method="post" name='Calculadora'>
        <label for="texto">Windows</label>
        <input id="texto" type="text" value = "<?php print_r($calculadora->getPantallaVisual());?>" name="pantalla" readonly />
        <button type="submit" name="deg"><?php print_r($calculadora->getBotonDeg());?></button>
        <button type="submit" name="hyp">HYP</button>
        <button type="submit" name="fe">F-E</button>

        <button type="submit" name="mc">MC</button>
        <button type="submit" name="mr">MR</button>
        <button type="submit" name="mMas">M+</button>
        <button type="submit" name="mMenos">M-</button>
        <button type="submit" name="ms">MS</button>

        <button type="submit" name="potencia2">x^2</button>
        <button type="submit" name="potencia">x^y</button>
        <button type="submit" name="sin"><?php print_r($calculadora->getBotonSin());?></button>
        <button type="submit" name="cos"><?php print_r($calculadora->getBotonCos());?></button>
        <button type="submit" name="tan"><?php print_r($calculadora->getBotonTan());?></button>

        <button type="submit" name="raiz">√</button>
        <button type="submit" name="potencia10">10^x</button>
        <button type="submit" name="logaritmo">log</button>
        <button type="submit" name="exponente">Exp</button>
        <button type="submit" name="modulo">Mod</button>

        <button type="submit" name="flecha">↑</button>
        <button type="submit" name="ce">CE</button>
        <button type="submit" name="borrarTodo">C</button>
        <button type="submit" name="borrar">←</button>
        <button type="submit" name="division">/</button>

        <button type="submit" name="pi">π</button>
        <button type="submit" name="7">7</button>
        <button type="submit" name="8">8</button>
        <button type="submit" name="9">9</button>
        <button type="submit" name="multiplicacion">x</button>

        <button type="submit" name="factorial">n!</button>
        <button type="submit" name="4">4</button>
        <button type="submit" name="5">5</button>
        <button type="submit" name="6">6</button>
        <button type="submit" name="resta">-</button>

        <button type="submit" name="cambiarSigno">+/-</button>
        <button type="submit" name="1">1</button>
        <button type="submit" name="2">2</button>
        <button type="submit" name="3">3</button>
        <button type="submit" name="suma">+</button>

        <button type="submit" name="parentesisIzq" onclick="calculadora.parentesisIzq()">(</button>
        <button type="submit" name="parentesisDcha" onclick="calculadora.parentesisDcha()">)</button>
        <button type="submit" name="0" onclick="calculadora.digitos(0)">0</button>
        <button type="submit" name="punto" onclick="calculadora.punto()">,</button>
        <button type="submit" name="igual" onclick="calculadora.igual()">=</button>
        </form>
</body>
</html>