

function salir(){
location.href='../index.html';
}

//al dar en ingresar del login
 function registrarNoticia() {

let correo=document.getElementById('correo').value;
let contra=document.getElementById('contrasena').value;

//validacion de los datos
if(correo==""){
  alert("ingrese correo");
}else if(contra==""){
  alert("ingrese contraseña");
}else{

}
}

function AgregarNoticia(){
    var modal = document.getElementById("formularioAgregarNoticia");
  modal.showModal();
}

function cerrarNoticia(){
    var modal = document.getElementById("formularioAgregarNoticia");
  modal.close();
}
function abrirTipoProyecto(){
    var modal = document.getElementById("formularioAgregarTipoProyecto");
  modal.showModal();
}

function cerrarTipoProyecto(){
    var modal = document.getElementById("formularioAgregarTipoProyecto");
  modal.close();
}

