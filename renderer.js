//const shell = require('electron');

// aca va el codigo psra configurar la ventana donde va la app
class Botones{
    constructor(){
        this.mensajeError = document.querySelector('.mensaje-error');
        this.formularioComando = document.querySelector('.creacion-boton-formulario');
        this.comando = document.querySelector('.creacion-boton-comando');
        this.botonCrear = document.querySelector('.creacion-boton-crear');
        this.botones = document.querySelector('.botones');
        this.eliminarBoton = document.querySelector('.eliminar-boton');

        this.parser = new DOMParser();

        this.agregarEventListeners();
    }

    agregarEventListeners(){
        this.comando.addEventListener('keyup', ()=>{
            this.botonCrear.disabled = false;
        });

        this.botonCrear.addEventListener('submit', this.crearComando.bind(this))
    }

    crearComando(evento){
        evento.preventDefault();

        const command = this.comando.value;

        almacenarComando(command)
        .then(this.limpiarFormulario)
        .then(this.cargarComando)
        .catch(error => this.reportarError(error))
    }

    almacenarComando(command){
        localStorage.setItem(command, JSON.stringify({comando: command}));
    }

    limpiarFormulario(){
        this.comando.value = null;
    }

    obtenerComando(){
        return Object.keys(localStorage).map(k => JSON.parse(localStorage.getItem(k)));
    }

    generarHtmlBoton(nombre, comando){
        return `<div class="botonBox"><h3>${nombre}</h3>
        <p>${command.command}</p></div>`;
    }

    cargarComando(){
        let comando = this.obtenerComando();

        let html = commands.map(this.generarHtmlBoton()).join('');

        this.mensajeError.innerHTML = html;
    }

    reportarError(error){
        this.mensajeError.innerHTML =  `Error ${error}`;

        setTimeout(() => {
            this.mensajeError.innerHTML = null;
        }, 5000);
    }
}

new Botones();