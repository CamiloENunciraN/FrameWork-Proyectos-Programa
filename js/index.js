
function cerrarLogin(){
  var modal = document.getElementById("ventana_Login");
   modal.close();
}

function abrirLogin(){
  var modal = document.getElementById("ventana_Login");
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
location.href='html/manage.html';
}

