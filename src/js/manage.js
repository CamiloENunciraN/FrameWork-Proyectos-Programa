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
  }else{
    //guarda en un span la id del administrador
    var span=document.getElementById('id_administrador');
    var administrador=localStorage.getItem('Id');
    span.value=administrador;
  }

}
/******************** salir de administrador ****************/
document.getElementById("login_salir").onclick = function() {

var id=localStorage.getItem('Id');
var url = '/cerrarSesion';
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

  fetch('/TipoProyecto')
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

    var url = '/numeroProyectos';
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
      validarPaginas();
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

    var url = '/Proyectos';
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
    if(data[i].Imagen===null||data[i].Imagen===""){
      data[i].Imagen="../iconos/Mal.png";
    }
    if(data[i].Autor===null||data[i].Autor===""){
      data[i].Autor="Desconocido";
    }
    var enlace ="<a>No disponible</a>";
    if(data[i].Enlace!==""){
       enlace ='<a href="'+data[i].Enlace+'" target="_blank">'+data[i].Enlace+'</a>';
    }
    if(data[i].Descripcion===null||data[i].Descripcion===""){
      data[i].Descripcion="No disponible";
    }

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
                '<input type="image" src="../iconos/Editar.png" title="Modificar Proyecto" onclick="formModificarProyecto('+data[i].IdProyecto+')">'+
                '<input type="image" src="../iconos/Eliminar.png" title="Eliminar Proyecto" onclick="eliminarProyecto('+data[i].IdProyecto+')">'+  
              '</div>'+
            '</div>'+
            '<div class="proyecto_descripcion">'+
              '<a class="negrilla">Fecha: </a>'+
              '<a>'+concadenarFecha(data[i].Fecha)+'</a>'+
              '<br>'+
              '<a class="negrilla">Autor: </a>'+
              '<a>'+data[i].Autor+'</a>'+
              '<br>'+
              '<a class="negrilla">Tipo: </a>'+
              '<a>'+data[i].Tipo+'</a>'+
              '<br><br>'+
              '<a class="negrilla">Descripcion: </a>'+
              '<a>'+data[i].Descripcion+'</a>'+
              '<br><br>'+
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

//abre el formulario de registrar proyecto
document.getElementById('agregar_proyecto').onclick = function(){
  const modal= document.getElementById("registrar_proyecto");

  var combotipo=document.getElementById('registrar_proyecto_tipo');
  combotipo.innerHTML="";
  var opcion = document.createElement("option");
  opcion.text ="Seleccione Tipo";
  combotipo.add(opcion);

  fetch('/TipoProyecto')
  .then(response => response.json())
  .then(data => {

  for (var i = 0; i <data.length; i++) {
        opcion = document.createElement("option");
        opcion.text = data[i].Nombre;
        combotipo.add(opcion);
  }
  });

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
  const autor=document.getElementById("registrar_proyecto_autor");
  const enlace=document.getElementById("registrar_proyecto_enlace");
  const imagen=document.getElementById("registrar_proyecto_imagen");
  const tipo=document.getElementById("registrar_proyecto_tipo");
  const fecha=document.getElementById("registrar_proyecto_fecha");
  const descripcion=document.getElementById("registrar_proyecto_descripcion");
  const span=document.getElementById("registrar_proyecto_notificacion");
  nombre.value="";
  autor.value="";
  enlace.value="";
  imagen.value="";
  tipo.innerHTML="";
  fecha.value="";
  descripcion.value="";
  span.innerHTML="";
  modal.close();
}
//registra un proyecto
document.getElementById('registrar_proyecto_boton').onclick = function(){
  const nombre=document.getElementById("registrar_proyecto_nombre").value;
  const autor=document.getElementById("registrar_proyecto_autor").value;
  const enlace=document.getElementById("registrar_proyecto_enlace").value;
  const imagen=document.getElementById("registrar_proyecto_imagen").value;
  const tipo=document.getElementById("registrar_proyecto_tipo").value;
  const fecha=document.getElementById("registrar_proyecto_fecha").value;
  const descripcion=document.getElementById("registrar_proyecto_descripcion").value;
  const span=document.getElementById("registrar_proyecto_notificacion");
  const idAdministrador=document.getElementById("id_administrador").value;

  if(nombre===""){
    notificacionSpan(span , "Ingrese el nombre");
  }else if(nombre.length>=200){
    notificacionSpan(span , "El nombre debe tener maximo 200 caracteres");
  }else if(!validarTexto(nombre)){
    notificacionSpan(span , "El nombre no es valido, caracteres validos[a-z]");
  }else if(autor===""){
    notificacionSpan(span , "Ingrese el autor");
  }else if(autor.length>=50){
    notificacionSpan(span , "El autor debe tener maximo 50 caracteres");
  }else if(!validarTexto(autor)){
    notificacionSpan(span , "El autor no es valido, caracteres validos[a-z]");
  }else if(enlace.length>=200){
    notificacionSpan(span , "El enlace debe tener maximo 200 caracteres");
  }else if(enlace!==""&&!validarEnlace(enlace)){
    notificacionSpan(span , "El enlace no es valido");
  }else if(imagen.length>=200){
    notificacionSpan(span , "La imagen debe tener maximo 200 caracteres");
  }else if(imagen!==""&&!validarEnlace(imagen)){
    notificacionSpan(span , "El enlace de a imagen no es valido");
  }else if(tipo==="Seleccione Tipo"){
    notificacionSpan(span , "Seleccione el tipo de proyecto");
  }else if(fecha===""){
    notificacionSpan(span , "Ingrese la fecha");
  }else if(descripcion.length>=500){
    notificacionSpan(span , "La descripcion debe tener maximo 500 caracteres");
  }else {
    
    var url = '/RegistrarProyecto';
    var data = {    Nombre: nombre,
                    Autor: autor,
                    Enlace: enlace,
                    Imagen: imagen,
                    Tipo: tipo,
                    Fecha: fecha,
                    Descripcion: descripcion,
                    IdAdministrador: idAdministrador };

    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => { 
      if(data.peticion==='correcta'){
        const paginaActual=document.getElementById('pagina_actual').value;
        cerrarRegistrarProyecto();
        cargarNumeroProyectos(paginaActual); //recarga el listado de los proyectos
      }
      mostrarNotificacion(data.mensaje);
    });


  }
};
//abre el formulario de modificar
function formModificarProyecto(Id){
  const modal= document.getElementById("modificar_proyecto");

  var combotipo=document.getElementById('modificar_proyecto_tipo');
  combotipo.innerHTML="";
  var opcion = document.createElement("option");
  opcion.text ="Seleccione Tipo";
  combotipo.add(opcion);

  fetch('/TipoProyecto')
  .then(response => response.json())
  .then(data => {

    for (var i = 0; i <data.length; i++) {
          opcion = document.createElement("option");
          opcion.text = data[i].Nombre;
          combotipo.add(opcion);

    }

      //carga los datos del proyecto
    fetch('/DatosProyecto/'+Id)
    .then(response => response.json())
    .then(data => {
      const modal= document.getElementById("modificar_proyecto");
      var span=document.getElementById('modificar_proyecto_notificacion');
      var nombre=document.getElementById('modificar_proyecto_nombre');
      var autor=document.getElementById('modificar_proyecto_autor');
      var enlace=document.getElementById('modificar_proyecto_enlace');
      var imagen=document.getElementById('modificar_proyecto_imagen');
      var tipo=document.getElementById('modificar_proyecto_tipo');
      var fecha=document.getElementById('modificar_proyecto_fecha');
      var descripcion=document.getElementById('modificar_proyecto_descripcion');

      span.value=Id;
      nombre.value=data[0].Nombre;
      autor.value=data[0].Autor;
      enlace.value=data[0].Enlace;
      imagen.value=data[0].Imagen;
      fecha.value=data[0].Fecha.slice(0,10);
      descripcion.value=data[0].Descripcion;
      //selecciona el elemento correspondiente al tipo
      for (var i = 0; i < tipo.options.length; i++) {
        if (tipo.options[i].text === data[0].Tipo) {
          tipo.selectedIndex = i;
          break;
        }
      }
      modal.showModal();
    });

  });

}
//boton cierra el formulario de modificar proyecto
document.getElementById('modificar_proyecto_cerrar').onclick = function(){
  cerrarModificarProyecto();
};
//cierra el formulario de modificar proyecto
function cerrarModificarProyecto(){
  const modal=document.getElementById("modificar_proyecto");
  const nombre=document.getElementById("modificar_proyecto_nombre");
  const autor=document.getElementById("modificar_proyecto_autor");
  const enlace=document.getElementById("modificar_proyecto_enlace");
  const imagen=document.getElementById("modificar_proyecto_imagen");
  const tipo=document.getElementById("modificar_proyecto_tipo");
  const fecha=document.getElementById("modificar_proyecto_fecha");
  const descripcion=document.getElementById("modificar_proyecto_descripcion");
  const span=document.getElementById("modificar_proyecto_notificacion");
  nombre.value="";
  autor.value="";
  enlace.value="";
  imagen.value="";
  tipo.innerHTML="";
  fecha.value="";
  descripcion.value="";
  span.innerHTML="";
  span.value="";
  modal.close();
}

//modificar proyecto
document.getElementById('modificar_proyecto_boton').onclick=function(){
  const nombre=document.getElementById("modificar_proyecto_nombre").value;
  const autor=document.getElementById("modificar_proyecto_autor").value;
  const enlace=document.getElementById("modificar_proyecto_enlace").value;
  const imagen=document.getElementById("modificar_proyecto_imagen").value;
  const tipo=document.getElementById("modificar_proyecto_tipo").value;
  const fecha=document.getElementById("modificar_proyecto_fecha").value;
  const descripcion=document.getElementById("modificar_proyecto_descripcion").value;
  const span=document.getElementById("modificar_proyecto_notificacion");

  if(nombre===""){
    notificacionSpan(span , "Ingrese el nombre");
  }else if(nombre.length>=200){
    notificacionSpan(span , "El nombre debe tener maximo 200 caracteres");
  }else if(!validarTexto(nombre)){
    notificacionSpan(span , "El nombre no es valido, caracteres validos[a-z]");
  }else if(autor===""){
    notificacionSpan(span , "Ingrese el autor");
  }else if(autor.length>=50){
    notificacionSpan(span , "El autor debe tener maximo 50 caracteres");
  }else if(!validarTexto(autor)){
    notificacionSpan(span , "El autor no es valido, caracteres validos[a-z]");
  }else if(enlace.length>=200){
    notificacionSpan(span , "El enlace debe tener maximo 200 caracteres");
  }else if(enlace!==""&&!validarEnlace(enlace)){
    notificacionSpan(span , "El enlace no es valido");
  }else if(imagen.length>=200){
    notificacionSpan(span , "La imagen debe tener maximo 200 caracteres");
  }else if(imagen!==""&&!validarEnlace(imagen)){
    notificacionSpan(span , "El enlace de a imagen no es valido");
  }else if(tipo==="Seleccione Tipo"){
    notificacionSpan(span , "Seleccione el tipo de proyecto");
  }else if(descripcion.length>=500){
    notificacionSpan(span , "La descripcion debe tener maximo 500 caracteres");
  }else {
    
    var url = '/ModificarProyecto/'+span.value;
    var data = {    Nombre: nombre,
                    Autor: autor,
                    Enlace: enlace,
                    Imagen: imagen,
                    Tipo: tipo,
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
        const paginaActual=document.getElementById('pagina_actual').value;
        cerrarModificarProyecto();
        cargarNumeroProyectos(paginaActual); //recarga el listado de los proyectos
      }
      mostrarNotificacion(data.mensaje);
    });
  }
};


//elimina el proyecto seleccionado
function eliminarProyecto(Id){
    var url = '/EliminarProyecto/'+Id;
    if(confirm("¿Estás seguro de que deseas eliminar el proyecto?")){
      fetch(url, {
          method: 'DELETE', 
      }).then(response => response.json())
      .then(data => { 
        const paginaActual=document.getElementById('pagina_actual').value;
        mostrarNotificacion(data.mensaje);
        cargarNumeroProyectos(paginaActual); //recarga el listado de los proyectos
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
    notificacionSpan(span , "Ingrese el nombre");
  }else if(nombre.length>=50){
    notificacionSpan(span , "El nombre debe tener maximo 50 caracteres");
  }else if(!validarTexto(nombre)){
    notificacionSpan(span , "El nombre no es valido, caracteres validos[a-z]");
  }else if(descripcion===""){
    notificacionSpan(span , "Ingrese Descripcion");
  }else if(descripcion.length>=500){
    notificacionSpan(span , "La descripcion debe tener maximo 500 caracteres");
  }else {
    
    var url = '/RegistrarTipoProyecto';
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
        comboTipo();
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

    fetch('/DatosTipoProyecto/'+tipo)
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
    notificacionSpan(span , "Ingrese el nombre");
  }else if(nombre.length>=50){
    notificacionSpan(span , "El nombre debe tener maximo 50 caracteres");
  }else if(!validarTexto(nombre)){
    notificacionSpan(span , "El nombre no es valido, caracteres validos[a-z]");
  }else if(descripcion===""){
    notificacionSpan(span , "Ingrese Descripcion");
  }else if(descripcion.length>=500){
    notificacionSpan(span , "La descripcion debe tener maximo 500 caracteres");
  }else {
    
    var url = '/ModificarTipoProyecto/'+tipo;
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

      if(data.peticion==='correcta'){
        cerrarModificarTipoProyecto();
        comboTipo();
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

    if(confirm("¿Estás seguro de que deseas eliminar el tipo de proyecto "+tipo+" ?")){
    var url = '/EliminarTipoProyecto/'+tipo;

    fetch(url, {
        method: 'DELETE', 
    }).then(response => response.json())
    .then(data => { 

      mostrarNotificacion(data.mensaje);
      comboTipo();
    });
    }
  }
  
};

/***************** funciones de noticias ***************************/
//funcion para ultimas noticias/
function getUltimasNoticias(){
  fetch('/UltimasNoticias')
  .then(response => response.json())
  .then(data => {

    let cadenaHTML="";
    let div=document.getElementById('noticias_panel_carrusel');

    //concadenacion de los elementos del json
    for(let i=0;i<data.length;i++){
    //si no hay imagen coloco una por defecto
    if(data[i].Imagen===null||data[i].Imagen===""){
      data[i].Imagen="../iconos/Mal.png";
    }
    const id= 987+i;
      cadenaHTML+= 
                    ' <div class="UNoticia" >'+
                    '<div class="UNoticia_fecha" >'+
                    '<a >'+concadenarFecha(data[i].Fecha)+'</a>'+
                    '</div>'+
                    '<div class="UNoticia_titulo">'+
                      '<a target="_blank" href="'+data[i].Enlace+'">'+data[i].Nombre+'</a>'+
                    '</div>'+
                    '<div  class="UNoticia_imagen" > '+
                     '<img src="'+data[i].Imagen+'" onclick="verImagenAumentada('+id+')" id="'+id+'">'+
                    '</div>'+
                    '</div>';
    }

    div.innerHTML=cadenaHTML;
  });
}

//abre el formulario de registrar proyecto
document.getElementById('AgregarNoticia').onclick = function(){
  const modal= document.getElementById("registrar_noticia");
  modal.showModal();
};
//boton cierra el formulario de registrar proyecto
document.getElementById('registrar_noticia_cerrar').onclick = function(){
  cerrarRegistrarNoticia();
};
//cierra el formulario de registrar proyecto
function cerrarRegistrarNoticia(){
  const modal=document.getElementById("registrar_noticia");
  const nombre=document.getElementById("registrar_noticia_nombre");
  const enlace=document.getElementById("registrar_noticia_enlace");
  const imagen=document.getElementById("registrar_noticia_imagen");
  const fecha=document.getElementById("registrar_noticia_fecha");
  const descripcion=document.getElementById("registrar_noticia_descripcion");
  const span=document.getElementById("registrar_noticia_notificacion");
  nombre.value="";
  enlace.value="";
  imagen.value="";
  fecha.value="";
  descripcion.value="";
  span.innerHTML="";
  modal.close();
}
//registra una noticia
document.getElementById("registrar_noticia_boton").onclick = function() {
  
  const nombre=document.getElementById("registrar_noticia_nombre").value;
  const enlace=document.getElementById("registrar_noticia_enlace").value;
  const imagen=document.getElementById("registrar_noticia_imagen").value;
  const fecha=document.getElementById("registrar_noticia_fecha").value;
  const descripcion=document.getElementById("registrar_noticia_descripcion").value;
  const span=document.getElementById("registrar_noticia_notificacion");
  const idAdministrador=document.getElementById("id_administrador").value;
  
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

    var url = '/RegistrarNoticia/';
    var data = {    Nombre: nombre,
                    Enlace: enlace,
                    Imagen: imagen,
                    Fecha: fecha,
                    Descripcion: descripcion,
                    IdAdministrador: idAdministrador };

    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => { 
      if(data.peticion==='correcta'){
        cerrarRegistrarNoticia();
        getUltimasNoticias(); //recarga el listado de noticias
      }
      mostrarNotificacion(data.mensaje);
    });

  }

};

document.getElementById("noticias").onclick = function() {
  location.href='formNoticiasManage.html'; //pagina del admin para las noticias
};
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
/************* muestra en el formulario el texto ****************/
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

