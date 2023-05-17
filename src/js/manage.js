// autor: Camilo Nuncira
const proyectosPorPagina = 5; //numero de proyectos a mostrar por pagina
/****************** metodos que cargan la pagina ************/
validarSesion();
cargarCombox(); //carga los combos que filtran los proyectos
cargarNumeroProyectos(1); //el uno representa la pagina que se mostrara en este caso la inicial
getUltimasNoticias(); //carga las ulltimas noticias
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

/**************************** funciones para proyectos *******************/
/********************* cargar los combox de filtros************************/
function cargarCombox(){
  comboAnio();
  comboTipo();
}

function comboAnio(){
  comboanio=document.getElementById('filtros_anio');
  var opcion = document.createElement("option");
  opcion.text ="Todos";
  comboanio.add(opcion);
  for (var i = 2000; i <=2050; i++) {
        opcion = document.createElement("option");
        opcion.text = i;
        comboanio.add(opcion);
  }
}

function comboTipo(){
  var combotipo=document.getElementById('filtros_tipo');
  combotipo.innerHTML="";
  var opcion = document.createElement("option");
  opcion.text ="Todos";
  combotipo.add(opcion);

  fetch('http://localhost:3000/TipoProyecto')
  .then(response => response.json())
  .then(data => {


  for (var i = 0; i <data.length; i++) {
        opcion = document.createElement("option");
        opcion.text = data[i].Nombre;
        combotipo.add(opcion);
  }
  });
}
/******************* accion para boton filtrar ****************************/
document.getElementById('filtrar').onclick = function(){
  cargarNumeroProyectos(1);
  document.getElementById('pagina_actual').value=1;
};
/****************** numero de proyectos encontrados *************************/
//de acuerdo a los filtros que se le establezcan
function cargarNumeroProyectos(pagina){
  const nProyectos=document.getElementById('numero_de_proyectos');
  const anio=document.getElementById('filtros_anio').value;
  const tipo = document.getElementById("filtros_tipo").value;
  const orden=document.getElementById('filtros_orden').value;

    var url = 'http://localhost:3000/numeroProyectos';
    var data = {    anio: anio,
                    tipo: tipo,
                    orden: orden };

    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => { 
      nProyectos.text=data.NProyectos;
      // si no se encuentran notifico que no se encontraron
    if (nProyectos.text==='0') {
      var cargaProyectos=document.getElementById('carga_proyectos');
      cargaProyectos.innerHTML='<h1>No se Encontraron Resutados</h1>';
     }else{
      getProyectos(pagina); //llamo el metodo que trae los proyectos y los dibuja
     }
    });

}
/********************** cargar los proyectos ***********************/
function getProyectos(pagina){ //pagina corresponde a la pagina que se quiere cargar
  //preguntar si es cero no hay proyectos con esos fitro
  const nProyectos=document.getElementById('numero_de_proyectos').text;
// si no se encuentran notifico que no se encontraron
  if (nProyectos!=='0'){ //si es diferente busco y cargo los proyectos

  const anio=document.getElementById('filtros_anio').value;
  const tipo = document.getElementById("filtros_tipo").value;
  const orden=document.getElementById('filtros_orden').value;

    var url = 'http://localhost:3000/Proyectos';
    var data = {    anio: anio,
                    tipo: tipo,
                    orden: orden,
                    pagina: pagina,
                    proyectosPorPagina: proyectosPorPagina };

    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => { 

    let cadenaHTML="";
    let div=document.getElementById('carga_proyectos');

    //concadenacion de los elementos del json
    for(let i=0;i<data.length;i++){
      //valdan los campos devueltos
    //si no hay imagen coloco una por defecto
    if(data[i].Imagen===null){
      data[i].Imagen="../iconos/Mal.png";
    }
    if(data[i].Autor===null){
      data[i].Autor="Desconocido";
    }
    var enlace ="<a>No hay</a>";
    if(data[i].Enlace!==null){
       enlace ='<a href="'+data[i].Enlace+'" target="_blank">'+data[i].Enlace+'</a>';
    }
    if(data[i].Descripcion===null){
      data[i].Descripcion="No hay";
    }
    //recorta la fecha para que se muestre solo anio-mes-dia
    let fecha = data[i].Fecha;
    let subfecha = fecha.slice(0, 10);

      cadenaHTML+=
          '<div class="proyecto">'+
          '<div class="proyecto_panel_imagen">'+
            '<img class="proyecto_imagen" onclick="verImagenAumentada('+i+
            ')" id="'+i+'" src="'+data[i].Imagen+'">'+
          '</div>'+
          '<div class="proyecto_datos">'+
            '<div class="proyecto_contenedor_titulo">'+
              '<div class="proyecto_titulo">'+
                '<h1 >'+data[i].Nombre+'</h1>'+
              '</div>'+
              '<div class="proyecto_titulo_botones">'+
                '<input type="image" src="../iconos/Editar.png" title="Modificar Proyecto">'+
                '<input type="image" src="../iconos/Eliminar.png" title="Eliminar Proyecto">'+  
              '</div>'+
            '</div>'+
            '<div class="proyecto_descripcion">'+
              '<a class="negrilla">Fecha: </a>'+
              '<a>'+subfecha+'</a>'+
              '<br>'+
              '<a class="negrilla">Autor: </a>'+
              '<a>'+data[i].Autor+'</a>'+
              '<br>'+
              '<a class="negrilla">Tipo: </a>'+
              '<a>'+data[i].Tipo+'</a>'+
              '<br>'+
              '<a class="negrilla">Descripcion: </a>'+
              '<a>'+data[i].Descripcion+'</a>'+
              '<br>'+
              '<a class="negrilla">Enlace: </a>'+
              enlace+
            '</div>'+
          '</div>'+
        '</div>';
    }

    div.innerHTML=cadenaHTML;

  validarPaginas(); //llamo el metodo que valida las paginas
    });
  }
}
/*********************** valida las pagina de proyectos **************************/
//se encarga de gestionar el boton siguiente y anterior de acuerdo a los proyectos
function  validarPaginas(){
  const paginaActual=document.getElementById('pagina_actual').value;
  const nProyectos=document.getElementById('numero_de_proyectos').text;
  //Math.ceil()redondea el numero por encima 2.3 = 3
  var  calculoPaginas=Math.ceil(parseInt(nProyectos)/ proyectosPorPagina); //proyectosPorPagina es el numero de elementos por pagina

  const paginaAnterior=document.getElementById('pagina_anterior');
  if(paginaActual==='1'){
    paginaAnterior.disabled = true; 
  }else{
    paginaAnterior.disabled = false; 
  }
const paginaSiguiente=document.getElementById('pagina_siguiente');
if(parseInt(paginaActual)===calculoPaginas||nProyectos==='0'){
 paginaSiguiente.disabled = true;
}else{
  paginaSiguiente.disabled = false;
}

}
/**************** acciones boton anterior siguiente **************************/
document.getElementById('pagina_anterior').onclick = function(){
  const paginaActual=document.getElementById('pagina_actual');
  var pAnterior=parseInt(paginaActual.value)-1;
  getProyectos(pAnterior);
  paginaActual.value = pAnterior;
  validarPaginas();
};
document.getElementById('pagina_siguiente').onclick = function(){
  const paginaActual=document.getElementById('pagina_actual');
  var pSiguiente=parseInt(paginaActual.value)+1;
  getProyectos(pSiguiente);
  paginaActual.value = pSiguiente;
  validarPaginas();
};
/**************** funciones tipo proyecto **********************/
//abre el formulario de registrar tipo proyecto
document.getElementById('agregar_tipo_proyecto').onclick = function(){
  //abrirModal("formRegistrarTipoProyecto");
  const modal= document.getElementById("registrar_tipo_proyecto");
  modal.showModal();
};
//boton cierra el formulario de registrar tipo proyecto
document.getElementById('registrar_tipo_proyecto_cerrar').onclick = function(){
  cerrarRegistrarTipoProyecto();
};
//cierra el formulario de registrar tipo proyecto
function cerrarRegistrarTipoProyecto(){
  const modal=document.getElementById("registrar_tipo_proyecto");
  const nombre=document.getElementById("registrar_tipo_proyecto_nombre");
  const descripcion=document.getElementById("registrar_tipo_proyecto_descripcion");
  const span=document.getElementById('registrar_tipo_proyecto_notificacion');
  nombre.value="";
  descripcion.value="";
  span.innerHTML="";
  modal.close();
}
//registra el tipo de proyecto
document.getElementById('registrar_tipo_proyecto_boton').onclick = function(){
const nombre=document.getElementById('registrar_tipo_proyecto_nombre').value;
const descripcion=document.getElementById('registrar_tipo_proyecto_descripcion').value;
let span=document.getElementById('registrar_tipo_proyecto_notificacion');

  if(nombre===""){
     span.innerHTML="<a> Ingrese Nombre </a>";
     span.style.backgroundColor = 'darkred';
     span.style.color = 'white';
  }else if(descripcion===""){
     span.innerHTML="<a>Ingrese Descripcion</a>";
     span.style.backgroundColor = 'darkred';
     span.style.color = 'white';
  }else {
    
    var url = 'http://localhost:3000/RegistrarTipoProyecto';
    var data = {    Nombre: nombre,
                    Descripcion: descripcion };

    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => { 
      console.log(data);
      if(data.peticion==='correcta'){
        cerrarRegistrarTipoProyecto();
      }
      mostrarNotificacion(data.mensaje);
    });
  }
};

//abre el formulario de modificar tipo proyecto
document.getElementById('modifica_tipo_proyecto').onclick = function(){

  const tipo=document.getElementById('filtros_tipo').value;

  if(tipo==='Todos'){
    mostrarNotificacion('Seleccione el tipo de proyecto a modificar');
  }else{

    fetch('http://localhost:3000/DatosTipoProyecto/'+tipo)
    .then(response => response.json())
    .then(data => {
      const modal= document.getElementById("modificar_tipo_proyecto");
      var nombre=document.getElementById('modificar_tipo_proyecto_nombre');
      var descripcion=document.getElementById('modificar_tipo_proyecto_descripcion');
      nombre.value=data[0].Nombre;
      descripcion.value=data[0].Descripcion;
      modal.showModal();
    });
  }
};
//boton cierra el formulario de modificar tipo proyecto
document.getElementById('modificar_tipo_proyecto_cerrar').onclick = function(){
  cerrarModificarTipoProyecto();
};
//cierra el formulario de modificar tipo proyecto
function cerrarModificarTipoProyecto(){
  const modal=document.getElementById("modificar_tipo_proyecto");
  var nombre=document.getElementById("modificar_tipo_proyecto_nombre");
  var descripcion=document.getElementById("modificar_tipo_proyecto_descripcion");
  var span=document.getElementById('modificar_tipo_proyecto_notificacion');
  nombre.value="";
  descripcion.value="";
  span.innerHTML="";
  modal.close();
}
// modificar el tipo del proyecto
document.getElementById('modificar_tipo_proyecto_boton').onclick = function(){

const nombre=document.getElementById('modificar_tipo_proyecto_nombre').value;
const descripcion=document.getElementById('modificar_tipo_proyecto_descripcion').value;
let span=document.getElementById('modificar_tipo_proyecto_notificacion');
const tipo=document.getElementById('filtros_tipo').value;

  if(nombre===""){
     span.innerHTML="<a> Ingrese Nombre </a>";
     span.style.backgroundColor = 'darkred';
     span.style.color = 'white';
  }else if(descripcion===""){
     span.innerHTML="<a>Ingrese Descripcion</a>";
     span.style.backgroundColor = 'darkred';
     span.style.color = 'white';
  }else {
    
    var url = 'http://localhost:3000/ModificarTipoProyecto/'+tipo;
    var data = {    Nombre: nombre,
                    Descripcion: descripcion };

    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => { 
      console.log(data);
      if(data.peticion==='correcta'){
        cerrarRegistrarTipoProyecto();
        combotipo();
      }
      mostrarNotificacion(data.mensaje);
    });
  }
};

//eliminar un tipo de proyecto
document.getElementById('eliminar_tipo_proyecto').onclick = function(){
  const tipo=document.getElementById('filtros_tipo').value;

  if(tipo==='Todos'){
    mostrarNotificacion('Seleccione el tipo de proyecto para eliminar');
  }else{

    var url = 'http://localhost:3000/EliminarTipoProyecto/'+tipo;

    fetch(url, {
        method: 'DELETE', 
    }).then(response => response.json())
    .then(data => { 

      mostrarNotificacion(data.mensaje);
      comboTipo();
    });
  }
  
};
/******************** funciones de proyecto *********************/
//abre el formulario de registrar tipo proyecto
document.getElementById('agregar_proyecto').onclick = function(){
  const modal= document.getElementById("registrar_proyecto");
  modal.showModal();
};
//boton cierra el formulario de registrar proyecto
document.getElementById('registrar_proyecto_cerrar').onclick = function(){
  cerrarRegistrarProyecto();
};
//cierra el formulario de registrar proyecto
function cerrarRegistrarProyecto(){
  const modal=document.getElementById("registrar_proyecto");
  const nombre=document.getElementById("registrar_proyecto_nombre");
  const descripcion=document.getElementById("registrar_proyecto_descripcion");
  const span=document.getElementById('registrar_proyecto_notificacion');
  nombre.value="";
  descripcion.value="";
  span.innerHTML="";
  modal.close();
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

/***************** funciones de noticias ***************************/
document.getElementById('AgregarNoticia').onclick = function(){
  
}
document.getElementById("noticias").onclick = function() {
  location.href='formNoticias.html'; //hacer pagina modificada para admin
};
