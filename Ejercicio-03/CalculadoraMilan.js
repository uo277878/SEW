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
        this.raizValor = Number(eval(pantalla**(1/2)));
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
                }
            }
            this.equal = true;
        } catch(error){
            document.querySelector('input[type=text]').value = "Error";
        }
    }
}

var calculadora = new CalculadoraMilan();