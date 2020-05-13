// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");

const locationElement = document.getElementById("selectedCity");
const tempElement = document.getElementById("temp");
const fellElement = document.getElementById("feelLike");
const humadityElement = document.getElementById("humadity");
const pressureElement = document.getElementById("pressure");
const descElement = document.getElementById("description");

// App data
const weather = {};

var storage = firebase.storage().ref();

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;

// API KEY
const key = "4a89d59ce3f12e596683c0cf98f861f0";

window.addEventListener('load', e => {
    new getTodaysWeather();
    registerSW();
  });

async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('service-worker.js');
    } catch (e) {
      console.error('ServiceWorker registration failed. Sorry about that.');
    }
  } else {
    document.querySelector('.alert').removeAttribute('hidden');
  }
}

function getTodaysWeather(){
    let api = `https://api.openweathermap.org/data/2.5/weather?id=3094802&appid=${key}&lang=en`;

    fetch(api)
        .then(function(response){
            let data = response.json();

            return data;
        })
        .then(function(data){
          console.log(data);
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.pressure = data.main.pressure;
            weather.apparentTemperature =  Math.floor(data.main.feels_like - KELVIN);
            weather.humadity = data.main.humidity;
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
            loadIcon();
        });
}

function displayWeather(){
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    fellElement.innerHTML = `${weather.apparentTemperature}°<span>C</span>`;
    humadityElement.innerHTML = `${weather.humadity}%`;
    pressureElement.innerHTML = `${weather.pressure} hPa`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

function loadIcon(){
  storage.child(weather.iconId + ".png")
  .getDownloadURL()
  .then((url) => {
    iconElement.innerHTML = `<img src="${url}"/>`;
  }).catch((error) => {
      console.log(error)
  });
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}


// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        let fahrenheit_feel=celsiusToFahrenheit(weather.apparentTemperature);
        fahrenheit = Math.floor(fahrenheit);
        fahrenheit_feel = Math.floor(fahrenheit_feel);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        fellElement.innerHTML = `${fahrenheit_feel}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        fellElement.innerHTML = `${weather.apparentTemperature}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});
