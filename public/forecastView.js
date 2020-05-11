
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
    removeSelectedCityParagraph();
    appendCitySelectionElement();
    appendAddToHistoryButton();
}

const removeSelectedCityParagraph = () => {
    document.getElementById("selectedCity").remove();
}

const appendCitySelectionElement = () => {
    const citySelectContainer = document.getElementById("citySelectionContainer");
    const selectElement = document.createElement("select");
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

const appendAddToHistoryButton = () => {
    const container = document.getElementById("addToHistoryButtonContainer");
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "button-history");
    button.innerText = "Add to history";
    button.addEventListener("click", onAddToHistoryClick);
    container.appendChild(button);
}

const onLocationChange = event => {
    let api = `https://api.openweathermap.org/data/2.5/weather?id=${event.target.value}&appid=4a89d59ce3f12e596683c0cf98f861f0&lang=en`;

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
            loadIcon();
        });
}

const onAddToHistoryClick = () => {
    console.log(weather);
    stripUndefined(weather);
    const firestore = firebase.firestore();
    const userId = firebase.auth().currentUser.email;
    const docReference = firestore.collection("WeatherHistory").doc(userId);
    docReference.get().then(doc => {
        if(doc && doc.exists){
            const userData = doc.data();
            console.log(userData);
            weather.date = getFormattedCurrentDate();
            userData.history.push(weather)
            docReference.set(userData);
        }
        else{
            weather.date = getFormattedCurrentDate();
            docReference.set({history: [weather]});
        }
    });
}

const stripUndefined = obj => {
    const properties = Object.keys(obj);
    properties.forEach(prop => {
        if(obj[prop] === undefined){
            delete obj[prop];
        }
    })

}

const getFormattedCurrentDate = () => {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    }
    today = dd+'/'+mm+'/'+yyyy;

    return today;
}
