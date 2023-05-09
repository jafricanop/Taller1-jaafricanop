function Teams(){

    let link = "background-image: url('../../images/logos/')";

    const menu = document.getElementById('opciones').style.display = "block";
    const respon = document.getElementById('Rta');
    respon.innerHTML = ('');
    const main = document.getElementById('main');
    if(main){
        main.remove();
    }

    fetch(`https://www.balldontlie.io/api/v1/teams`)
	.then(response => response.json())
	.then(data => {

		const datos = data.data;
        for(let i=0; i <= datos.length ; i++){
            const card = document.createElement("div");
            link= "background-image: url('../../images/logos/" + datos[i].id + ".PNG";
            card.setAttribute('onclick','sTeam(this)');
            card.setAttribute('id', datos[i].id);
            card.setAttribute('class','cartas');
            card.setAttribute('style', link );

            
            const contenedor = document.createElement("div");
            const nombres = document.createElement("p");
            nombres.innerText = datos[i].name;
            contenedor.setAttribute('class','Names');
            contenedor.appendChild(nombres);
            card.appendChild(contenedor);

            respon.appendChild(card);
        }
           
    })
	.catch(error => console.error(error));

}


function sTeam(btn){
    //Obetener contenedor donde se mostrara la informacion
    const contenedor = document.getElementById(btn.id);
    contenedor.innerHTML = ('');
    //Obetener la informacion de un equipo especifico de la api
    fetch(`https://www.balldontlie.io/api/v1/teams/${btn.id}`)
    .then(response => response.json())
    .then(data => {

        //Se crea la division donde va la info
        const info = document.createElement("div");
        info.setAttribute('id','info');
        info.setAttribute('class','info');        
        
        info.innerText = "Nombre: " + data.full_name + "\n" + "Abreviacion: " + data.abbreviation + "\n" + "Ciudad: " + data.city + "\n" + "Conferencia: " + data.conference + "\n" + "Division: " + data.division;


        contenedor.appendChild(info);

    })
    .catch(error => console.error(error));
}