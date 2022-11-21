class CalculadoraRPN{

    constructor(){
        this.pila = new Array();
        this.pantalla = "";
        this.puntoPulsado = false;
		document.querySelector('textarea').value = "";
        document.addEventListener("keydown", (event) => {
            this.tecla(event.key, event);
        });
    }

    tecla(key, evento){
        if(key === 'c' || key === 'C'){
            this.borrar();
        }
        if(key === 's' || key === 'S'){
            this.sin();
        }
        if(key === 'o' || key === 'O'){
            this.cos();
        }
        if(key === 't' || key === 'T'){
            this.tan();
        }
        if(key === 'i' || key === 'I'){
            this.asin();
        }
        if(key === 'a' || key === 'A'){
            this.acos();
        }
        if(key === 'n' || key === 'N'){
            this.atan();
        }
        if (key === 'x') {
            this.multiplicacion();
        }
        if (key === 'v') {
            this.division();
        }
        if (key === '-') {
            this.resta();
        }
        if(key === '+'){
            this.suma();
        }
        if(key >= '0' && key <= '9'){
            this.digitos(Number(key));
        }
        if (key === '.') {
            this.punto();
        }
        if (key === 'Enter') {
            evento.preventDefault();
            this.enter();
        }
    }

    digitos(num){
        this.pantalla += Number(num);
        this.puntoPulsado = false;
    }

    punto(){
        if(!this.puntoPulsado){
            this.pantalla += ".";
            this.puntoPulsado = true;
        }
    }

    suma(){
        if(this.pila.length >= 2){
            this.pila.push(Number(this.pila.pop()) + Number(this.pila.pop()));
        }
        this.puntoPulsado = false;
        document.querySelector('textarea').value = this.mostrar();
    }

    resta(){
        if(this.pila.length >= 2){
            this.pila.push(Number(this.pila.pop()) - Number(this.pila.pop()));
        }
        this.puntoPulsado = false;
        document.querySelector('textarea').value = this.mostrar();
    }

    multiplicacion(){
        if(this.pila.length >= 2){
            this.pila.push(Number(this.pila.pop()) * Number(this.pila.pop()));
        }
        this.puntoPulsado = false;
        document.querySelector('textarea').value = this.mostrar();
    }

    division(){
        if(this.pila.length >= 2){
            this.pila.push(Number(this.pila.pop()) / Number(this.pila.pop()));
        }
        this.puntoPulsado = false;
        document.querySelector('textarea').value = this.mostrar();
    }

    sin(){
        if(this.pila.length >= 1){
            this.pila.push(Math.sin(Number(this.pila.pop())).toFixed(5));
        }
        this.puntoPulsado = false;
        document.querySelector('textarea').value = this.mostrar();
    }

    cos(){
        if(this.pila.length >= 1){
            this.pila.push(Math.cos(Number(this.pila.pop())).toFixed(5));
        }
        this.puntoPulsado = false;
        document.querySelector('textarea').value = this.mostrar();
    }

    tan(){
        if(this.pila.length >= 1){
            this.pila.push(Math.tan(Number(this.pila.pop())).toFixed(5));
        }
        this.puntoPulsado = false;
        document.querySelector('textarea').value = this.mostrar();
    }

    asin(){
        if(this.pila.length >= 1){
            this.pila.push(Math.asin(Number(this.pila.pop())).toFixed(5));
        }
        this.puntoPulsado = false;
        document.querySelector('textarea').value = this.mostrar();
    }

    acos(){
        if(this.pila.length >= 1){
            this.pila.push(Math.acos(Number(this.pila.pop())).toFixed(5));
        }
        this.puntoPulsado = false;
        document.querySelector('textarea').value = this.mostrar();
    }

    atan(){
        if(this.pila.length >= 1){
            this.pila.push(Math.atan(Number(this.pila.pop())).toFixed(5));
        }
        this.puntoPulsado = false;
        document.querySelector('textarea').value = this.mostrar();
    }

    borrar(){   
        for(var i = 0; i <= this.pila.length; i++){
            this.pila.pop();
        }
        document.querySelector('textarea').value = "";
        this.pantalla = "";
    }

    enter(){
        var numero = this.pantalla;
		if(numero != ""){
            this.pila.push(numero);
        }
        this.pantalla = "";
        document.querySelector('textarea').value = this.mostrar();
    }

    mostrar(){
        var mostrar = ""
        var size = this.pila.length;
        for(var i = size-1; i >= 0; i--){
            mostrar += i + ":\t\t" + this.pila[i] +"\n"
        }
        return mostrar;
    }
}

class CalculadoraEspecializada extends CalculadoraRPN{
    constructor(){
        super();
        this.yaCalculado = false;
        this.precioKw = 0.15;
    }

    tecla(key, evento){
        super.tecla(key,evento);
        if(key === 'y' || key === 'Y'){
            this.tv();
        }
        if(key === 'r' || key === 'R'){
            this.aspiradora();
        }
        if(key === 'e' || key === 'E'){
            this.nevera();
        }
        if(key === 'p' || key === 'P'){
            this.pc();
        }
        if(key === 'h' || key === 'H'){
            this.horno();
        }
        if(key === 'l' || key === 'L'){
            this.lavadora();
        }
        if(key === 'j' || key === 'J'){
            this.lavavajillas();
        }
        if(key === 'g' || key === 'G'){
            this.consola();
        }
    }


    tv(){
        if(!this.yaCalculado){
            this.yaCalculado = true;
            let kWTv = 0.07;
            this.pila.push(kWTv);
            this.multiplicacion();
            this.pila.push(this.precioKw);
            this.multiplicacion();
            document.querySelector('textarea').value = this.mostrar();
        }
    }

    aspiradora(){
        if(!this.yaCalculado){
            this.yaCalculado = true;
            let kWAspiradora = 0.5;
            this.pila.push(kWAspiradora);
            this.multiplicacion();
            this.pila.push(this.precioKw);
            this.multiplicacion();
            document.querySelector('textarea').value = this.mostrar();
        }
    }

    nevera(){
        if(!this.yaCalculado){
            this.yaCalculado = true;
            let kWNevera = 0.2;
            this.pila.push(kWNevera);
            this.multiplicacion();
            this.pila.push(this.precioKw);
            this.multiplicacion();
            document.querySelector('textarea').value = this.mostrar();
        }
    }

    pc(){
        if(!this.yaCalculado){
            this.yaCalculado = true;
            let kWPc = 0.1;
            this.pila.push(kWPc);
            this.multiplicacion();
            this.pila.push(this.precioKw);
            this.multiplicacion();
            document.querySelector('textarea').value = this.mostrar();
        }
        
    }

    horno(){
        if(!this.yaCalculado){
            this.yaCalculado = true;
            let kwHorno = 0.85;
            this.pila.push(kwHorno);
            this.multiplicacion();
            this.pila.push(this.precioKw);
            this.multiplicacion();
            document.querySelector('textarea').value = this.mostrar();
        }
    }

    lavadora(){
        if(!this.yaCalculado){
            this.yaCalculado = true;
            let kwLavadora = 0.6;
            this.pila.push(kwLavadora);
            this.multiplicacion();
            this.pila.push(this.precioKw);
            this.multiplicacion();
            document.querySelector('textarea').value = this.mostrar();
        }
    }

    lavavajillas(){
        if(!this.yaCalculado){
            this.yaCalculado = true;
            let kwLavavajillas = 0.4;
            this.pila.push(kwLavavajillas);
            this.multiplicacion();
            this.pila.push(this.precioKw);
            this.multiplicacion();
            document.querySelector('textarea').value = this.mostrar();
        }
    }

    consola(){
        if(!this.yaCalculado){
            this.yaCalculado = true;
            let kwConsola = 0.1;
            this.pila.push(kwConsola);
            this.multiplicacion();
            this.pila.push(this.precioKw);
            this.multiplicacion();
            document.querySelector('textarea').value = this.mostrar();
        }
    }

    multiplicacion(){
        if(this.pila.length >= 2){
            this.pila.push(Number(this.pila.pop()) * Number(this.pila.pop()));
        }
        this.puntoPulsado = false;
    }

    enter(){
        if(!this.pantalla.includes("€")){
            var numero = Number(this.pantalla);
        } else{
            var numero = Number(this.pantalla.replace("€",""));
        }
        if(numero > 24){
            numero = 24;
        }
        this.pila.push(numero);
        this.pantalla = "";
        this.yaCalculado = false;
        document.querySelector('textarea').value = this.mostrar();
    }

    mostrar(){
        var mostrar = "";
        var size = this.pila.length;
        for(var i = size-1; i >= 0; i--){
            if(this.yaCalculado){
                mostrar += (i+1) + ":\t\t" + Number(this.pila[i]).toFixed(3);
            } else{
                if(i != size-1){
                    mostrar += (i+1) + ":\t\t" + Number(this.pila[i]).toFixed(3);
                } else{
                    mostrar += (i+1) + ":\t\t" + this.pila[i];
                }
            }
            
            if(!this.yaCalculado){
                if(i == size-1){
                    mostrar += "h/día\n";
                } else{
                    mostrar += "€\n";
                }
            } else {
                mostrar += "€\n";
            } 
        }
        return mostrar;
    }
}

var calculadora = new CalculadoraEspecializada();