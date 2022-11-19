class CalculadoraRPN{

    constructor(){
        this.pila = new Array();
        this.pantalla = "";
        this.puntoPulsado = false;
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

var calculadora = new CalculadoraRPN();