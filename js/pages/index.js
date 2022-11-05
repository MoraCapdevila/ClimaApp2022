const btnConsultar = document.getElementById("submit");
const selctCities = document.getElementById("city-list");

function getCitiesFromLocalStorage() {
    let cities = localStorage.getItem("CITIES");
    if (cities) {
        cities = JSON.parse(cities);
    } else {
        cities = [];
    }
    return cities;
}

function showCitiesSelect() {
    let cities = getCitiesFromLocalStorage();
    for (let i = 0; i < cities.length; i++) {
        let option = document.createElement('option');
        let valor = cities[i];
        option.text = valor;
        selctCities.appendChild(option);
    }
}

showCitiesSelect();

function showAlert() {
    const cartelAmarillo = document.getElementById("alert-no-cities");
    let cities = getCitiesFromLocalStorage();
    if (cities.length === 0) {
        cartelAmarillo.removeAttribute("style");
        cartelAmarillo.setAttribute("style", "display: flex");
        console.log("No hay ciudades guardadas en el localStorage");
    }
}


const titleCity = document.getElementById("city-title");
const climaImagen = document.getElementById("img-clima");
const carta = document.getElementById("carta-clima");
const loading = document.getElementById("div-carga");
let nombre;
let icono;
let temperatura;
let sensacionTermica;
let humedad;
let velocidadDelViento;
let presion;

function fetchAPI() {
    loading.removeAttribute("style");
    loading.setAttribute("style", "display: block");
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+selctCities.value+'&appid=c4d912fb3ee953d0623afe3268b33688&units=metric&lang=es')
        .then(response => response.json())
        .then(datos => {
            loading.removeAttribute("style");
            loading.setAttribute("style", "display: none");
            console.log(datos);
            removesChildsCard();
            createCard(datos);
        })
    .catch(error => alert("La API no funcionó"))
}

function createCard(datos){
    // City title 
    let name = datos['name'];
    nombre = name;
    titleCity.innerHTML = nombre;
    // Imagen de clima 
    let imgClima = datos.weather[0].icon;
    let imgCode = "http://openweathermap.org/img/w/" + imgClima + ".png";
    icono = imgCode;
    climaImagen.setAttribute("src", icono);
    // Temperatura 
    let mainTemp = datos['main']['temp'];
    let p_temp = document.createElement('p'); 
    p_temp.setAttribute("id", "temperatura");
    temperatura = mainTemp;
    p_temp.textContent = 'Temperatura: ' + temperatura + "°";
    // Sensación termica
    let mainFeelsLike = datos['main']['feels_like'];
    sensacionTermica = mainFeelsLike;
    let p_feels_like = document.createElement('p');
    p_feels_like.setAttribute("id", "sensacion_termica");
    p_feels_like.textContent = 'Sensación termica: ' + sensacionTermica + "°";
    // Humedad
    let mainHumidity = datos['main']['humidity'];
    humedad = mainHumidity;
    let p_humidity = document.createElement('p');
    p_humidity.setAttribute("id", "humedad");
    p_humidity.textContent = 'Humedad: ' + humedad + '%'; 
    // Velocidad de viento
    let mainWindSpeed = datos['wind']['speed'];
    velocidadDelViento = mainWindSpeed;
    let p_wind_speed = document.createElement('p');
    p_wind_speed.setAttribute("id", "velocidad_del_viento");
    p_wind_speed.textContent = 'Velocidad del viento: ' + velocidadDelViento + 'km/h';
    // Presión
    let mainPressure = datos['main']['pressure'];
    presion = mainPressure;
    let p_pressure = document.createElement('p');
    p_pressure.setAttribute("id", "presion");
    p_pressure.textContent = "Presión: " + presion + " P";

    carta.appendChild(p_temp);
    carta.appendChild(p_feels_like);
    carta.appendChild(p_humidity);
    carta.appendChild(p_wind_speed);
    carta.appendChild(p_pressure);
    carta.removeAttribute("style");
    carta.setAttribute("style", "display: block");
}

function removesChildsCard() {
    let pTemp = document.getElementById("temperatura");
    let pFeelsLike = document.getElementById("sensacion_termica");
    let pHumidity = document.getElementById("humedad");
    let pWindSpeed = document.getElementById("velocidad_del_viento");
    let pPressure = document.getElementById("presion");
    if (pTemp != null) { 
        carta.removeChild(pTemp);
        carta.removeChild(pFeelsLike);
        carta.removeChild(pHumidity);
        carta.removeChild(pWindSpeed);
        carta.removeChild(pPressure);
    }
}


btnConsultar.addEventListener("click", fetchAPI);
selctCities.addEventListener("click", showAlert);
