let newCity = ' ';
const cartelVerde = document.querySelector(".mensaje.green")
const cartelRojo = document.querySelector(".mensaje.red")
const cartelAmarillo = document.querySelector(".mensaje.yellow")
const loading = document.getElementById("div-carga");
const btnAgregar = document.getElementById("add-city-submit");


function exito() {
    loading.removeAttribute("style");
    loading.setAttribute("style", "display: none");        
    cartelRojo.removeAttribute("style");
    cartelRojo.setAttribute("style", "display: none");
    cartelAmarillo.removeAttribute("style");
    cartelAmarillo.setAttribute("style", "display: none");
    cartelVerde.removeAttribute("style");
    cartelVerde.setAttribute("style", "display: flex");
}

function existente(){
    loading.removeAttribute("style");
    loading.setAttribute("style", "display: none"); 
    cartelRojo.removeAttribute("style");
    cartelRojo.setAttribute("style", "display: none");       
    cartelVerde.removeAttribute("style");
    cartelVerde.setAttribute("style", "display: none");
    cartelAmarillo.removeAttribute("style");
    cartelAmarillo.setAttribute("style", "display: flex");
}

function error(){
    loading.removeAttribute("style");
    loading.setAttribute("style", "display: none"); 
    cartelVerde.removeAttribute("style");
    cartelVerde.setAttribute("style", "display: none");
    cartelAmarillo.removeAttribute("style");
    cartelAmarillo.setAttribute("style", "display: none");
    cartelRojo.removeAttribute("style");
    cartelRojo.setAttribute("style", "display: flex");
}

function addNewCityToLocalStorage() {
    let ciudad = document.getElementById("add-city").value;
    // registra la ciudad con mayusculas gracias a .toUpperCase() y sin espacios al final o adelante gracias a .trimp() 
    newCity = ciudad.toUpperCase().trim();

    try {
        loading.removeAttribute("style");
        loading.setAttribute("style", "display: block");    
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + newCity + '&appid=c4d912fb3ee953d0623afe3268b33688&units=metric&lang=es')
        .then(response => response.json())
        .then(datos => {
            let codigo = datos.cod;
            if (codigo == 200) {
                let cities = getCitiesFromLocalStorage();
                if (cities.indexOf(newCity) === -1) {
                    cities.push(newCity);
                    localStorage.setItem("CITIES", JSON.stringify(cities));
                    console.log("Se añadio la nueva ciudad con exito");
                    exito();
                } else if (cities.indexOf(newCity) > -1) {
                    console.log(newCity + ' Ya existe dentro del array de CITIES del localStorage');
                    existente();
                } else {
                    console.log("Huvo un error al añadir la nueva ciudad");
                    error();
                }            
            } else if (codigo == 404){
                console.log("Ciudad no encontrada o ciudad inexistente");
                error();
            }
        })
    } catch (error) {
        loading.removeAttribute("style");
        loading.setAttribute("style", "display: none");        
        console.log("NO se encuentra la ciudad introducida")
        console.log(error);
        cartelRojo.removeAttribute("style");
        cartelRojo.setAttribute("style", "display: flex");
    }
}


btnAgregar.addEventListener("click", addNewCityToLocalStorage); 