
/***********  mostrar u oocultar login  ****************/
document.getElementById("login").onclick = function() {
  var modal = document.getElementById("modal_formulario");
  modal.showModal();
};
document.getElementById("cerrarModal").onclick = function() {
  var modal = document.getElementById("modal_formulario");
   modal.close();
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
    alert("ingrese correo");
  }else if(validarEmail(correo)=="incorrecto"){
    alert("correo no valido");
  }else if(contra==""){
    alert("ingrese contraseña");
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
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
    
  //location.href='html/manage.html';
}
};

/******************* funcion que valida la estructura de un correo ************************/
function validarEmail(valor) {
  if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)){
   return "corecto";
  } else {
   return "incorrecto";
  }
}
/**************************funcion para ultimas noticias********************************************/
getUltimasNoticias();

function geUltimasNoticias(){
  fetch('http://localhost:3000/UltimasNoticias')
  .then(response => response.json())
  .then(data => {
    console.log(data);
        if(data[0].Imagen===null){
      data[0].Imagen="../iconos/Mal.png";
    }
  });
  //.then(data => console.log(data));
}

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
      cadenaHTML+= ' <div class="UNoticia" id="'+data[i].IdNoticia+'">'+
                   '<h1 class="UNoticia_titulo">'+data[i].Nombre+'</h1>'+
                   '<a class="UNoticia_fecha" >'+data[i].Fecha+'</a>'+
                   '<img class="UNoticia_imagen" src="'+data[i].Imagen+'"></div>';
    }

    div.innerHTML=cadenaHTML;
  });
}
