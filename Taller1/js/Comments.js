let array_com=[];
let c=0;

class Comments{
    constructor(id,Nombre,Msm){
        this.id = id;
        this.Msm = Msm;
        this.Nombre = Nombre;
        //Obtener fecha 
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();
        //se pone la fecha tipo dia/mes/año 
        this.Fecha = day + '/' + month + '/' + year;
    }
    
    agregar_com(i){
        const comentario = document.querySelectorAll('.contenido');
        comentario[i].innerHTML=`
           <h3>${this.Nombre}</h3>
           <h4>Fecha: ${this.Fecha}</h4>
           <p>"${this.Msm}"</p>
          `
    }
    
    editar_com(){
        return this.Msm;
    }

    eliminar_com(){
        return this.Fecha;
    }
}

function comm(){
    const com =  document.getElementById('comentarios');
    com.innerHTML += `
        <div class='comentario'>
            <div id='inactive'>
                <button onclick="editar(this)" name="${c}" class="accion" style="background-image: url('../../images/pencil.png')"></button>
                <button onclick="eliminar(this)" name="${c}" class="accion" id="eliminar"  style="background-image: url('../../images/delete.png')"></button>
            </div>
            <div class='contenido'>
                <input id='nombre' type="text" placeholder="Nombre">
                <input id='msm' type="text" placeholder="Que nos quieres contar">
                <button onclick='enviar()' id='check' style="background-image: url('../../images/check.png')"></button>
            </div>
        </div>
    `
}

function enviar(){
    
    //Se activan los botones para editar y  eliminar
    const acciones = document.getElementById('inactive');
    acciones.setAttribute('class','acciones');
    acciones.removeAttribute('id');
    //Se leen los datos ingresados por el usuario (Nombre , mensaje)
    const nombre = document.getElementById('nombre');
    const msm = document.getElementById('msm');
    nombre.removeAttribute('id');
    msm.removeAttribute('id');

    let mensaje = new Comments(c,nombre.value,msm.value);

    array_com.push(mensaje);

    array_com[c].agregar_com(c);
    c++;
} 


function editar(com){
    const comentario = document.querySelectorAll('.contenido');
    comentario[com.name].innerHTML=`
        <h3>${array_com[com.name].Nombre}</h3>
        <h4>Fecha: ${array_com[com.name].Fecha}</h4>
        <input id='msm' type="text" value="${array_com[com.name].Msm}">
        <button onclick='cambiar(${com.name})' id='check' style="background-image: url('../../images/check.png')"></button>
        `
}

function cambiar(id){
    const msm = document.getElementById('msm');
    msm.removeAttribute('id');
    array_com[id].Msm=msm.value;
    //array_com[id].editar_com();
    array_com[id].agregar_com(id);
    console.log(array_com[id].editar_com());
    console.log(array_com);
}

function eliminar(id){
    //Obetener el contenedor de comentarios
    const com =  document.getElementById('comentarios');
    const comentario = document.querySelectorAll('.comentario');
    com.removeChild(comentario[id.name]);
}

