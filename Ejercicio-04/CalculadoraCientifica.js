class CalculadoraMilan{

    constructor(){
        this.pantalla = "";
        this.mem = 0;
        this.sqr = false;
        this.equal = false;
        this.raizValor = "";
        this.porc = false;
        this.porcValor = "";
        this.on = true;
        this.operadorPulsado = false;
        this.numOperandos = 1;
		document.querySelector('input[type=text]').value = "";
        document.addEventListener("keydown", (event) => {
            this.tecla(event.key, event);
        });
    }

    tecla(key, evento){
        if(key === 'c' || key === 'C'){
            this.borrarTodo();
        }
        if(key === "Backspace"){
            this.borrar();
        }
        if(key === 's' || key === 'S'){
            this.cambiarSigno();
        }
        if(key === 'r' || key === 'R'){
            this.raiz();
        }
        if(key === 'p' || key === 'P'){
            this.porcentaje();
        }
        if (key === 'x' || key === 'X') {
            this.multiplicacion();
        }
        if (key === 'v' || key === 'V') {
            this.division();
        }
        if (key === '-') {
            this.resta();
        }
        if(key === '+'){
            this.suma();
        }
        if (key === 'm' || key === 'M') {
            this.mrc();
        }
        if (key === 'n' || key === 'N') {
            this.mMenos();
        }
        if (key === 'a' || key === 'A') {
            this.mMas();
        }
        if(key >= '0' && key <= '9'){
            this.digitos(Number(key));
        }
        if (key === '.') {
            this.punto();
        }
        if (key === 'Enter') {
			evento.preventDefault();				
            this.igual();
        }
    }

    digitos(num){
        this.equal = false;
        if(this.on){
            document.querySelector('input[type=text]').value = "";
            this.on = false;
        }
        if(this.sqr){
            if(this.operadorPulsado){
                document.querySelector('input[type=text]').value = Number(num);
            } else{
                document.querySelector('input[type=text]').value += Number(num);
            }
            this.pantalla += "*";
            this.pantalla += Number(num);
            this.sqr = false;
            this.operadorPulsado = false;
        } else{
            if(this.operadorPulsado){
                document.querySelector('input[type=text]').value = Number(num);
            } else{
                document.querySelector('input[type=text]').value += Number(num);
            }
            this.pantalla += Number(num);
            this.operadorPulsado = false;
        }
    }

    punto(){
        this.sqr = false;
        document.querySelector('input[type=text]').value += ".";
        this.pantalla += ".";
    }

    suma(){
        this.sqr = false;
        if(!this.operadorPulsado){
            this.equal = false;
            this.operadorPulsado = true;
            this.numOperandos += 1;
            this.calcularOperacion();
        }
        this.pantalla += "+";
    }

    resta(){
        this.sqr = false;
        if(!this.operadorPulsado){
            this.equal = false;
            this.operadorPulsado = true;
            this.numOperandos += 1;
            this.calcularOperacion();
        }
        this.pantalla += "-";
    }

    multiplicacion(){
        this.sqr = false;
        if(!this.operadorPulsado){
            this.equal = false;
            this.operadorPulsado = true;
            this.numOperandos += 1;
            this.calcularOperacion();
        }
        this.pantalla += "*";
    }

    division(){
        this.sqr = false;
        if(!this.operadorPulsado){
            this.equal = false;
            this.operadorPulsado = true;
            this.numOperandos += 1;
            this.calcularOperacion();
        }
        this.pantalla += "/";
    }

    calcularOperacion(){
        if(this.numOperandos > 2){
            this.pantalla = Number(eval(this.pantalla));
            this.numOperandos = 1;
        }
    }

    mrc(){
        document.querySelector('input[type=text]').value = this.mem;
		this.pantalla = this.mem;
    }

    mMenos(){
        this.pantalla = this.mem + "-" + document.querySelector('input[type=text]').value;
        this.mem = Number(eval(this.pantalla));
    }

    mMas(){
        this.pantalla = this.mem + "+" + document.querySelector('input[type=text]').value;
        this.mem = Number(eval(this.pantalla));
    }

    borrar(){
        this.pantalla = this.pantalla.toString().slice(0,-1);
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-1);        
		if(document.querySelector('input[type=text]').value == ""){
            document.querySelector('input[type=text]').value = 0;
            this.on = true;
			this.pantalla = "";
        }
    }

    borrarTodo(){
        document.querySelector('input[type=text]').value = "0";
        this.on = true;
        this.pantalla = "";
        this.sqr = false;
        this.numOperandos = 1;
    }

    porcentaje(){
        this.porc = true;
        document.querySelector('input[type=text]').value += "%";
        if(this.pantalla.includes("*") || this.pantalla.includes("/")){
            var result = this.pantalla.split(/[*/+-]/);
            var operando = result[result.length-1];
            var pantalla = this.pantalla.substring(0, this.pantalla.length-(operando.length+1));
            var signo = this.pantalla.slice(-(operando.length+1)).substring(0,1);
            var pc = operando/100;
            document.querySelector('input[type=text]').value = Number(eval(pantalla + signo + pc));
        }
        else if(this.pantalla.includes("+") || this.pantalla.includes("-")){
            var result = this.pantalla.split(/[+-]/);
            var operando = result[result.length-1];
            var pantalla = this.pantalla.substring(0, this.pantalla.length-(operando.length+1));
            var signo = this.pantalla.slice(-(operando.length+1)).substring(0,1);
            var previo = Number(eval(pantalla));
            var pc = previo*operando/100;
            var resultado = previo + signo + pc;
            document.querySelector('input[type=text]').value = Number(eval(resultado));
        } else{
            document.querySelector('input[type=text]').value = (this.pantalla / 100);
        }
        this.pantalla = document.querySelector('input[type=text]').value;
    }

    raiz(){
        this.sqr = true;
        this.operadorPulsado = true;
        var pantalla = Number(eval(this.pantalla));
        this.raizValor = Number(pantalla**(1/2));
        this.pantalla = this.raizValor.toString();
    }

    cambiarSigno(){
        var valor = document.querySelector('input[type=text]').value;
        document.querySelector('input[type=text]').value *= (-1);
        if(this.pantalla.includes("-")){
            this.pantalla = this.pantalla.replace("-","+");
        } else if(this.pantalla.includes("+")){
            this.pantalla = this.pantalla.replace("+","-");
        } else{
            this.pantalla = this.pantalla.replace(valor, document.querySelector('input[type=text]').value);
        }
    }

    igual(){
        try{
            if(this.pantalla.includes("+") && this.equal){
                var result = this.pantalla.split("+");
                result[0] = Number(eval(document.querySelector('input[type=text]').value));
                this.pantalla = result[0] + "+" + result[1];
                document.querySelector('input[type=text]').value = Number(eval(this.pantalla));

            } else if(this.pantalla.includes("-") && this.equal){
                var result = this.pantalla.split("-");
                result[0] = Number(eval(document.querySelector('input[type=text]').value));
                this.pantalla = result[0] + "-" + result[1];
                document.querySelector('input[type=text]').value = Number(eval(this.pantalla));

            } else if(this.pantalla.includes("*") && this.pantalla.slice(-1) == "*"){
                var result = this.pantalla.split("*");
                this.pantalla += result[0];
                document.querySelector('input[type=text]').value = Number(eval(this.pantalla));
                
            } else if(this.pantalla.includes("*") && this.equal){
                result = this.pantalla.split("*");
                result[0] = Number(eval(this.pantalla));
                this.pantalla = result[0] + "*" + result[1];
                document.querySelector('input[type=text]').value = Number(eval(this.pantalla));

            } else if(this.pantalla.includes("/") && this.pantalla.slice(-1) == "/"){
                var result = this.pantalla.split("/");
                this.pantalla = "1/" + result[0];
                document.querySelector('input[type=text]').value = Number(eval(this.pantalla));
            } else if(this.pantalla.includes("/") && this.equal){
                result = this.pantalla.split("/");
                result[0] = Number(eval(this.pantalla));
                this.pantalla = result[0] + "/" + result[1];
                document.querySelector('input[type=text]').value = Number(eval(this.pantalla));
            } else {
                document.querySelector('input[type=text]').value = Number(eval(this.pantalla));
            }
            this.equal = true;
        } catch(error){
            document.querySelector('input[type=text]').value = "Error";
        }
    }
}

class CalculadoraCientifica extends CalculadoraMilan{
    constructor(){
        super();
        this.expTecla = false;
        this.shiftPulsado = false;
        this.hypPulsado = false;
        this.fePulsado = false;
        this.containsExp = false;
    }

    tecla(key, evento){
        super.tecla(key,evento);
        if(key === '('){
            this.parentesisIzq();
        }
        if(key === ')'){
            this.parentesisDcha();
        }
        if(key === 'd' || key === 'D'){
            this.deg()
        }
        if(key === 'h' || key === 'H'){
            this.hyp()
        }
        if(key === 'f' || key === 'F'){
            this.fe()
        }
        if(key === 'q' || key === 'Q'){
            this.mc()
        }
        if(key === 'g' || key === 'G'){
            this.ms()
        }
        if(key === 'w' || key === 'W'){
            this.potencia2()
        }
        if(key === 'y' || key === 'Y'){
            this.potencia()
        }
        if(key === 'i' || key === 'I'){
            this.sin()
        }
        if(key === 'o' || key === 'O'){
            this.cos()
        }
        if(key === 't' || key === 'T'){
            this.tan()
        }
        if(key === 'z' || key === 'Z'){
            this.potencia10()
        }
        if(key === 'l' || key === 'L'){
            this.log()
        }
        if(key === 'e' || key === 'E'){
            this.exp()
        }
        if(key === "Shift"){
            this.flecha()
        }
        if(key === "Delete"){
            this.ce()
        }
        if(key === 'u' || key === 'U'){
            this.pi()
        }
        if(key === "!"){
            this.factorial()
        }
    }

    contieneOperadores(){
        return (this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/"));
    }

    splitCadenaUltimo(cadena, argumento){
        var result = cadena.split(argumento);
        result = result[result.length-1];
        return result;
    }

    digitos(num){
        this.equal = false;
        if(this.on){
            document.querySelector('input[type=text]').value = "";
            this.on = false;
        }
        var ultimoNumero = document.querySelector('input[type=text]').value.slice(-1);
        document.querySelector('input[type=text]').value += Number(num);
        if(this.sqr){
            this.pantalla += "*";
            this.pantalla = Number(num);
            document.querySelector('input[type=text]').value = Number(num);
            this.sqr = false;
        } else{
            this.pantalla += Number(num);
        }
        if(this.expTecla){
            if(ultimoNumero == 0){
                this.pantalla = this.pantalla.slice(0,-2);
                document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-2);
            } else{
                this.pantalla = this.pantalla.slice(0,-1);
                document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-1);
            }
            
            this.pantalla += Number(num);
            document.querySelector('input[type=text]').value += Number(num);
            this.expTecla = false;
        }
    }

    deg(){
        if(document.querySelector('input[type=button][name="deg"]').value == "DEG"){
            document.querySelector('input[type=button][name="deg"]').value = "RAD";
        } else if(document.querySelector('input[type=button][name="deg"]').value == "RAD"){
            document.querySelector('input[type=button][name="deg"]').value = "GRAD";
        } else{
            document.querySelector('input[type=button][name="deg"]').value = "DEG";
        }
    }

    hyp(){
        if(!this.hypPulsado){
            this.hypPulsado = true;
        } else{
            this.hypPulsado = false;
        }
        if(this.shiftPulsado && this.hypPulsado){
            document.querySelector('input[type=button][value="asin"]').value = "asinh";
            document.querySelector('input[type=button][value="acos"]').value = "acosh";
            document.querySelector('input[type=button][value="atan"]').value = "atanh";
        } else if(!this.hypPulsado && this.shiftPulsado){
            document.querySelector('input[type=button][value="asinh"]').value = "asin";
            document.querySelector('input[type=button][value="acosh"]').value = "acos";
            document.querySelector('input[type=button][value="atanh"]').value = "atan";
        } else if(!this.hypPulsado && !this.shiftPulsado){
            document.querySelector('input[type=button][value="sinh"]').value = "sin";
            document.querySelector('input[type=button][value="cosh"]').value = "cos";
            document.querySelector('input[type=button][value="tanh"]').value = "tan";
        } else{
            document.querySelector('input[type=button][value="sin"]').value = "sinh";
            document.querySelector('input[type=button][value="cos"]').value = "cosh";
            document.querySelector('input[type=button][value="tan"]').value = "tanh";
        }
    }

    fe(){
        if(!this.fePulsado){
            this.fePulsado = true;
        } else{
            this.fePulsado = false;
        }
        if(this.equal){
            document.querySelector('input[type=text]').value = this.pantalla;
        }
    }

    mc(){
        this.mem = 0;
    }

    ms(){
        if(this.contieneOperadores()){
            this.mem = this.splitCadenaUltimo(this.pantalla, /[*/+-]/);
        } else{
            this.mem = this.pantalla;
        }
    }

    potencia2(){
        if(this.contieneOperadores()){
            var pot = this.splitCadenaUltimo(this.pantalla, /[*/+-]/);
            this.pantalla = this.pantalla.slice(0,-pot.length);
            this.pantalla += "Math.pow(" + pot +",2)";
        } else{
            var pot = this.pantalla;
            this.pantalla = "Math.pow(" + pot +",2)";
        }
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-pot.length);
        document.querySelector('input[type=text]').value += "sqr(" + pot + ")";
    }

    potencia(){
        document.querySelector('input[type=text]').value += "^";
        this.pantalla += "**";
    }

    sin(){
        if(document.querySelector('input[type=button][name="sen"]').value == "asin"){
            this.asin();
        } else if(document.querySelector('input[type=button][name="sen"]').value == "asinh"){
            this.asinh();
        } else if(document.querySelector('input[type=button][name="sen"]').value == "sinh"){
            this.sinh();
        } else{
            if(this.contieneOperadores()){
                var seno = this.splitCadenaUltimo(this.pantalla, /[*/+-]/);
            } else{
                var seno = this.pantalla;
            }
            this.pantalla = this.pantalla.slice(0,-seno.length);
            if(document.querySelector('input[type=button][name="deg"]').value == "RAD"){
                this.pantalla += "Math.sin(" + seno +")";
            } else if(document.querySelector('input[type=button][name="deg"]').value == "DEG"){
                var degrees = seno * (Math.PI / 180);
                this.pantalla += "Math.sin(" + degrees +")";
            } else{
                var gradians = seno * Math.PI / 200;
                this.pantalla += "Math.sin(" + gradians + ")";
            }
            document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-seno.length);
            document.querySelector('input[type=text]').value += "sin(" + seno + ")";
        }
    }

    cos(){
        if(document.querySelector('input[type=button][name="cosen"]').value == "acos"){
            this.acos();
        } else if(document.querySelector('input[type=button][name="cosen"]').value == "acosh"){
            this.acosh();
        } else if(document.querySelector('input[type=button][name="cosen"]').value == "cosh"){
            this.cosh();
        }else{
            if(this.contieneOperadores()){
                var coseno = this.splitCadenaUltimo(this.pantalla, /[*/+-]/);
            } else{
                var coseno = this.pantalla;
            }
            this.pantalla = this.pantalla.slice(0,-coseno.length);
            if(document.querySelector('input[type=button][name="deg"]').value == "RAD"){
                this.pantalla += "Math.cos(" + coseno +")";
            } else if(document.querySelector('input[type=button][name="deg"]').value == "DEG"){
                var degrees = coseno * (Math.PI / 180);
                this.pantalla += "Math.cos(" + degrees +")";
            } else{
                var gradians = coseno * Math.PI / 200;
                this.pantalla += "Math.cos(" + gradians + ")";
            }
            document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-coseno.length);
            document.querySelector('input[type=text]').value += "cos(" + coseno + ")";
        }
    }

    tan(){
        if(document.querySelector('input[type=button][name="tangent"]').value == "atan"){
            this.atan();
        } else if(document.querySelector('input[type=button][name="tangent"]').value == "atanh"){
            this.atanh();
        } else if(document.querySelector('input[type=button][name="tangent"]').value == "tanh"){
            this.tanh();
        }else{
            if(this.contieneOperadores()){
                var tangente = this.splitCadenaUltimo(this.pantalla, /[*/+-]/);
            } else{
                var tangente = this.pantalla;
            }
            this.pantalla = this.pantalla.slice(0,-tangente.length);
            if(document.querySelector('input[type=button][name="deg"]').value == "RAD"){
                this.pantalla += "Math.tan(" + tangente +")";
            } else if(document.querySelector('input[type=button][name="deg"]').value == "DEG"){
                var degrees = tangente * (Math.PI / 180);
                this.pantalla += "Math.tan(" + degrees +")";
            } else{
                var gradians = tangente * Math.PI / 200;
                this.pantalla += "Math.tan(" + gradians + ")";
            }
            document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-tangente.length);
            document.querySelector('input[type=text]').value += "tan(" + tangente + ")";
        }
    }

    asin(){
        if(this.contieneOperadores()){
            var arcoseno = this.splitCadenaUltimo(this.pantalla, /[*/+-]/);
        } else{
            var arcoseno = this.pantalla;
        }
        this.pantalla = this.pantalla.slice(0,-arcoseno.length);
        if(document.querySelector('input[type=button][name="deg"]').value == "RAD"){
            this.pantalla += "Math.asin(" + arcoseno +")";
        } else if(document.querySelector('input[type=button][name="deg"]').value == "DEG"){
            var degrees = arcoseno * (Math.PI / 180);
            this.pantalla += "Math.asin(" + degrees +")";
        } else{
            var gradians = arcoseno * Math.PI / 200;
            this.pantalla += "Math.asin(" + gradians + ")";
        }
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-arcoseno.length);
        document.querySelector('input[type=text]').value += "asin(" + arcoseno + ")";
    }

    acos(){
        if(this.contieneOperadores()){
            var arcocoseno = this.splitCadenaUltimo(this.pantalla, /[*/+-]/);
        } else{
            var arcocoseno = this.pantalla;
        }
        this.pantalla = this.pantalla.slice(0,-arcocoseno.length);
        if(document.querySelector('input[type=button][name="deg"]').value == "RAD"){
            this.pantalla += "Math.acos(" + arcocoseno +")";
        } else if(document.querySelector('input[type=button][name="deg"]').value == "DEG"){
            var degrees = arcocoseno * (Math.PI / 180);
            this.pantalla += "Math.acos(" + degrees +")";
        } else{
            var gradians = arcocoseno * Math.PI / 200;
            this.pantalla += "Math.acos(" + gradians + ")";
        }
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-arcocoseno.length);
        document.querySelector('input[type=text]').value += "acos(" + arcocoseno + ")";
    }

    atan(){
        if(this.contieneOperadores()){
            var arcotangente = this.splitCadenaUltimo(this.pantalla, /[*/+-]/);
        } else{
            var arcotangente = this.pantalla;
        }
        this.pantalla = this.pantalla.slice(0,-arcotangente.length);
        if(document.querySelector('input[type=button][name="deg"]').value == "RAD"){
            this.pantalla += "Math.atan(" + arcotangente +")";
        } else if(document.querySelector('input[type=button][name="deg"]').value == "DEG"){
            var degrees = arcotangente * (Math.PI / 180);
            this.pantalla += "Math.atan(" + degrees +")";
        } else{
            var gradians = arcotangente * Math.PI / 200;
            this.pantalla += "Math.atan(" + gradians + ")";
        }
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-arcotangente.length);
        document.querySelector('input[type=text]').value += "atan(" + arcotangente + ")";
    }

    sinh(){
        if(this.contieneOperadores()){
            var hypsen = this.splitCadenaUltimo(this.pantalla, /[*/+-]/);
        } else{
            var hypsen = this.pantalla;
        }
        this.pantalla = this.pantalla.slice(0,-hypsen.length);
        this.pantalla += "Math.sinh(" + hypsen +")";
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-hypsen.length);
        document.querySelector('input[type=text]').value += "sinh(" + hypsen + ")";
    }

    cosh(){
        if(this.contieneOperadores()){
            var hypcos = this.splitCadenaUltimo(this.pantalla, /[*/+-]/);
        } else{
            var hypcos = this.pantalla;
        }
        this.pantalla = this.pantalla.slice(0,-hypcos.length);
        this.pantalla += "Math.cosh(" + hypcos +")";
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-hypcos.length);
        document.querySelector('input[type=text]').value += "cosh(" + hypcos + ")";
    }

    tanh(){
        if(this.contieneOperadores()){
            var hyptan = this.splitCadenaUltimo(this.pantalla, /[*/+-]/);
        } else{
            var hyptan = this.pantalla;
        }
        this.pantalla = this.pantalla.slice(0,-hyptan.length);
        this.pantalla += "Math.tanh(" + hyptan +")";
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-hyptan.length);
        document.querySelector('input[type=text]').value += "tanh(" + hyptan + ")";
    }

    asinh(){
        if(this.contieneOperadores()){
            var ahypsen = this.splitCadenaUltimo(this.pantalla, /[*/+-]/);
        } else{
            var ahypsen = this.pantalla;
        }
        this.pantalla = this.pantalla.slice(0,-ahypsen.length);
        this.pantalla += "Math.asinh(" + ahypsen +")";
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-ahypsen.length);
        document.querySelector('input[type=text]').value += "asinh(" + ahypsen + ")";
    }

    acosh(){
        if(this.contieneOperadores()){
            var ahypcos = this.splitCadenaUltimo(this.pantalla, /[*/+-]/);
        } else{
            var ahypcos = this.pantalla;
        }
        this.pantalla = this.pantalla.slice(0,-ahypcos.length);
        this.pantalla += "Math.acosh(" + ahypcos +")";
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-ahypcos.length);
        document.querySelector('input[type=text]').value += "acosh(" + ahypcos + ")";
    }

    atanh(){
        if(this.contieneOperadores()){
            var ahyptan = this.splitCadenaUltimo(this.pantalla, /[*/+-]/);
        } else{
            var ahyptan = this.pantalla;
        }
        this.pantalla = this.pantalla.slice(0,-ahyptan.length);
        this.pantalla += "Math.atanh(" + ahyptan +")";
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-ahyptan.length);
        document.querySelector('input[type=text]').value += "atanh(" + ahyptan + ")";
    }

    raiz(){
        this.sqr = true;
        if(this.contieneOperadores()){
            var result = this.splitCadenaUltimo(this.pantalla, /[*/+-]/);
            if(result.includes("(")){
                result = result.slice(1,result.length);
            }
            var signo = this.pantalla.slice(-(result.length+1)).substring(0,1);
            document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-result.length);
            document.querySelector('input[type=text]').value += "√(" + result + ")";
            this.pantalla = this.pantalla.slice(0,-result.length-1);
            this.pantalla += signo + Math.sqrt(result);
        } else{
            document.querySelector('input[type=text]').value = "";
            document.querySelector('input[type=text]').value += "√(" + this.pantalla + ")";
            var numero = this.pantalla;
            this.pantalla = this.pantalla.slice(0,-this.pantalla.length-1);
            this.pantalla += Math.sqrt(numero);
        }
    }

    potencia10(){
        if(this.pantalla.length == 0){
            this.pantalla += Math.pow(10,0);
        } else{
            if(this.contieneOperadores()){
                var ultimo = this.splitCadenaUltimo(this.pantalla, /[*/+-]/);
            } else{
                var ultimo = this.pantalla;
            }
        }
        this.pantalla = this.pantalla.slice(0,-ultimo.length);
        this.pantalla += Math.pow(10,ultimo);
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-ultimo.length);
        document.querySelector('input[type=text]').value = this.pantalla;
    }

    log(){
        if(this.contieneOperadores()){
            var ultimo = this.splitCadenaUltimo(this.pantalla, /[*/+-]/);
        } else{
            var ultimo = this.pantalla;
        }
        this.pantalla = this.pantalla.slice(0,-ultimo.length);
        this.pantalla += Math.log10(ultimo);
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-ultimo.length);
        document.querySelector('input[type=text]').value = this.pantalla;
    }

    exp(){
        this.expTecla = true;
        this.containsExp = true;
        this.pantalla += ",e+0";
        document.querySelector('input[type=text]').value += ",e+0";
    }

    porcentaje(){
        this.pantalla += "%";
        document.querySelector('input[type=text]').value += " Mod ";
    }

    flecha(){
        if(!this.shiftPulsado){
            this.shiftPulsado = true;
        } else{
            this.shiftPulsado = false;
        }
        if(this.shiftPulsado && this.hypPulsado){
            document.querySelector('input[type=button][value="asin"]').value = "asinh";
            document.querySelector('input[type=button][value="acos"]').value = "acosh";
            document.querySelector('input[type=button][value="atan"]').value = "atanh";
        } else if(!this.hypPulsado && this.shiftPulsado){
            document.querySelector('input[type=button][value="sin"]').value = "asin";
            document.querySelector('input[type=button][value="cos"]').value = "acos";
            document.querySelector('input[type=button][value="tan"]').value = "atan";
        } else if(this.hypPulsado && !this.shiftPulsado){
            document.querySelector('input[type=button][value="sinh"]').value = "sin";
            document.querySelector('input[type=button][value="cosh"]').value = "cos";
            document.querySelector('input[type=button][value="tanh"]').value = "tan";
        } else{
            document.querySelector('input[type=button][value="asin"]').value = "sin";
            document.querySelector('input[type=button][value="acos"]').value = "cos";
            document.querySelector('input[type=button][value="atan"]').value = "tan";
        }
    }

    ce(){
        if(this.pantalla.includes("%")){
            var ultimo = this.splitCadenaUltimo(this.pantalla, "%");
            var ultimoVisual = this.splitCadenaUltimo(document.querySelector('input[type=text]').value, " Mod ");
            this.pantalla = this.pantalla.slice(0,-ultimo.length);
            document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-ultimoVisual.length);
        } else if(this.contieneOperadores()){
            var ultimo = this.splitCadenaUltimo(this.pantalla, /[*/+-]/);
            var ultimoVisual = this.splitCadenaUltimo(document.querySelector('input[type=text]').value, /[*/+-]/);
            this.pantalla = this.pantalla.slice(0,-ultimo.length);
            document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-ultimoVisual.length);
        } else{
            this.pantalla = "";
            document.querySelector('input[type=text]').value = 0;
			this.on = true;
        }
        if(this.sqr){
            this.sqr = false;
        }
    }

    borrar(){
        if(this.contieneDiferenteVisualmente()){
            this.ce();
        } else if(this.pantalla.includes("%")){
            if(this.pantalla.slice(-1) == "%"){
                this.pantalla = this.pantalla.slice(0,-1);
                document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-5);
            } else{
                var ultimo = this.splitCadenaUltimo(this.pantalla, "%");
                var ultimoVisual = this.splitCadenaUltimo(document.querySelector('input[type=text]').value, " Mod ");
    
                this.pantalla = this.pantalla.slice(0,-ultimo.length);
                document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-ultimoVisual.length);
            }
        } else if(this.pantalla.includes("**")){
            if(this.pantalla.slice(-2) == "**"){
                this.pantalla = this.pantalla.slice(0,-2);
                document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-1);
            } else{
                var ultimo = this.splitCadenaUltimo(this.pantalla, "**");
                var ultimoVisual = this.splitCadenaUltimo(document.querySelector('input[type=text]').value, "^");
    
                this.pantalla = this.pantalla.slice(0,-ultimo.length);
                document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-ultimoVisual.length);
            }
        } else{
            super.borrar();
        }
        if(this.sqr){
            this.sqr = false;
        }
        if(document.querySelector('input[type=text]').value == ""){
            document.querySelector('input[type=text]').value = 0;
            this.on = true;
            this.pantalla = "";
        }
    }

    contieneDiferenteVisualmente(){
        var visual = document.querySelector('input[type=text]').value;
        return visual.includes("sqr") || visual.includes("fact") || visual.includes("sin") || visual.includes("cos")
            || visual.includes("tan") || visual.includes("sinh") || visual.includes("cosh") || visual.includes("tanh")
            || visual.includes("asin") || visual.includes("acos") || visual.includes("atan") || visual.includes("asinh")
            || visual.includes("acosh") || visual.includes("atanh") || visual.includes("√");
    }

    pi(){
        if(this.on){
            document.querySelector('input[type=text]').value = "";
        }
        document.querySelector('input[type=text]').value += Math.PI;
        this.pantalla += Math.PI;
    }

    multiplicacion(){
        this.on = false;
        this.sqr = false;
        this.equal = false;
        if(this.fePulsado){
            if(this.contieneOperadores()){
                var result = this.splitCadenaUltimo(this.pantalla, /[*/+-]/);
            } else{
                var result = document.querySelector('input[type=text]').value;
            }
            if(result.length > 1){
                var primerNumero = result.substring(0,1);
                var restoNumero = result.substring(1,result.length);
                document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-result.length);
                document.querySelector('input[type=text]').value += primerNumero + "," + restoNumero;
                document.querySelector('input[type=text]').value += "e+" + restoNumero.length;
            } else{
                document.querySelector('input[type=text]').value += ",e+0";
            }
        }
        this.pantalla += "*";
        document.querySelector('input[type=text]').value += "*";
        this.cambiarExponente();
    }

    factorial(){
        if(this.contieneOperadores()){
            var n = this.splitCadenaUltimo(this.pantalla, /[*/+-]/);
        } else{
            var n = document.querySelector('input[type=text]').value;
        }
        if(n.includes("(")){
            n = n.slice(1,n.length);
        }
        var total = 1;
            for (var i=1; i<=n; i++) {
                total = total * i; 
            }
        this.pantalla = this.pantalla.slice(0,-n.length);
        this.pantalla += total;
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-n.length);
        document.querySelector('input[type=text]').value += "fact(" + n + ")";
        
    }

    resta(){
        this.on = false;
        this.sqr = false;
        this.equal = false;
        if(this.fePulsado){
            if(this.contieneOperadores()){
                var result = this.splitCadenaUltimo(this.pantalla,  /[*/+-]/);
            } else{
                var result = document.querySelector('input[type=text]').value;
            }
            if(result.length > 1){
                var primerNumero = result.substring(0,1);
                var restoNumero = result.substring(1,result.length);
                document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-result.length);
                document.querySelector('input[type=text]').value += primerNumero + "," + restoNumero;
                document.querySelector('input[type=text]').value += "e+" + restoNumero.length;
            } else{
                document.querySelector('input[type=text]').value += ",e+0";
            }
        }
        this.pantalla += "-";
        document.querySelector('input[type=text]').value += "-";
        this.cambiarExponente();
    }

    cambiarSigno(){
        if(this.contieneOperadores()){
            var result = this.pantalla.split(/[*/+-]/);
            var ultimo = result[result.length-1];
            var operador = this.pantalla.slice(-ultimo.length-1,-ultimo.length);
            if(operador == "+" || operador == "-"){
                document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-ultimo.length-1);
                this.pantalla = this.pantalla.slice(0,-ultimo.length-1);
                if(operador == "+"){
                    ultimo *= (-1);
                } else if(operador == "-"){
                    ultimo = "+" + ultimo;
                }
                document.querySelector('input[type=text]').value += ultimo;
                this.pantalla += ultimo;
            } else{
                var penultimo = result[result.length - 2];
                document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-penultimo.length-1);
                document.querySelector('input[type=text]').value += (operador + ultimo * (-1));
                this.pantalla = this.pantalla.slice(0,-penultimo.length-1);
                this.pantalla += (operador + ultimo * (-1));
            }
        } else{
            document.querySelector('input[type=text]').value *= (-1);
            this.pantalla = document.querySelector('input[type=text]').value;
        }
    }

    suma(){
        this.on = false;
        this.sqr = false;
        this.equal = false;
        if(this.fePulsado){
            if(this.contieneOperadores()){
                var result = this.splitCadenaUltimo(this.pantalla,  /[*/+-]/);
            } else{
                var result = document.querySelector('input[type=text]').value;
            }
            if(result.length > 1){
                var primerNumero = result.substring(0,1);
                var restoNumero = result.substring(1,result.length);
                document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-result.length);
                document.querySelector('input[type=text]').value += primerNumero + "," + restoNumero;
                document.querySelector('input[type=text]').value += "e+" + restoNumero.length;
            } else{
                document.querySelector('input[type=text]').value += ",e+0";
            }
        }
        this.pantalla += "+";
        document.querySelector('input[type=text]').value += "+";
        this.cambiarExponente();
    }

    cambiarExponente(){
        if(this.pantalla.includes(",e+")){
            var numAnterior = this.pantalla.split(",");
            numAnterior = numAnterior[0];
            if(this.contieneOperadores()){
                numAnterior = this.splitCadenaUltimo(numAnterior, /[*/+-]/);
            } 
            var numPosterior = this.pantalla.split(",e+");
            numPosterior = numPosterior[1].slice(0,-1);
            if(numPosterior == 0){
                this.pantalla = this.pantalla.replace(",e+0","");
            } else{
                var multiplicar = 10**numPosterior;
                this.pantalla = this.pantalla.replace(numAnterior + ",e+" + numPosterior,numAnterior*multiplicar);
            }
        }
    }

    parentesisIzq(){
        if(this.on){
            document.querySelector('input[type=text]').value = "";
            this.on = false;
        }
        document.querySelector('input[type=text]').value += "(";
        this.pantalla += "(";
    }

    parentesisDcha(){
        if(this.on){
            document.querySelector('input[type=text]').value = "";
            this.on = false;
        }
        document.querySelector('input[type=text]').value += ")";
        this.pantalla += ")";
    }

    division(){
        this.on = false;
        this.sqr = false;
        this.equal = false;
        if(this.fePulsado){
            if(this.contieneOperadores()){
                var result = this.splitCadenaUltimo(this.pantalla,  /[*/+-]/);
            } else{
                var result = document.querySelector('input[type=text]').value;
            }
            if(result.length > 1){
                var primerNumero = result.substring(0,1);
                var restoNumero = result.substring(1,result.length);
                document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-result.length);
                document.querySelector('input[type=text]').value += primerNumero + "," + restoNumero;
                document.querySelector('input[type=text]').value += "e+" + restoNumero.length;
            } else{
                document.querySelector('input[type=text]').value += ",e+0";
            }
        }
        this.pantalla += "/";
        document.querySelector('input[type=text]').value += "/";
        this.cambiarExponente();
    }

    igual(){
        if(this.pantalla.includes("--")){
            this.pantalla = this.pantalla.replace("--","+");
        } else if(this.pantalla.includes("++")){
            this.pantalla = this.pantalla.replace("++","+");
        } else if(this.pantalla.includes("+-")){
            this.pantalla = this.pantalla.replace("+-","-");
        } else if(this.pantalla.includes("-+")){
            this.pantalla = this.pantalla.replace("-+","-");
        }
        if(this.pantalla.includes(",e+")){
            var numAnterior = this.pantalla.split(",");
            numAnterior = numAnterior[0];
            if(this.contieneOperadores()){
                numAnterior = this.splitCadenaUltimo(numAnterior,  /[*/+-]/);
            } 
            var numPosterior = this.pantalla.split(",e+");
            numPosterior = numPosterior[1];
            if(numPosterior == 0){
                this.pantalla = this.pantalla.replace(",e+0","");
            } else{
                var multiplicar = 10**numPosterior;
                this.pantalla = this.pantalla.replace(numAnterior + ",e+" + numPosterior,numAnterior*multiplicar);
            }
            document.querySelector('input[type=text]').value = this.pantalla;
        }
        super.igual();
        this.pantalla = document.querySelector('input[type=text]').value;
        if(this.fePulsado){
            var valor = Number(eval(this.pantalla));
            this.pantalla = valor.toString();
            if(this.pantalla.length > 1){
                var primerNumero = this.pantalla.substring(0,1);
                var restoNumero = this.pantalla.substring(1,this.pantalla.length);
                document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-valor.length);
                document.querySelector('input[type=text]').value += primerNumero + "," + restoNumero;
                document.querySelector('input[type=text]').value += "e+" + restoNumero.length;
            } else{
                document.querySelector('input[type=text]').value += ",e+0";
            }
        }
        this.equal = true;
    }
}

var calculadora = new CalculadoraCientifica();