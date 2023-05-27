
// autor: Camilo Nuncira
const proyectosPorPagina = 5; //numero de proyectos a mostrar por pagina
const ruta="https://framework-proyectos-programa-production.up.railway.app";
//const ruta="http://localhost:3000";
test();

function test(){
  fetch(ruta+'/test')
  .then(response => response.json())
  .then(data => {
console.log(data);
  });
}

/****************** metodos que cargan la pagina ************/
cargarCombox(); //carga los combos que filtran los proyectos
cargarNumeroProyectos(1); //el uno representa la pagina que se mostrara en este caso la inicial
getUltimasNoticias(); //carga las ulltimas noticias
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

    var url = ruta+'/iniciarSesion';
    var data = {    email: correo,
                    contrasena: contra };

    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => {

        if(data.sesion==='Activa'){
          localStorage.setItem('Id', data.Id);
          localStorage.setItem('sesion', data.sesion);
          location.href='src/html/manage.html';
        }else{
          notificarLogin("Usuario o contrasena incorrecto");
        }
    });

}
};
/******************** muestra los mensajes de error en el login **********************/
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
  var opcion = document.createElement("option");
  opcion.text ="Todos";
  combotipo.add(opcion);

  fetch(ruta+'/TipoProyecto')
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

    var url = ruta+'/numeroProyectos';
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
      validarPaginas(); //llamo el metodo que valida las paginas
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

    var url = ruta+'/Proyectos';
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
      data[i].Imagen="./src/iconos/Mal.png";
    }
    if(data[i].Autor===null||data[i].Imagen===""){
      data[i].Autor="Desconocido";
    }
    var enlace ="<a>No hay</a>";
    if(data[i].Enlace!==""){
       enlace ='<a href="'+data[i].Enlace+'" target="_blank">'+data[i].Enlace+'</a>';
    }
    if(data[i].Descripcion===null){
      data[i].Descripcion="No hay";
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

/******************* funciones de noticias ********************************/
/************************** funcion para ultimas noticias ********************/

function getUltimasNoticias(){

  fetch(ruta+'/UltimasNoticias')
  .then(response => response.json())
  .then(data => {

    let cadenaHTML="";
    let div=document.getElementById('noticias_panel_carrusel');

    //concadenacion de los elementos del json
    for(let i=0;i<data.length;i++){
    //si no hay imagen coloco una por defecto
    if(data[i].Imagen===null||data[i].Imagen===""){
       data[i].Imagen="src/iconos/Mal.png";
    }
    var id= 100+i;
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

/********************** Abre las noticias ************************/
document.getElementById("noticias").onclick = function() {
  location.href='src/html/formNoticias.html';
};
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