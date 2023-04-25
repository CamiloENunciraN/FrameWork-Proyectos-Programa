
/******************** salir de administrador ****************/
document.getElementById("login_salir").onclick = function() {
    location.href='../index.html';
};

/************************* Agregar **************************/
document.getElementById("AgregarTipoProyecto").onclick = function() {
abrirModal('formRegistrarTipoProyecto');
};
document.getElementById("AgregarProyecto").onclick = function() {
abrirModal('formRegistrarProyecto');
};
document.getElementById("AgregarNoticia").onclick = function() {
abrirModal('formRegistrarNoticia');
};
/************************** Redes ************************/
document.getElementById("facebook").onclick = function() {
  window.open('https://facebook.com');
};
document.getElementById("twitter").onclick = function() {
  window.open('https://twitter.com');
};
document.getElementById("instagram").onclick = function() {
  window.open('https://instagram.com');
};
document.getElementById("youtube").onclick = function() {
  window.open('https://youtube.com');
};
/********************* cerrar modal ***********************/
document.getElementById("cerrarModal").onclick = function() {
  var modal = document.getElementById("modal_formulario");
   modal.close();
};
/********************* funciones **************************/

function abrirModal(direccion){
    var modal = document.getElementById("modal_formulario");
    var frame = document.getElementById("formulario");
    frame.className=direccion;/*cambio la clase del frame para darle el stilo css para cada form*/
    frame.src=direccion+".html";/*le agrego html para que la direccion este completa*/
    modal.showModal();
}
