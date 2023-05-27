//const ruta="https://framework-proyectos-programa-production.up.railway.app";
const ruta="http://localhost:3000";
cargarNoticiasActuales();
cargarNoticiasAnteriores();
validarSesion();

/************ validar que la sesion este activa ***************/
function validarSesion(){
  var sesion=localStorage.getItem('sesion');
  if(sesion!='Activa'){
    location.href='../../index.html';
  }else{
    //guarda en un span la id del administrador
    var span=document.getElementById('id_administrador');
    var administrador=localStorage.getItem('Id');
    span.value=administrador;
  }

}
/******************** volver a inicio****************************/
document.getElementById("inicio").onclick = function() {
  location.href='./manage.html';
};
document.getElementById("titulo").onclick = function() {
  location.href='./manage.html';
};
/***********  abrir u ocultar imagen  ****************/
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
/********************carga de noticias actuales****************************/
function cargarNoticiasActuales(){
  fetch(ruta+'/NoticiasActuales')
  .then(response => response.json())
  .then(data => {

    let cadenaHTML="";
    let div=document.getElementById('noticias_panel_actuales');

    //concadenacion de los elementos del json
    for(let i=0;i<data.length;i++){
    //si no hay imagen coloco una por defecto
    if(data[i].Imagen===null||data[i].Imagen===""){
      data[i].Imagen="../iconos/Mal.png";
    }
    var mostrarMas ="";
    if(data[i].Enlace!==null||data[i].Enlace!==""){
      mostrarMas='<a href="'+data[i].Enlace+'" target="_blank"> ▶ Mas informacion click aqui ...</a>';
    }
      cadenaHTML+=
          '<div class="noticia">'+
          '<div class="noticia_panel_imagen">'+
            '<img class="noticia_imagen" onclick="verImagenAumentada('+data[i].IdNoticia+
            ')" id="'+data[i].IdNoticia+'" src="'+data[i].Imagen+'">'+
          '</div>'+
          '<div class="noticia_datos">'+
            '<div class="noticia_contenedor_titulo">'+
              '<div class="noticia_titulo">'+
                '<h1 >'+data[i].Nombre+'</h1>'+
              '</div>'+
              '<div class="noticia_titulo_botones">'+
                '<input type="image" src="../iconos/Editar.png" title="Modificar Noticia" onclick="formModificarNoticia('+data[i].IdNoticia+')">'+
                '<input type="image" src="../iconos/Eliminar.png" title="Eliminar Noticia" onclick="eliminarNoticia('+data[i].IdNoticia+')">'+  
              '</div>'+
            '</div>'+
            '<div class="noticia_descripcion">'+
              '<a class="negrilla">Fecha: </a>'+
              '<a>'+concadenarFecha(data[i].Fecha)+'</a>'+
              '<br>'+
              '<a class="negrilla">Descripcion: </a>'+
              '<a>'+data[i].Descripcion+'</a>'+
            '</div>'+
            '<div class="noticia_enlace">'+
              mostrarMas+
            '</div>'+
          '</div>'+
        '</div>';
    }

    div.innerHTML=cadenaHTML;

  });
}
/********************carga de noticias anteriores****************************/
function cargarNoticiasAnteriores(){
  fetch(ruta+'/NoticiasAnteriores')
  .then(response => response.json())
  .then(data => {

    let cadenaHTML="";
    let div=document.getElementById('noticias_panel_anteriores');

    //concadenacion de los elementos del json
    for(let i=0;i<data.length;i++){
    //si no hay imagen coloco una por defecto
    if(data[i].Imagen===null||data[i].Imagen===""){
      data[i].Imagen="../iconos/Mal.png";
    }
    var mostrarMas ="";
    if(data[i].Enlace!==null||data[i].Enlace!==""){
      mostrarMas='<a href="'+data[i].Enlace+'" target="_blank"> ▶ Mas informacion click aqui ...</a>';
    }
      cadenaHTML+=
          '<div class="noticia">'+
          '<div class="noticia_panel_imagen">'+
            '<img class="noticia_imagen" onclick="verImagenAumentada('+data[i].IdNoticia+
            ')" id="'+data[i].IdNoticia+'" src="'+data[i].Imagen+'">'+
          '</div>'+
          '<div class="noticia_datos">'+
            '<div class="noticia_contenedor_titulo">'+
              '<div class="noticia_titulo">'+
                '<h1 >'+data[i].Nombre+'</h1>'+
              '</div>'+
              '<div class="noticia_titulo_botones">'+
                '<input type="image" src="../iconos/Editar.png" title="Modificar Noticia" onclick="formModificarNoticia('+data[i].IdNoticia+')">'+
                '<input type="image" src="../iconos/Eliminar.png" title="Eliminar Noticia" onclick="eliminarNoticia('+data[i].IdNoticia+')">'+  
              '</div>'+
            '</div>'+
            '<div class="noticia_descripcion">'+
              '<a class="negrilla">Fecha: </a>'+
              '<a>'+concadenarFecha(data[i].Fecha)+'</a>'+
              '<br><br>'+
              '<a class="negrilla">Descripcion: </a>'+
              '<a>'+data[i].Descripcion+'</a>'+
            '</div>'+
            '<div class="noticia_enlace">'+
              mostrarMas+
            '</div>'+
          '</div>'+
        '</div>';
    }

    div.innerHTML=cadenaHTML;

  });
}
//modifica una noticia
function formModificarNoticia(Id){
  const modal= document.getElementById("modificar_noticia");

  //carga los datos de la noticia
    fetch(ruta+'/DatosNoticia/'+Id)
    .then(response => response.json())
    .then(data => {
      const modal= document.getElementById("modificar_noticia");
      var span=document.getElementById('modificar_noticia_notificacion');
      var nombre=document.getElementById('modificar_noticia_nombre');
      var enlace=document.getElementById('modificar_noticia_enlace');
      var imagen=document.getElementById('modificar_noticia_imagen');
      var fecha=document.getElementById('modificar_noticia_fecha');
      var descripcion=document.getElementById('modificar_noticia_descripcion');

      span.value=Id;
      nombre.value=data[0].Nombre;
      enlace.value=data[0].Enlace;
      imagen.value=data[0].Imagen;
      fecha.value=data[0].Fecha.slice(0,10);
      descripcion.value=data[0].Descripcion;
    });
    modal.showModal();
}
//boton cierra el formulario de modificar noticia
document.getElementById('modificar_noticia_cerrar').onclick = function(){
  cerrarModificarNoticia();
};
//cierra el formulario de modificar noticia
function cerrarModificarNoticia(){
  const modal=document.getElementById("modificar_noticia");
  const nombre=document.getElementById("modificar_noticia_nombre");
  const enlace=document.getElementById("modificar_noticia_enlace");
  const imagen=document.getElementById("modificar_noticia_imagen");
  const fecha=document.getElementById("modificar_noticia_fecha");
  const descripcion=document.getElementById("modificar_noticia_descripcion");
  const span=document.getElementById("modificar_noticia_notificacion");
  nombre.value="";
  enlace.value="";
  imagen.value="";
  fecha.value="";
  descripcion.value="";
  span.innerHTML="";
  span.value="";
  modal.close();
}
//modificar noticia
document.getElementById('modificar_noticia_boton').onclick=function(){
  const nombre=document.getElementById("modificar_noticia_nombre").value;
  const enlace=document.getElementById("modificar_noticia_enlace").value;
  const imagen=document.getElementById("modificar_noticia_imagen").value;
  const fecha=document.getElementById("modificar_noticia_fecha").value;
  const descripcion=document.getElementById("modificar_noticia_descripcion").value;
  const span=document.getElementById("modificar_noticia_notificacion");

  if(nombre===""){ //valida que no este vacio
    notificacionSpan(span , "Ingrese el nombre");
  }else if(nombre.length>100){
    notificacionSpan(span , "El nombre debe tener maximo 100 caracteres");
  }else if(enlace.length>200){
    notificacionSpan(span , "El enlace debe tener maximo 200 caracteres");
  }else if(enlace!==""&&!validarEnlace(enlace)){ //valida que tenga formato de link http://
     notificacionSpan(span , "El enlace no es valido");
  }else if(imagen.length>200){
    notificacionSpan(span , "La imagen debe tener maximo 200 caracteres");
  }else if(imagen!==""&&!validarEnlace(imagen)){ //valida que tenga formato de link http://
     notificacionSpan(span , "El enlace de la imagen no es valido");
  }else if(fecha===""){ //valida que no este vacia
     notificacionSpan(span , "Seleccione la fecha de la noticia");
  }else if(descripcion.length>500){
     notificacionSpan(span , "La descripcion debe tener maximo 500 caracteres");
  }else {
    
    var url = ruta+'/ModificarNoticia/'+span.value;
    var data = {    Nombre: nombre,
                    Enlace: enlace,
                    Imagen: imagen,
                    Fecha: fecha,
                    Descripcion: descripcion };

    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => { 
      if(data.peticion==='correcta'){
        cerrarModificarNoticia();
        cargarNoticiasActuales(); //recarga el listado noticias
        cargarNoticiasAnteriores(); //recarga el listado noticias
      }
      mostrarNotificacion(data.mensaje);
    });
  }
};

//elimina una noticia
function eliminarNoticia(Id){
     var url = ruta+'/EliminarNoticia/'+Id;
    if(confirm("¿Estás seguro de que deseas eliminar la noticia?")){
      fetch(url, {
          method: 'DELETE', 
      }).then(response => response.json())
      .then(data => { 
        mostrarNotificacion(data.mensaje);
        cargarNoticiasActuales(); //recarga el listado noticias
        cargarNoticiasAnteriores(); //recarga el listado noticias
      });
    }
}
/************************** ventana de notificaciones ***********/
function mostrarNotificacion(texto){
  const modal= document.getElementById("notificaciones");
  var notiTexto=document.getElementById('notificaciones_texto');
  notiTexto.innerText=texto;
  modal.showModal();
}
function cerrarNotificacion(){
  const modal= document.getElementById("notificaciones");
  var notiTexto=document.getElementById('notificaciones_texto');
  notiTexto.innerText="";
  modal.close();
}
// boton de ciere de la notificacion 
document.getElementById('notificaciones_div_cerrar').onclick = function(){
  cerrarNotificacion();
};
/************************* validar cajas ************************/
function validarTexto(texto){

  if (/^[a-zA-Z\u00C0-\u017F\s]+$/.test(texto)) {
    return true;
  }
  return false;

}

function validarEnlace(texto){
  
  if (texto.startsWith("http://")|texto.startsWith("https://")) {
    return true;
}
  return false;
}

function notificacionSpan(span, texto){
     span.innerHTML=texto;
     span.style.backgroundColor = 'darkred';
     span.style.color = 'white';
}
/********************** concadenar fecha ********************/
function concadenarFecha(fecha){
  let c ="";
  let anio=fecha.slice(0,4);
  let mes=fecha.slice(5,7);
  let dia=fecha.slice(8,10);

  if(mes==="01"){
    mes="Enero";
  }else if(mes==="02"){
    mes="Febrero";
  }else if(mes==="03"){
    mes="Marzo";
  }else if(mes==="04"){
    mes="Abril";
  }else if(mes==="05"){
    mes="Mayo";
  }else if(mes==="06"){
    mes="Junio";
  }else if(mes==="07"){
    mes="Julio";
  }else if(mes==="08"){
    mes="Agosto";
  }else if(mes==="09"){
    mes="Septiembre";
  }else if(mes==="10"){
    mes="Octubre";
  }else if(mes==="11"){
    mes="Noviembre";
  }else if(mes==="12"){
    mes="Diciembre";
  }
  
  c=dia+" "+mes+" "+anio;
  return c
}