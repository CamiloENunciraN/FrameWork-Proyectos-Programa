


function salir(){
location.href='../index.html';
}


function abrirModal(direccion){
    var modal = document.getElementById("modal_formulario");
    var frame = document.getElementById("formulario");
    frame.className=direccion;/*cambio la clase del frame para darle el stilo css para cada form*/
    frame.src=direccion+".html";/*le agrego html para que la direccion este completa*/
    modal.showModal();
}

function cerrarModal(){
    var modal = document.getElementById("modal_formulario");
    modal.close();
}

