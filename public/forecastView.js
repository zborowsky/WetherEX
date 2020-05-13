
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      window.isSignedIn = true;
      updateForecastPageContent(user);
    } else {
      // No user is signed in.
      window.isSignedIn = false;
    }
  });

const updateForecastPageContent = user => {
    appendButtons();
    removeSelectedCityParagraph();
    appendCitySelectionElement();
}

const appendButtons = () => {
    const containerr = document.getElementById("forecast_version");
    const button2 = document.createElement("button");
    button2.setAttribute("type", "button");
    button2.setAttribute("class", "button-forecast");
    button2.innerText = "1 day Forecast";
    button2.addEventListener("click", function(){
    document.location.href = 'index.html';
});
containerr.appendChild(button2);

}

const removeSelectedCityParagraph = () => {
    document.getElementById("selectedCity").remove();
}

const appendCitySelectionElement = () => {
    const citySelectContainer = document.getElementById("citySelectionContainer");
    const selectElement = document.createElement("select");
    selectElement.classList.add("form-control");
    selectElement.addEventListener("change", onLocationChange);

    const locations = [
        {city: "Gdańsk, PL", id: 3099434},
        {city: "Kraków, PL", id: 3094802},
        {city: "Łódź, PL", id: 3093133},
        {city: "Warszawa, PL", id: 756135},
        {city: "Wrocław, PL", id: 3081368},
        {city: "Zakopane, PL", id: 3080866}
    ];
    locations.forEach(location => {
        const optionElement = document.createElement("option");
        optionElement.innerText = location.city;
        optionElement.setAttribute("value", location.id);
        if (location.city.includes("Krak")){
            optionElement.setAttribute("selected", "selected");
        }
        selectElement.appendChild(optionElement);
    })
    citySelectContainer.appendChild(selectElement);
}

const onLocationChange = event => {
    let api = `https://api.openweathermap.org/data/2.5/forecast?id=${event.target.value}&appid=4a89d59ce3f12e596683c0cf98f861f0&lang=en`;

    fetch(api)
        .then(function(response){
            let data = response.json();

            return data;
        })
        .then(function(data){
          fiveDayForecast.splice(0);
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
          var actualTable = document.getElementById('forecast');
          while (actualTable.firstChild) actualTable.removeChild(actualTable.firstChild);
          displayForecast();
        });
}
