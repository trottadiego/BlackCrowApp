//const shell = require('electron');
var app = require('electron').remote; 
var dialog = app.dialog;
var fs = require('fs');
import Sortable from 'sortablejs';

// aca va el codigo psra configurar la ventana donde va la app
class Base{

    constructor(){
        this.mensajeError = document.querySelector('.mensaje-error');
        this.formularioComando = document.querySelector('.creacion-boton-formulario');
        this.comando = document.querySelector('.creacion-boton-comando');
        this.botonCrear = document.querySelector('.creacion-boton-crear');
        this.botonardo = document.querySelector('.botonardo');
        this.eliminarBoton = document.querySelector('.eliminar-boton');
        this.seleccionDispositivo = document.querySelector('.seleccion-dispositivo');
        this.boton1 = document.querySelector('#boton1');
        

        this.parser = new DOMParser();

        this.agregarEventListeners();
    }

    

    agregarEventListeners(){
        // this.comando.addEventListener('keyup', ()=>{
        //     this.botonCrear.disabled = false;
        // });

        this.botonCrear.addEventListener('submit', this.crearComando.bind(this))
        this.seleccionDispositivo.addEventListener('click', this.seleccionarCarpeta)
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

    seleccionarCarpeta = async function(){
        let path = await dialog.showOpenDialog({
            title:"Select a folder",
            properties: ["openDirectory"]
        });

        console.log(path.filePaths)
    }

    leerContenido(){
        console.log('hola looocooooooooo');
        dialog.showOpenDialog((fileNames) => {
            console.log('hola looocooooooooo');
            // fileNames is an array that contains all the selected
            if(fileNames === undefined){
                console.log("No file selected");
                return;
            }
        
            fs.readFile(filepath, 'utf-8', (err, data) => {
                if(err){
                    alert("An error ocurred reading the file :" + err.message);
                    return;
                }
        
                // Change how to handle the file content
                console.log("The file content is : " + data);
            });
        });
    }
}

let base = new Base();