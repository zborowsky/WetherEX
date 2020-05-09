// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
// const tempElement = document.querySelector(".temperature-value p");
// const descElement = document.querySelector(".temperature-description p");

// const notificationElement = document.querySelector(".notification");

const locationElement = document.getElementById("selectedCity");
const tempElement = document.getElementById("temp");
const fellElement = document.getElementById("feelLike");
const humadityElement = document.getElementById("humadity");
const pressureElement = document.getElementById("pressure");
const descElement = document.getElementById("description")

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
    getTodaysWeather();
    // new getForecast();
    registerSW();
  });

async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/service-worker.js');
    } catch (e) {
      console.error('ServiceWorker registration failed. Sorry about that.');
    }
  } else {
    document.querySelector('.alert').removeAttribute('hidden');
  }
}

// GET WEATHER FROM API PROVIDER
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
            weather.wind = data.weather.wind;
            weather.humadity = data.main.humidity;
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
            setBackground();
        });
}


function getForecast(){
      let api = `https://api.openweathermap.org/data/2.5/forecast?id=3094802&appid=${key}&lang=pl`;
      let fiveDayForecast = [];
      fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            var i;
            for (i = 0; i < data.list.length; i++) {
              fiveDayForecast.push({
                  temperature: Math.floor(data.list[i].main.temp - KELVIN),
                  description: data.list[i].weather[0].description,
                  iconId: data.list[i].weather[0].icon
                });
            }
          console.log(fiveDayForecast);
        })
}


// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    fellElement.innerHTML = `${weather.apparentTemperature}°<span>C</span>`;
    humadityElement.innerHTML = `${weather.humadity}%`;
    pressureElement.innerHTML = `${weather.pressure} hPa`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

function imageName() {
    const temp = weather.temperature.value;
      if (temp > 20) {
        return 'hot.jpg'
      } else if (temp > 10) {
        return 'rain.jpg'
      } else {
        return 'cold.jpg'
      }
}

function setBackground() {
    storage.child(imageName()).getDownloadURL().then((url) => {
        document.body.style.backgroundImage = `url(${url})`;
      }).catch((error) => {
          console.log(error)
      });
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

