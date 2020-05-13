const fiveDayForecast = [];

const key = "4a89d59ce3f12e596683c0cf98f861f0";

window.addEventListener('load', e => {
    new getForecast();
    registerSW();
  });

const KELVIN = 273;

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


function getForecast(){
      let api = `https://api.openweathermap.org/data/2.5/forecast?id=3094802&appid=${key}&lang=en`;
      fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            var i;
            for (i = 0; i < data.list.length; i++) {
              fiveDayForecast.push([
                  data.list[i].dt_txt,
                  Math.floor(data.list[i].main.temp - KELVIN),
                  Math.floor(data.list[i].main.feels_like - KELVIN),
                  data.list[i].main.humidity,
                  data.list[i].main.pressure,
                  data.list[i].weather[0].description,
                ]);
            }
        })
        .then(function(){
            displayForecast();
          })
}

function displayForecast(){
  var table = document.createElement('table');
  var theads = ['Date', 'Temperature', 'Feels like', 'Humadity', 'Pressure', 'Description'];
  var thead = document.createElement('thead');
  thead.style.textAlign = "center";
  for (var b = 0; b < theads.length; b++) {
    var th = document.createElement('th');
    th.textContent = theads[b];
    thead.appendChild(th);
  }
    for (var i = 0; i < fiveDayForecast.length; i++) {
        var row = document.createElement('tr');
        for (var j = 0; j < fiveDayForecast[i].length; j++) {
            var cell = document.createElement('td');
            cell.textContent = fiveDayForecast[i][j];
            row.appendChild(cell);
        }
        table.appendChild(thead);
        table.appendChild(row);
    }
    document.getElementById("forecast").appendChild(table).classList.add("table");
}
