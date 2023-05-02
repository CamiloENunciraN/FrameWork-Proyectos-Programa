getUltimasNoticias();

/********************** Abre las noticias ************************/
document.getElementById("noticias").onclick = function() {
  location.href='src/html/formNoticias.html';
};
/***********  mostrar u oocultar login  ****************/
document.getElementById("login").onclick = function() {
  var modal = document.getElementById("modal_formulario");
  modal.showModal();
};
document.getElementById("cerrarModal").onclick = function() {
  var modal = document.getElementById("modal_formulario");
   modal.close();
   let span=document.getElementById('notificacion_login');
   span.innerHTML="";
    let correo=document.getElementById('correo');
    correo.value="";
    let contra=document.getElementById('contrasena');
    contra.value="";
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
/******************* ingresar a administrador **************/
document.getElementById("entrar").onclick = function() {

  let correo=document.getElementById('correo').value;
  let contra=document.getElementById('contrasena').value;

  //validacion de los datos
  if(correo==""){
    notificarLogin("Ingrese un correo");
  }else if(validarEmail(correo)=="incorrecto"){
    notificarLogin("El correo no es valido");
  }else if(contra==""){
    notificarLogin("Ingrese la contraseña");
  }else{

    var url = 'http://localhost:3000/iniciarSesion';
    var data = {    email: correo,
                    contrasena: contra };

    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => {

        if(data.sesion==='Activa'){
          localStorage.setItem('Id', data.Id);
          localStorage.setItem('sesion', data.sesion);
          location.href='src/html/manage.html';
        }
    });

}
};
/******************** muestra los mensajes de error **********************/
function notificarLogin(mensaje){
     let span=document.getElementById('notificacion_login');
     span.innerHTML="<a>"+mensaje+"</a>";
     span.style.backgroundColor = 'darkred';
     span.style.color = 'white';
}

/******************* funcion que valida la estructura de un correo ************************/
function validarEmail(valor) {
  if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)){
   return "corecto";
  } else {
   return "incorrecto";
  }
}
/**************************funcion para ultimas noticias********************************************/

function getUltimasNoticias(){
  fetch('http://localhost:3000/UltimasNoticias')
  .then(response => response.json())
  .then(data => {

    let cadenaHTML="";
    let div=document.getElementById('noticias_panel_carrusel');

    //concadenacion de los elementos del json
    for(let i=0;i<data.length;i++){
    //si no hay imagen coloco una por defecto
    if(data[i].Imagen===null){
      data[i].Imagen="https://previews.123rf.com/images/rglinsky/rglinsky1201/rglinsky120100188/12336990-vertical-de-la-imagen-orientada-a-la-famosa-torre-eiffel-en-par%C3%ADs-francia.jpg";
    }
    var id= 6+i;
      cadenaHTML+= 
                    ' <div class="UNoticia" >'+
                    '<div class="UNoticia_fecha" >'+
                    '<a >'+data[i].Fecha+'</a>'+
                    '</div>'+
                    '<div class="UNoticia_titulo">'+
                      '<h1>'+data[i].Nombre+'</h1>'+
                    '</div>'+
                    '<div  class="UNoticia_imagen" > '+
                     '<img src="'+data[i].Imagen+'" onclick="verImagenAumentada('+id+')" id="'+id+'">'+
                    '</div>'+
                    '</div>';
    }

    div.innerHTML=cadenaHTML;
  });
}

/***********  abrir u ocultar imagen Aumentada ****************/
document.getElementById("imagen_aumentada_div_cerrar").onclick = function() {
  var modal = document.getElementById("imagen_aumentada");
   modal.close();
};

function verImagenAumentada(id){
  var imagen = document.getElementById(id);
  var imagenAumentada = document.getElementById("imagen_aumentada_div_grande");
  var modal = document.getElementById("imagen_aumentada");
  imagenAumentada.src = imagen.src;
  modal.showModal();
}