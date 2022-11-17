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
        if (key === '*') {
            this.multiplicacion();
        }
        if (key === '/') {
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
        this.equal = 0;
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
            this.operadorPulsado = false;
            this.pantalla += "*";
            this.pantalla += Number(num);
            this.sqr = false;
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
        if(!this.operadorPulsado){
            this.sqr = false;
            //document.querySelector('input[type=text]').value += "+";
            this.equal = false;
            this.operadorPulsado = true;
            this.numOperandos += 1;
            if(this.numOperandos > 2){
                this.pantalla = Number(eval(this.pantalla));
                this.numOperandos = 1;
            }
            this.pantalla += "+";
        }
    }

    resta(){
        if(!this.operadorPulsado){
            this.sqr = false;
            //document.querySelector('input[type=text]').value += "-";
            this.equal = false;
            this.operadorPulsado = true;
            this.numOperandos += 1;
            if(this.numOperandos > 2){
                this.pantalla = Number(eval(this.pantalla));
                this.numOperandos = 1;
            }
            this.pantalla += "-";
        }
    }

    multiplicacion(){
        if(!this.operadorPulsado){
            this.sqr = false;
            //document.querySelector('input[type=text]').value += "*";
            this.equal = false;
            this.operadorPulsado = true;
            this.numOperandos += 1;
            if(this.numOperandos > 2){
                this.pantalla = Number(eval(this.pantalla));
                this.numOperandos = 1;
            }
            this.pantalla += "*";
        }
    }

    division(){
        if(!this.operadorPulsado){
            this.sqr = false;
            //document.querySelector('input[type=text]').value += "/";
            this.equal = false;
            this.operadorPulsado = true;
            this.numOperandos += 1;
            if(this.numOperandos > 2){
                this.pantalla = Number(eval(this.pantalla));
                this.numOperandos = 1;
            }
            this.pantalla += "/";
        }
    }

    mrc(){
        document.querySelector('input[type=text]').value = this.mem;
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
        //document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-1);        
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
            //Un solo número
            document.querySelector('input[type=text]').value = (this.pantalla / 100);
        }
        this.pantalla = document.querySelector('input[type=text]').value;
    }

    raiz(){
        this.sqr = true;
        this.operadorPulsado = true;
        if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
            var result = this.pantalla.split(/[+-/*]/);
            result = result[result.length-1];
            var signo = this.pantalla.slice(-(result.length+1)).substring(0,1);
            //document.querySelector('input[type=text]').value += "√";
            this.raizValor = Number(eval(result**(1/2)));
            this.pantalla = this.pantalla.substring(0,this.pantalla.length-result.length-1) + signo + this.raizValor;
        } else{
            //document.querySelector('input[type=text]').value += "√";
            this.raizValor = Number(eval(this.pantalla**(1/2)));
            this.pantalla = this.raizValor.toString();
        }
        //document.querySelector('input[type=text]').value += "√";
        //document.querySelector('input[type=text]').value = this.raizValor;
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
                if(this.sqr == true){
                    if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                        document.querySelector('input[type=text]').value = Number(eval(this.pantalla));
                        this.pantalla = document.querySelector('input[type=text]').value;
                        this.sqr = false;
                    } else{
                        document.querySelector('input[type=text]').value = this.pantalla;
                        this.pantalla = document.querySelector('input[type=text]').value;
                        this.sqr = false;
                    }
                } else{
                    document.querySelector('input[type=text]').value = Number(eval(this.pantalla));
                    //this.pantalla = document.querySelector('input[type=text]').value;
                }
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
        if(key === "("){
            this.parentesisIzq();
        }
        if(key === ")"){
            this.parentesisDcha();
        }
        if(key === "d" || key === "D"){
            this.deg()
        }
        if(key === "h" || key === "H"){
            this.hyp()
        }
        if(key === "f" || key === "F"){
            this.fe()
        }
        if(key === "q" || key === "Q"){
            this.mc()
        }
        if(key === "g" || key === "G"){
            this.ms()
        }
        if(key === "w" || key === "W"){
            this.potencia2()
        }
        if(key === "y" || key === "Y"){
            this.potencia()
        }
        if(key === "i" || key === "I"){
            this.sin()
        }
        if(key === "o" || key === "O"){
            this.cos()
        }
        if(key === "t" || key === "T"){
            this.tan()
        }
        if(key === "z" || key === "Z"){
            this.potencia10()
        }
        if(key === "l" || key === "L"){
            this.log()
        }
        if(key === "e" || key === "E"){
            this.exp()
        }
        if(key === "Shift"){
            this.flecha()
        }
        if(key === "Delete"){
            this.cd()
        }
        if(key === "u" || key === "U"){
            this.pi()
        }
        if(key === "!"){
            this.factorial()
        }
    }

    digitos(num){
        this.equal = 0;
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
        if(this.fePulsado){
            
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
        if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
            var result = this.pantalla.split(/[*/+-]/);
            this.mem = result[result.length-1];
        } else{
            this.mem = this.pantalla;
        }
    }

    potencia2(){
        if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
            var result = this.pantalla.split(/[*/+-]/);
            var pot = result[result.length-1];
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
            if(document.querySelector('input[type=button][name="deg"]').value == "RAD"){
                if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                    var result = this.pantalla.split(/[*/+-]/);
                    var seno = result[result.length-1];
                    this.pantalla = this.pantalla.slice(0,-seno.length);
                    this.pantalla += "Math.sin(" + seno +")";
                } else{
                    var seno = this.pantalla;
                    this.pantalla = this.pantalla.slice(0,-seno.length);
                    this.pantalla = "Math.sin(" + seno +")";
                }
            } else if(document.querySelector('input[type=button][name="deg"]').value == "DEG"){
                if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                    var result = this.pantalla.split(/[*/+-]/);
                    var seno = result[result.length-1];
                    this.pantalla = this.pantalla.slice(0,-seno.length);
                    var degrees = seno * (Math.PI / 180);
                    this.pantalla += "Math.sin(" + degrees +")";
                } else{
                    var seno = this.pantalla;
                    this.pantalla = this.pantalla.slice(0,-seno.length);
                    var degrees = seno * (Math.PI / 180);
                    this.pantalla = "Math.sin(" + degrees +")";
                }
            } else{
                if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                    var result = this.pantalla.split(/[*/+-]/);
                    var seno = result[result.length-1];
                    this.pantalla = this.pantalla.slice(0,-seno.length);
                    var gradians = seno * Math.PI / 200;
                    this.pantalla += "Math.sin(" + gradians + ")";
                } else{
                    var seno = this.pantalla;
                    this.pantalla = this.pantalla.slice(0,-seno.length);
                    var gradians = seno * Math.PI / 200;
                    this.pantalla = "Math.sin(" + gradians + ")";
                }
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
        } else{
            if(document.querySelector('input[type=button][name="deg"]').value == "RAD"){
                if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                    var result = this.pantalla.split(/[*/+-]/);
                    var coseno = result[result.length-1];
                    this.pantalla = this.pantalla.slice(0,-coseno.length);
                    this.pantalla += "Math.cos(" + coseno +")";
                } else{
                    var coseno = this.pantalla;
                    this.pantalla = this.pantalla.slice(0,-coseno.length);
                    this.pantalla = "Math.cos(" + coseno +")";
                }
            } else if(document.querySelector('input[type=button][name="deg"]').value == "DEG"){
                if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                    var result = this.pantalla.split(/[*/+-]/);
                    var coseno = result[result.length-1];
                    this.pantalla = this.pantalla.slice(0,-coseno.length);
                    var degrees = coseno * (Math.PI / 180);
                    this.pantalla += "Math.cos(" + degrees +")";
                } else{
                    var coseno = this.pantalla;
                    this.pantalla = this.pantalla.slice(0,-coseno.length);
                    var degrees = coseno * (Math.PI / 180);
                    this.pantalla = "Math.cos(" + degrees +")";
                }
            } else{
                if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                    var result = this.pantalla.split(/[*/+-]/);
                    var coseno = result[result.length-1];
                    this.pantalla = this.pantalla.slice(0,-coseno.length);
                    var gradians = coseno * Math.PI / 200;
                    this.pantalla += "Math.cos(" + gradians + ")";
                } else{
                    var coseno = this.pantalla;
                    this.pantalla = this.pantalla.slice(0,-coseno.length);
                    var gradians = coseno * Math.PI / 200;
                    this.pantalla = "Math.cos(" + gradians + ")";
                }
            }
            document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-coseno.length);
            document.querySelector('input[type=text]').value += "cos(" + coseno + ")";
        }
    }

    tan(){
        if(document.querySelector('input[type=button][name="deg"]').value == "RAD"){
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var tangente = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-tangente.length);
                this.pantalla += "Math.tan(" + tangente +")";
            } else{
                var tangente = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-tangente.length);
                this.pantalla = "Math.tan(" + tangente +")";
            }
        } else if(document.querySelector('input[type=button][name="deg"]').value == "DEG"){
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var tangente = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-tangente.length);
                var degrees = tangente * (Math.PI / 180);
                this.pantalla += "Math.tan(" + degrees +")";
            } else{
                var tangente = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-tangente.length);
                var degrees = tangente * (Math.PI / 180);
                this.pantalla = "Math.tan(" + degrees +")";
            }
        } else{
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var tangente = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-tangente.length);
                var gradians = tangente * Math.PI / 200;
                this.pantalla += "Math.tan(" + gradians + ")";
            } else{
                var tangente = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-tangente.length);
                var gradians = tangente * Math.PI / 200;
                this.pantalla = "Math.tan(" + gradians + ")";
            }
        }
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-tangente.length);
        document.querySelector('input[type=text]').value += "tan(" + tangente + ")";
    }

    asin(){
        if(document.querySelector('input[type=button][name="deg"]').value == "RAD"){
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var arcoseno = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-arcoseno.length);
                this.pantalla += "Math.asin(" + arcoseno +")";
            } else{
                var arcoseno = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-arcoseno.length);
                this.pantalla = "Math.asin(" + arcoseno +")";
            }
        } else if(document.querySelector('input[type=button][name="deg"]').value == "DEG"){
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var arcoseno = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-arcoseno.length);
                var degrees = arcoseno * (Math.PI / 180);
                this.pantalla += "Math.asin(" + degrees +")";
            } else{
                var arcoseno = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-arcoseno.length);
                var degrees = arcoseno * (Math.PI / 180);
                this.pantalla = "Math.asin(" + degrees +")";
            }
        } else{
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var arcoseno = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-arcoseno.length);
                var gradians = arcoseno * Math.PI / 200;
                this.pantalla += "Math.asin(" + gradians + ")";
            } else{
                var arcoseno = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-arcoseno.length);
                var gradians = arcoseno * Math.PI / 200;
                this.pantalla = "Math.asin(" + gradians + ")";
            }
        }
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-arcoseno.length);
        document.querySelector('input[type=text]').value += "asin(" + arcoseno + ")";
    }

    acos(){
        if(document.querySelector('input[type=button][name="deg"]').value == "RAD"){
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var arcocoseno = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-arcocoseno.length);
                this.pantalla += "Math.acos(" + arcocoseno +")";
            } else{
                var arcocoseno = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-arcocoseno.length);
                this.pantalla = "Math.acos(" + arcocoseno +")";
            }
        } else if(document.querySelector('input[type=button][name="deg"]').value == "DEG"){
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var arcocoseno = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-arcocoseno.length);
                var degrees = arcocoseno * (Math.PI / 180);
                this.pantalla += "Math.acos(" + degrees +")";
            } else{
                var arcocoseno = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-arcocoseno.length);
                var degrees = arcocoseno * (Math.PI / 180);
                this.pantalla = "Math.acos(" + degrees +")";
            }
        } else{
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var arcocoseno = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-arcocoseno.length);
                var gradians = arcocoseno * Math.PI / 200;
                this.pantalla += "Math.acos(" + gradians + ")";
            } else{
                var arcocoseno = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-arcocoseno.length);
                var gradians = arcocoseno * Math.PI / 200;
                this.pantalla = "Math.acos(" + gradians + ")";
            }
        }
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-arcocoseno.length);
        document.querySelector('input[type=text]').value += "acos(" + arcocoseno + ")";
    }

    atan(){
        if(document.querySelector('input[type=button][name="deg"]').value == "RAD"){
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var arcotangente = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-arcotangente.length);
                this.pantalla += "Math.atan(" + arcotangente +")";
            } else{
                var arcotangente = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-arcotangente.length);
                this.pantalla = "Math.atan(" + arcotangente +")";
            }
        } else if(document.querySelector('input[type=button][name="deg"]').value == "DEG"){
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var arcotangente = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-arcotangente.length);
                var degrees = arcotangente * (Math.PI / 180);
                this.pantalla += "Math.atan(" + degrees +")";
            } else{
                var arcotangente = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-arcotangente.length);
                var degrees = arcotangente * (Math.PI / 180);
                this.pantalla = "Math.atan(" + degrees +")";
            }
        } else{
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var arcotangente = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-arcotangente.length);
                var gradians = arcotangente * Math.PI / 200;
                this.pantalla += "Math.atan(" + gradians + ")";
            } else{
                var arcotangente = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-arcotangente.length);
                var gradians = arcotangente * Math.PI / 200;
                this.pantalla = "Math.atan(" + gradians + ")";
            }
        }
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-arcotangente.length);
        document.querySelector('input[type=text]').value += "atan(" + arcotangente + ")";
    }

    sinh(){
        if(document.querySelector('input[type=button][name="deg"]').value == "RAD"){
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var hypsen = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-hypsen.length);
                this.pantalla += "Math.sinh(" + hypsen +")";
            } else{
                var hypsen = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-hypsen.length);
                this.pantalla = "Math.sinh(" + hypsen +")";
            }
        } else if(document.querySelector('input[type=button][name="deg"]').value == "DEG"){
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var hypsen = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-hypsen.length);
                var degrees = hypsen * (Math.PI / 180);
                this.pantalla += "Math.sinh(" + degrees +")";
            } else{
                var hypsen = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-hypsen.length);
                var degrees = hypsen * (Math.PI / 180);
                this.pantalla = "Math.sinh(" + degrees +")";
            }
        } else{
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var hypsen = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-hypsen.length);
                var gradians = hypsen * Math.PI / 200;
                this.pantalla += "Math.sinh(" + gradians + ")";
            } else{
                var hypsen = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-hypsen.length);
                var gradians = hypsen * Math.PI / 200;
                this.pantalla = "Math.sinh(" + gradians + ")";
            }
        }
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-hypsen.length);
        document.querySelector('input[type=text]').value += "sinh(" + hypsen + ")";
    }

    cosh(){
        if(document.querySelector('input[type=button][name="deg"]').value == "RAD"){
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var hypcos = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-hypcos.length);
                this.pantalla += "Math.cosh(" + hypcos +")";
            } else{
                var hypcos = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-hypcos.length);
                this.pantalla = "Math.cosh(" + hypcos +")";
            }
        } else if(document.querySelector('input[type=button][name="deg"]').value == "DEG"){
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var hypcos = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-hypcos.length);
                var degrees = hypcos * (Math.PI / 180);
                this.pantalla += "Math.cosh(" + degrees +")";
            } else{
                var hypcos = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-hypcos.length);
                var degrees = hypcos * (Math.PI / 180);
                this.pantalla = "Math.cosh(" + degrees +")";
            }
        } else{
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var hypcos = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-hypcos.length);
                var gradians = hypcos * Math.PI / 200;
                this.pantalla += "Math.cosh(" + gradians + ")";
            } else{
                var hypcos = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-hypcos.length);
                var gradians = hypcos * Math.PI / 200;
                this.pantalla = "Math.cosh(" + gradians + ")";
            }
        }
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-hypcos.length);
        document.querySelector('input[type=text]').value += "cosh(" + hypcos + ")";
    }

    tanh(){
        if(document.querySelector('input[type=button][name="deg"]').value == "RAD"){
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var hyptan = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-hyptan.length);
                this.pantalla += "Math.cos(" + hyptan +")";
            } else{
                var hyptan = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-hyptan.length);
                this.pantalla = "Math.cos(" + hyptan +")";
            }
        } else if(document.querySelector('input[type=button][name="deg"]').value == "DEG"){
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var hyptan = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-hyptan.length);
                var degrees = hyptan * (Math.PI / 180);
                this.pantalla += "Math.cos(" + degrees +")";
            } else{
                var hyptan = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-hyptan.length);
                var degrees = hyptan * (Math.PI / 180);
                this.pantalla = "Math.cos(" + degrees +")";
            }
        } else{
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var hyptan = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-hyptan.length);
                var gradians = hyptan * Math.PI / 200;
                this.pantalla += "Math.cos(" + gradians + ")";
            } else{
                var hyptan = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-hyptan.length);
                var gradians = hyptan * Math.PI / 200;
                this.pantalla = "Math.cos(" + gradians + ")";
            }
        }
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-hyptan.length);
        document.querySelector('input[type=text]').value += "cos(" + hyptan + ")";
    }

    asinh(){
        if(document.querySelector('input[type=button][name="deg"]').value == "RAD"){
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var ahypsen = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-ahypsen.length);
                this.pantalla += "Math.asinh(" + ahypsen +")";
            } else{
                var ahypsen = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-ahypsen.length);
                this.pantalla = "Math.asinh(" + ahypsen +")";
            }
        } else if(document.querySelector('input[type=button][name="deg"]').value == "DEG"){
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var ahypsen = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-ahypsen.length);
                var degrees = ahypsen * (Math.PI / 180);
                this.pantalla += "Math.asinh(" + degrees +")";
            } else{
                var ahypsen = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-ahypsen.length);
                var degrees = ahypsen * (Math.PI / 180);
                this.pantalla = "Math.asinh(" + degrees +")";
            }
        } else{
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var ahypsen = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-ahypsen.length);
                var gradians = ahypsen * Math.PI / 200;
                this.pantalla += "Math.asinh(" + gradians + ")";
            } else{
                var ahypsen = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-ahypsen.length);
                var gradians = ahypsen * Math.PI / 200;
                this.pantalla = "Math.asinh(" + gradians + ")";
            }
        }
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-ahypsen.length);
        document.querySelector('input[type=text]').value += "asinh(" + ahypsen + ")";
    }

    acosh(){
        if(document.querySelector('input[type=button][name="deg"]').value == "RAD"){
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var ahypcos = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-ahypcos.length);
                this.pantalla += "Math.acosh(" + ahypcos +")";
            } else{
                var ahypcos = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-ahypcos.length);
                this.pantalla = "Math.acosh(" + ahypcos +")";
            }
        } else if(document.querySelector('input[type=button][name="deg"]').value == "DEG"){
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var ahypcos = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-ahypcos.length);
                var degrees = ahypcos * (Math.PI / 180);
                this.pantalla += "Math.acosh(" + degrees +")";
            } else{
                var ahypcos = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-ahypcos.length);
                var degrees = ahypcos * (Math.PI / 180);
                this.pantalla = "Math.acosh(" + degrees +")";
            }
        } else{
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var ahypcos = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-ahypcos.length);
                var gradians = ahypcos * Math.PI / 200;
                this.pantalla += "Math.acosh(" + gradians + ")";
            } else{
                var ahypcos = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-ahypcos.length);
                var gradians = ahypcos * Math.PI / 200;
                this.pantalla = "Math.acosh(" + gradians + ")";
            }
        }
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-ahypcos.length);
        document.querySelector('input[type=text]').value += "acosh(" + ahypcos + ")";
    }

    atanh(){
        if(document.querySelector('input[type=button][name="deg"]').value == "RAD"){
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var ahyptan = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-ahyptan.length);
                this.pantalla += "Math.atanh(" + ahyptan +")";
            } else{
                var ahyptan = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-ahyptan.length);
                this.pantalla = "Math.atanh(" + ahyptan +")";
            }
        } else if(document.querySelector('input[type=button][name="deg"]').value == "DEG"){
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var ahyptan = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-ahyptan.length);
                var degrees = ahyptan * (Math.PI / 180);
                this.pantalla += "Math.atanh(" + degrees +")";
            } else{
                var ahyptan = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-ahyptan.length);
                var degrees = ahyptan * (Math.PI / 180);
                this.pantalla = "Math.atanh(" + degrees +")";
            }
        } else{
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var ahyptan = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-ahyptan.length);
                var gradians = ahyptan * Math.PI / 200;
                this.pantalla += "Math.atanh(" + gradians + ")";
            } else{
                var ahyptan = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-ahyptan.length);
                var gradians = ahyptan * Math.PI / 200;
                this.pantalla = "Math.atanh(" + gradians + ")";
            }
        }
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-ahyptan.length);
        document.querySelector('input[type=text]').value += "cos(" + ahyptan + ")";
    }

    raiz(){
        //super.raiz();
        this.sqr = true;
        if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
            var result = this.pantalla.split(/[+-/*]/);
            result = result[result.length-1];
            if(result.includes("(")){
                result = result.slice(1,result.length);
            }
            var signo = this.pantalla.slice(-(result.length+1)).substring(0,1);
            document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-result.length);
            document.querySelector('input[type=text]').value += "√(" + result + ")";
            this.pantalla = this.pantalla.slice(0,-result.length-1);
            console.log(this.pantalla);
            //this.pantalla += this.pantalla.substring(0,this.pantalla.length-result.length-1) + signo + Math.sqrt(result);
            this.pantalla += signo + Math.sqrt(result);
        } else{
            document.querySelector('input[type=text]').value = "";
            document.querySelector('input[type=text]').value += "√(" + this.pantalla + ")";
            var numero = this.pantalla;
            this.pantalla = this.pantalla.slice(0,-this.pantalla.length-1);
            this.pantalla += Math.sqrt(numero);
        }
        console.log("Pantalla en raiz: " + this.pantalla);
    }

    potencia10(){
        if(this.pantalla.length == 0){
            this.pantalla += Math.pow(10,0);
        } else{
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var ultimo = result[result.length-1];
                this.pantalla = this.pantalla.slice(0,-ultimo.length);
                this.pantalla += Math.pow(10,ultimo);
            } else{
                var ultimo = this.pantalla;
                this.pantalla = this.pantalla.slice(0,-ultimo.length);
                this.pantalla += Math.pow(10,ultimo);
            }
        }
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-ultimo.length);
        document.querySelector('input[type=text]').value += Number(eval(this.pantalla));
    }

    log(){
        if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
            var result = this.pantalla.split(/[*/+-]/);
            var ultimo = result[result.length-1];
            this.pantalla = this.pantalla.slice(0,-ultimo.length);
            this.pantalla += Math.log10(ultimo);
        } else{
            var ultimo = this.pantalla;
            this.pantalla = this.pantalla.slice(0,-ultimo.length);
            this.pantalla += Math.log10(ultimo);
        }
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-ultimo.length);
        document.querySelector('input[type=text]').value += Number(eval(this.pantalla));
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
            var result = this.pantalla.split("%");
            var ultimo = result[result.length-1];

            var resultVisual = document.querySelector('input[type=text]').value.split(" Mod ");
            var ultimoVisual = resultVisual[resultVisual.length-1];

            this.pantalla = this.pantalla.slice(0,-ultimo.length);
            document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-ultimoVisual.length);
        } else if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
            var result = this.pantalla.split(/[*/+-]/);
            var ultimo = result[result.length-1];

            var resultVisual = document.querySelector('input[type=text]').value.split(/[*/+-]/);
            var ultimoVisual = resultVisual[resultVisual.length-1];

            this.pantalla = this.pantalla.slice(0,-ultimo.length);
            document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-ultimoVisual.length);
        } else{
            this.pantalla = "";
            document.querySelector('input[type=text]').value = 0;
        }
    }

    borrar(){
        super.borrar();
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-1);
        if(document.querySelector('input[type=text]').value == ""){
            document.querySelector('input[type=text]').value = 0;
            this.on = true;
        }
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
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var ultimo = result[result.length-1];
                if(ultimo.length > 1){
                    var primerNumero = ultimo.substring(0,1);
                    var restoNumero = ultimo.substring(1,ultimo.length);
                    document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-ultimo.length);
                    document.querySelector('input[type=text]').value += primerNumero + "," + restoNumero;
                    document.querySelector('input[type=text]').value += "e+" + restoNumero.length;
                } else{
                    document.querySelector('input[type=text]').value += ",e+0";
                }
            } else{
                var valor = document.querySelector('input[type=text]').value;
                if(valor.length > 1){
                    var primerNumero = valor.substring(0,1);
                    var restoNumero = valor.substring(1,valor.length);
                    document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-valor.length);
                    document.querySelector('input[type=text]').value += primerNumero + "," + restoNumero;
                    document.querySelector('input[type=text]').value += "e+" + restoNumero.length;
                } else{
                    document.querySelector('input[type=text]').value += ",e+0";
                }
            }
        }
        this.pantalla += "*";
        document.querySelector('input[type=text]').value += "*";
        if(this.pantalla.includes(",e+")){
            var numAnterior = this.pantalla.split(",");
            numAnterior = numAnterior[0];
            if(numAnterior.includes("+") || numAnterior.includes("-") || numAnterior.includes("/") || numAnterior.includes("*")){
                numAnterior = numAnterior.split(/[*/+-]/);
                numAnterior = numAnterior[numAnterior.length-1];
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
    }

    factorial(){
        if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
            var result = this.pantalla.split(/[*/+-]/);
            var n = result[result.length - 1];
            if(n.includes("(")){
                n = n.slice(1,n.length);
            }
        } else{
            var n = document.querySelector('input[type=text]').value;
            if(n.includes("(")){
                n = n.slice(1,n.length);
            }
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
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var ultimo = result[result.length-1];
                if(ultimo.length > 1){
                    var primerNumero = ultimo.substring(0,1);
                    var restoNumero = ultimo.substring(1,ultimo.length);
                    document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-ultimo.length);
                    document.querySelector('input[type=text]').value += primerNumero + "," + restoNumero;
                    document.querySelector('input[type=text]').value += "e+" + restoNumero.length;
                } else{
                    document.querySelector('input[type=text]').value += ",e+0";
                }
            } else{
                var valor = document.querySelector('input[type=text]').value;
                if(valor.length > 1){
                    var primerNumero = valor.substring(0,1);
                    var restoNumero = valor.substring(1,valor.length);
                    document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-valor.length);
                    document.querySelector('input[type=text]').value += primerNumero + "," + restoNumero;
                    document.querySelector('input[type=text]').value += "e+" + restoNumero.length;
                } else{
                    document.querySelector('input[type=text]').value += ",e+0";
                }
            }
        }
        this.pantalla += "-";
        document.querySelector('input[type=text]').value += "-";
        if(this.pantalla.includes(",e+")){
            var numAnterior = this.pantalla.split(",");
            numAnterior = numAnterior[0];
            if(numAnterior.includes("+") || numAnterior.includes("-") || numAnterior.includes("/") || numAnterior.includes("*")){
                numAnterior = numAnterior.split(/[*/+-]/);
                numAnterior = numAnterior[numAnterior.length-1];
            } 
            var numPosterior = this.pantalla.split(",e+");
            numPosterior = numPosterior[1].replace(/[*/+-]/,"");
            if(numPosterior == 0){
                this.pantalla = this.pantalla.replace(",e+0","");
            } else{
                var multiplicar = 10**numPosterior;
                this.pantalla = this.pantalla.replace(numAnterior + ",e+" + numPosterior,numAnterior*multiplicar);
            }
            //document.querySelector('input[type=text]').value = this.pantalla;
        }
    }

    cambiarSigno(){
        if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
            var result = this.pantalla.split(/[*/+-]/);
            var ultimo = result[result.length - 1];
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
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var ultimo = result[result.length-1];
                if(ultimo.length > 1){
                    var primerNumero = ultimo.substring(0,1);
                    var restoNumero = ultimo.substring(1,ultimo.length);
                    document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-ultimo.length);
                    document.querySelector('input[type=text]').value += primerNumero + "," + restoNumero;
                    document.querySelector('input[type=text]').value += "e+" + restoNumero.length;
                } else{
                    document.querySelector('input[type=text]').value += ",e+0";
                }
            } else{
                var valor = document.querySelector('input[type=text]').value;
                if(valor.length > 1){
                    var primerNumero = valor.substring(0,1);
                    var restoNumero = valor.substring(1,valor.length);
                    document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-valor.length);
                    document.querySelector('input[type=text]').value += primerNumero + "," + restoNumero;
                    document.querySelector('input[type=text]').value += "e+" + restoNumero.length;
                } else{
                    document.querySelector('input[type=text]').value += ",e+0";
                }
            }
        }
        this.pantalla += "+";
        document.querySelector('input[type=text]').value += "+";
        if(this.pantalla.includes(",e+")){
            var numAnterior = this.pantalla.split(",");
            numAnterior = numAnterior[0];
            if(numAnterior.includes("+") || numAnterior.includes("-") || numAnterior.includes("/") || numAnterior.includes("*")){
                numAnterior = numAnterior.split(/[*/+-]/);
                numAnterior = numAnterior[numAnterior.length-1];
            } 
            var numPosterior = this.pantalla.split(",e+");
            numPosterior = numPosterior[1].replace(/[*/+-]/,"");
            if(numPosterior == 0){
                this.pantalla = this.pantalla.replace(",e+0","");
            } else{
                var multiplicar = 10**numPosterior;
                this.pantalla = this.pantalla.replace(numAnterior + ",e+" + numPosterior,numAnterior*multiplicar);
            }
            //document.querySelector('input[type=text]').value = this.pantalla;
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
            if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                var result = this.pantalla.split(/[*/+-]/);
                var ultimo = result[result.length-1];
                if(ultimo.length > 1){
                    var primerNumero = ultimo.substring(0,1);
                    var restoNumero = ultimo.substring(1,ultimo.length);
                    document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-ultimo.length);
                    document.querySelector('input[type=text]').value += primerNumero + "," + restoNumero;
                    document.querySelector('input[type=text]').value += "e+" + restoNumero.length;
                } else{
                    document.querySelector('input[type=text]').value += ",e+0";
                }
            } else{
                var valor = document.querySelector('input[type=text]').value;
                if(valor.length > 1){
                    var primerNumero = valor.substring(0,1);
                    var restoNumero = valor.substring(1,valor.length);
                    document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-valor.length);
                    document.querySelector('input[type=text]').value += primerNumero + "," + restoNumero;
                    document.querySelector('input[type=text]').value += "e+" + restoNumero.length;
                } else{
                    document.querySelector('input[type=text]').value += ",e+0";
                }
            }
        }
        this.pantalla += "/";
        document.querySelector('input[type=text]').value += "/";
        if(this.pantalla.includes(",e+")){
            var numAnterior = this.pantalla.split(",");
            numAnterior = numAnterior[0];
            if(numAnterior.includes("+") || numAnterior.includes("-") || numAnterior.includes("/") || numAnterior.includes("*")){
                numAnterior = numAnterior.split(/[*/+-]/);
                numAnterior = numAnterior[numAnterior.length-1];
            } 
            var numPosterior = this.pantalla.split(",e+");
            numPosterior = numPosterior[1].replace(/[*/+-]/,"");
            if(numPosterior == 0){
                this.pantalla = this.pantalla.replace(",e+0","");
            } else{
                var multiplicar = 10**numPosterior;
                this.pantalla = this.pantalla.replace(numAnterior + ",e+" + numPosterior,numAnterior*multiplicar);
            }
            //document.querySelector('input[type=text]').value = this.pantalla;
        }
    }

    igual(){
        console.log("Pantalla en igual: " + this.pantalla);
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
            if(numAnterior.includes("+") || numAnterior.includes("-") || numAnterior.includes("/") || numAnterior.includes("*")){
                numAnterior = numAnterior.split(/[*/+-]/);
                numAnterior = numAnterior[numAnterior.length-1];
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
    }
}

var calculadora = new CalculadoraCientifica();