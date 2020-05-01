
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

const onLocationChange = event => {
    console.log(event.target.value);
}
