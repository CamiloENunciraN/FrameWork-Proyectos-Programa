
function cerrarLogin(){
  var modal = document.getElementById("ventanaLogin");
   modal.close();
}

function abrirLogin(){
  var modal = document.getElementById("ventanaLogin");
  modal.showModal();
}

//al dar en ingresar del login
 function ingresarLogin() {

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

