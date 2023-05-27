//const ruta="https://framework-proyectos-programa-production.up.railway.app";
const ruta="http://localhost:3000";
cargarNoticiasActuales();
cargarNoticiasAnteriores();

/******************** volver a inicio****************************/
document.getElementById("inicio").onclick = function() {
  location.href='../../index.html';
};
document.getElementById("titulo").onclick = function() {
  location.href='../../index.html';
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
/********************carga de noticias****************************/
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
    if(data[i].Enlace!==null){
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
    if(data[i].Enlace!==null){
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




