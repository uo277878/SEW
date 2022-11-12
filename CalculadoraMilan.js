class Calculadora{

    constructor(){
        this.pantalla = "";
        this.mem = 0;
        this.sqr = false;
        this.equal = false;
        this.raizValor = "";
        this.porc = false;
        this.porcValor = "";
        this.on = true;
    }

    digitos(num){
        this.equal = 0;
        if(this.on == true){
            document.querySelector('input[type=text]').value = "";
            this.on = false;
        }
        if(this.sqr == true){
            document.querySelector('input[type=text]').value += Number(num);
            this.pantalla += "*";
            this.pantalla += Number(num);
            this.sqr = false;
        } else{
            document.querySelector('input[type=text]').value += Number(num);
            this.pantalla += Number(num);
        }
        console.log("Pantalla: " + this.pantalla);
    }

    punto(){
        this.sqr = false;
        document.querySelector('input[type=text]').value += ".";
        this.pantalla += ".";
    }

    suma(){
        this.sqr = false;
        document.querySelector('input[type=text]').value += "+";
        this.pantalla += "+";
        this.equal = false;
    }

    resta(){
        this.sqr = false;
        document.querySelector('input[type=text]').value += "-";
        this.pantalla += "-";
        this.equal = false;
    }

    multiplicacion(){
        this.sqr = false;
        document.querySelector('input[type=text]').value += "*";
        this.pantalla += "*";
        this.equal = false;
    }

    division(){
        this.sqr = false;
        document.querySelector('input[type=text]').value += "/";
        this.pantalla += "/";
        this.equal = false;
    }

    mrc(){
        document.querySelector('input[type=text]').value = this.mem;
    }

    mMenos(){
        this.pantalla = this.mem + "-" + document.querySelector('input[type=text]').value;
        this.mem = eval(this.pantalla);
    }

    mMas(){
        this.pantalla = this.mem + "+" + document.querySelector('input[type=text]').value;
        this.mem = eval(this.pantalla);
    }

    borrar(){
        this.pantalla = this.pantalla.toString().slice(0,-1);
        document.querySelector('input[type=text]').value = document.querySelector('input[type=text]').value.slice(0,-1);        
    }

    borrarTodo(){
        document.querySelector('input[type=text]').value = "";
        this.pantalla = "";
        this.sqr = false;
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
            document.querySelector('input[type=text]').value = eval(pantalla + signo + pc);
        }
        else if(this.pantalla.includes("+") || this.pantalla.includes("-")){
            var result = this.pantalla.split(/[+-]/);
            var operando = result[result.length-1];
            var pantalla = this.pantalla.substring(0, this.pantalla.length-(operando.length+1));
            var signo = this.pantalla.slice(-(operando.length+1)).substring(0,1);
            var previo = eval(pantalla);
            var pc = previo*operando/100;
            var resultado = previo + signo + pc;
            document.querySelector('input[type=text]').value = eval(resultado);
        } else{
            //Un solo número
            document.querySelector('input[type=text]').value = (this.pantalla / 100);
        }
        this.pantalla = document.querySelector('input[type=text]').value;
    }

    raiz(){
        this.sqr = true;
        if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
            var result = this.pantalla.split(/[+-/*]/);
            result = result[result.length-1];
            var signo = this.pantalla.slice(-(result.length+1)).substring(0,1);
            //document.querySelector('input[type=text]').value += "√";
            this.raizValor = eval(result**(1/2));
            this.pantalla = this.pantalla.substring(0,this.pantalla.length-result.length-1) + signo + this.raizValor;
        } else{
            //document.querySelector('input[type=text]').value += "√";
            console.log("Else raiz");
            this.raizValor = eval(this.pantalla**(1/2));
            this.pantalla = this.raizValor.toString();

            console.log(this.raizValor);
        }
        document.querySelector('input[type=text]').value += "√";
        //document.querySelector('input[type=text]').value = this.raizValor;
    }

    cambiarSigno(){
        document.querySelector('input[type=text]').value *= (-1);
        this.pantalla = document.querySelector('input[type=text]').value;
    }

    igual(){
        console.log("Pantalla en igual: " + this.pantalla);
        try{
            console.log("Pantalla en try: " + this.pantalla);
            console.log("sqr" + this.sqr);
            if(this.pantalla.includes("+") && this.equal == true){
                console.log("Primer if");
                var result = this.pantalla.split("+");
                result[0] = eval(document.querySelector('input[type=text]').value);
                this.pantalla = result[0] + "+" + result[1];
                document.querySelector('input[type=text]').value = eval(this.pantalla);

            } else if(this.pantalla.includes("-") && this.equal == true){
                console.log("Segundo if");
                var result = this.pantalla.split("-");
                result[0] = eval(document.querySelector('input[type=text]').value);
                this.pantalla = result[0] + "-" + result[1];
                document.querySelector('input[type=text]').value = eval(this.pantalla);

            } else if(this.pantalla.includes("*") && this.pantalla.slice(-1) == "*"){
                console.log("Tercero if");
                var result = this.pantalla.split("*");
                this.pantalla += result[0];
                document.querySelector('input[type=text]').value = eval(this.pantalla);
                
            } else if(this.pantalla.includes("*") && this.equal == true){
                console.log("Cuarto if");
                result = this.pantalla.split("*");
                result[0] = eval(this.pantalla);
                this.pantalla = result[0] + "*" + result[1];
                document.querySelector('input[type=text]').value = eval(this.pantalla);

            } else if(this.pantalla.includes("/") && this.pantalla.slice(-1) == "/"){
                console.log("Quinto if");
                var result = this.pantalla.split("/");
                this.pantalla += result[0];
                document.querySelector('input[type=text]').value = eval(this.pantalla);
                
            } else if(this.pantalla.includes("/") && this.equal == true){
                console.log("Sexto if");
                result = this.pantalla.split("/");
                result[0] = eval(this.pantalla);
                this.pantalla = result[0] + "/" + result[1];
                document.querySelector('input[type=text]').value = eval(this.pantalla);
            } else {
                console.log("Else: " + this.pantalla);
                if(this.sqr == true){
                    if(this.pantalla.includes("+") || this.pantalla.includes("-") || this.pantalla.includes("*") || this.pantalla.includes("/")){
                        document.querySelector('input[type=text]').value = eval(this.pantalla);
                        this.pantalla = document.querySelector('input[type=text]').value;
                        this.sqr = false;
                    } else{
                        document.querySelector('input[type=text]').value = this.pantalla;
                        this.pantalla = document.querySelector('input[type=text]').value;
                        this.sqr = false;
                    }
                } else{
                    document.querySelector('input[type=text]').value = eval(this.pantalla);
                    //this.pantalla = document.querySelector('input[type=text]').value;
                }
            }
            this.equal = true;
        } catch(error){
            console.log(error);
            document.querySelector('input[type=text]').value = "Error";
        }
    }
}

var calculadora = new Calculadora();

document.addEventListener('keydown', (event) => {
    if(event.key === 'c'){
        calculadora.borrarTodo();
    }
    if(event.key === 'Delete' || event.key === "Backspace"){
        calculadora.borrar();
    }
    if(event.key === 's'){
        calculadora.cambiarSigno();
    }
    if(event.key === 'r'){
        calculadora.raiz();
    }
    if(event.key === 'p'){
        calculadora.porcentaje();
    }
    if (event.key === '*') {
        calculadora.multiplicacion();
    }
    if (event.key === '/') {
        calculadora.division();
    }
    if (event.key === '-') {
        calculadora.resta();
    }
    if(event.key === '+'){
        calculadora.suma();
    }
    if (event.key === 'm') {
        calculadora.mrc();
    }
    if (event.key === 'n') {
        calculadora.mMenos();
    }
    if (event.key === 'a') {
        calculadora.mMas();
    }
    if(event.key >= '0' && event.key <= '9'){
        calculadora.digitos(Number(event.key));
    }
    if (event.key === '.') {
        calculadora.punto();
    }
    if (event.key === 'Enter') {
        calculadora.igual();
    }
  });