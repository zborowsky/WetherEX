// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;

// API KEY
const key = "4a89d59ce3f12e596683c0cf98f861f0";

window.addEventListener('load', e => {
    new getTodaysWeather();
    new getForecast();
    registerSW(); 
  });

async function registerSW() { 
  if ('serviceWorker' in navigator) { 
    try {
      await navigator.serviceWorker.register('/service-worker.js'); 
    } catch (e) {
      alert('ServiceWorker registration failed. Sorry about that.'); 
    }
  } else {
    document.querySelector('.alert').removeAttribute('hidden'); 
  }
}

// GET WEATHER FROM API PROVIDER
function getTodaysWeather(){
    let api = `https://api.openweathermap.org/data/2.5/weather?id=3094802&appid=${key}&lang=pl`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
      console.log(data)
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}


function getForecast(){
      let api = `https://api.openweathermap.org/data/2.5/forecast?id=3094802&appid=${key}&lang=pl`;
      let fiveDayForecast = [];
      fetch(api)
        .then(function(response){
            let data = response.json();
      console.log(data)
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
            document.getElementById("content").appendChild(buildTable(fiveDayForecast));
        }) 
}

function buildTable(data) {
    var table = document.createElement("table");
    table.className="table table-sm";
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    var headRow = document.createElement("tr");
    ["Name","Height","Country"].forEach(function(el) {
      var th=document.createElement("th");
      th.appendChild(document.createTextNode(el));
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead); 
    data.forEach(function(el) {
      var tr = document.createElement("tr");
      for (var o in el) {  
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(el[o]))
        tr.appendChild(td);
      }
      tbody.appendChild(tr);  
    });
    table.appendChild(tbody);             
    return table;
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
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
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

