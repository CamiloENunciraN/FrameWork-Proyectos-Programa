validarSesion();

/************ validar que la sesion este activa ***************/
function validarSesion(){
  var sesion=localStorage.getItem('sesion');
  if(sesion!='Activa'){
    location.href='../../index.html';
  }
}
/******************** salir de administrador ****************/
document.getElementById("login_salir").onclick = function() {

var id=localStorage.getItem('Id');
var url = 'http://localhost:3000/cerrarSesion';
var data = { "id": id};

    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.sesion==='Inactiva'){
          localStorage.clear();
          location.href='../../index.html';
        }
    });
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
/********************* funcion carga de formularios **************************/

function abrirModal(direccion){
    var modal = document.getElementById("modal_formulario");
    var frame = document.getElementById("formulario");
    frame.className=direccion;/*cambio la clase del frame para darle el stilo css para cada form*/
    frame.src=direccion+".html";/*le agrego html para que la direccion este completa*/
    modal.showModal();
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
/********************** Abre las noticias ************************/
document.getElementById("noticias").onclick = function() {
  location.href='src/html/formNoticias.html';
};