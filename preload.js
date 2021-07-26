function establecerVersion(idSelector, texto){
    let elemento = document.getElementById(idSelector);

    if(elemento){
        elemento.innerText = texto;
    }
}

window.addEventListener('DOMContentLoaded', ()=> {
    const componentes = ['boton1', 'boton2', 'boton3'];

    for (const componente of componentes) {
     // establecerVersion(`alala:${componentes}`, process.version);
        establecerVersion(componente,"1");
    }
});