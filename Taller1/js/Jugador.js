function Jugador(){
    //Funcion para crear un cuadro de texto donde se escribe el nombre del ljugador a buscar
    const menu = document.getElementById('opciones').style.display = "block";
    const respon = document.getElementById('Rta');
    respon.innerHTML = ('');
    const main = document.getElementById('main');
    if(main){
        main.remove();
    }    

    //Crear cuadro texto de entrada
    const cuadro = document.createElement('input');
    cuadro.setAttribute('type','text');
    cuadro.setAttribute('id','text');
    cuadro.setAttribute('placeholder','Nombre de un jugador');
    cuadro.addEventListener("keydown", function(event){
        if(event.keyCode == 13){
            recibir();
        }
    })
    respon.appendChild(cuadro);

    //Crear div para la tabla
    const respuesta = document.createElement('div');
    respuesta.setAttribute('id','res');
    respon.appendChild(respuesta);

    const nombre = document.getElementById('text').value;
    const limpiar_res = document.getElementById('res');
    limpiar_res.innerHTML=('');  
}

function recibir(){
    //Funcion para obtener el nombre de jugador a buscar y ejecutar la busqueda a traves de la funcion Players()
    const nombre = document.getElementById('text').value;
    const respuesta = document.getElementById('res');
    respuesta.innerHTML=('');
    Players(nombre);
}

function Players(name){
    //Hacer peticion a la api con el nombre del jugador de interes
    const res = document.getElementById('res');

    fetch(`https://www.balldontlie.io/api/v1/players?search=${name}&per_page=100`)
	.then(response => response.json())
	.then(data => {
	 	const datos = data.data;
        const tabla = document.createElement('table');
        tabla.innerHTML = `
            <thead>
                <tr>
                    <th>Nombre</td>
                    <th>Apellido</td>
                    <th>Posicion</td>
                    <th>Altura en pies</td>
                    <th>Equipo</td>
                </tr>
            </thead>`
        datos.forEach(element => {
            tabla.innerHTML += `
                <tr onclick='stats(${element.id},"${element.first_name}","${element.last_name}")' id='${element.id}'> 
                    <td>${element.first_name}</td>
                    <td>${element.last_name}</td>
                    <td>${element.position}</td>
                    <td>${element.height_feet}</td>
                    <td>${element.team.name}</td>
                </tr>
            `
            res.appendChild(tabla);
        });
    })
	.catch(error => console.error(error));
}

function stats(id , f_name,l_name){
    //Funcion para que el usuario elija la temporada que desea buscar

    //Vaciar Div donde se imprimira la tabla
    const res = document.getElementById('res');   
    res.innerHTML=('');
    
    //Imprimir nombre del jugador
    const name = document.createElement('h1');
    name.innerText = (f_name + " " + l_name);
    res.appendChild(name);
    
    const tex = document.createElement('h2');
    tex.innerText = ("Promedios temporada 2022");
    res.appendChild(tex);  

    fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${id}`)
	.then(response => response.json())
	.then(data => {
        const datos = data.data;

        if(datos.length==0){
            res.innerHTML+=('Lo sentimos no hay datos del jugador');
        }
        
        const tabla = document.createElement('table');
        tabla.innerHTML = `
           <thead>
               <tr>
                   <th>Juegos</td>
                   <th>Minutos jugados</td>
                   <th>% Tiros</td>
                   <th>% Tiros 3 puntos</td>
                   <th>Puntos</td>
               </tr>
           </thead>            
           `
        datos.forEach(element => {
           tabla.innerHTML += `
               <tr>
                   <td>${element.games_played}</td>
                   <td>${element.min}</td>
                   <td>${element.fga}</td>
                   <td>${element.fg3a}</td>
                   <td>${element.pts}</td>
               </tr>
           `
           res.appendChild(tabla);
       });
   })
	.catch(error => console.error(error));
}

/*
function cambiar_season(){
    season+=1;
    console.log(season);
}

function tabla_estadisticas(id){
    //Funcion para crear la tabla de estadisticas del jugador buscado

    const res = document.getElementById('res');
    console.log(id);
    const bla = document.getElementById('season');
    console.log(bla);
    fetch(`https://www.balldontlie.io/api/v1/season_averages?season=${season}}&player_ids[]=${id}`)
	.then(response => response.json())
	.then(data => {
        const datos = data.data;
        console.log(datos)
        
        const tabla = document.createElement('table');
        tabla.innerHTML = `
           <thead>
               <tr>
                   <th>Juegos</td>
                   <th>Minutos jugados</td>
                   <th>% Tiros</td>
                   <th>% Tiros 3 puntos</td>
                   <th>Puntos</td>
               </tr>
           </thead>            
           `
        datos.forEach(element => {
           tabla.innerHTML += `
               <tr>
                   <td>${element.games_played}</td>
                   <td>${element.min}</td>
                   <td>${element.fga}</td>
                   <td>${element.fg3a}</td>
                   <td>${element.pts}</td>
               </tr>
           `
           res.appendChild(tabla);
       });
   })
	.catch(error => console.error(error));
}

//Crear seleccion de temporada
    const tem = document.createElement('select'); 
    tem.setAttribute('id','season');
    //tem.setAttribute('onchange', "cambiar_season()");
    //tem.addEventListener("onchange", cambiar_season());
    tem.innerHTML = `
        <option value="">Seleccione...</option>
        <option value="2022">2022</option>
		<option value="2021">2021</option>
		<option value="2020">2020</option>
		<option value="2019">2019</option>
        `
    res.appendChild(tem); 

*/