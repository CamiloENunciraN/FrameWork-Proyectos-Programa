cargarNoticias();

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
function cargarNoticias(){
  fetch('http://localhost:3000/Noticias')
  .then(response => response.json())
  .then(data => {

    let cadenaHTML="";
    let div=document.getElementById('noticias_panel_visualizacion');

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
            '<img class="noticia_imagen" onclick="verImagenAumentada('+i+
            ')" id="'+i+'" src="'+data[i].Imagen+'">'+
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
              '<a>'+data[i].Fecha.slice(0,10)+'</a>'+
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





