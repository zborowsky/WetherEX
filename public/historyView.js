firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      window.isSignedIn = true;
      updateHistoryPageContent();
    } else {
      // No user is signed in.
      window.isSignedIn = false;
    }
  });

updateHistoryPageContent = () => {
    console.log("xD");
    const firestore = firebase.firestore();
    const userId = firebase.auth().currentUser.email;
    const docReference = firestore.collection("WeatherHistory").doc(userId);
    docReference.get().then(doc => {
        if(doc && doc.exists){
            const userData = doc.data();
            console.log(userData);
            populateAccordionElement(userData);
        }
        else{
            console.log("no data");
        }
    });
}

const populateAccordionElement = userData => {
    const accordionElement = document.getElementById("accordionExample");

    userData.history.forEach((weather, idx) => {
        const cardElement = document.createElement("div");
        cardElement.setAttribute("class", "card");
        cardElement.appendChild(createCardHeading(weather, idx));
        cardElement.appendChild(createCollapse(weather, idx));

        accordionElement.appendChild(cardElement);
    });
}

createCardHeading = (weather, id) => {
    const cardHeaderElement = document.createElement("div");
    cardHeaderElement.setAttribute("class", "card-header");
    cardHeaderElement.setAttribute("id", "heading" + id);

    const h2Element = document.createElement("h2");
    h2Element.setAttribute("class", "mb-0");

    const buttonElement = document.createElement("button");
    buttonElement.setAttribute("class", "btn collapsed");
    buttonElement.setAttribute("type", "button");
    buttonElement.setAttribute("data-toggle", "collapse");
    buttonElement.setAttribute("data-target", "#collapse" + id);
    buttonElement.setAttribute("aria-expanded", "true");
    buttonElement.setAttribute("aria-controls", "collapse" + id);

    const cityListElement = document.createElement("li");
    cityListElement.innerText = weather.city;

    const dateListElement = document.createElement("li");
    dateListElement.innerText = weather.date;

    const listElement = document.createElement("ul");
    listElement.setAttribute("class", "horizontal-list");
    listElement.appendChild(cityListElement);
    listElement.appendChild(dateListElement);

    buttonElement.appendChild(listElement);
    h2Element.appendChild(buttonElement);
    cardHeaderElement.appendChild(h2Element);

    return cardHeaderElement;
}

const createCollapse = (weather, id) => {
    const collapseElement = document.createElement("div");
    collapseElement.setAttribute("id", "collapse" + id);
    collapseElement.setAttribute("class", "collapse collapsed");
    collapseElement.setAttribute("aria-labelledby", "heading" + id);
    collapseElement.setAttribute("data-parent", "#accordionExample");

    const cardBodyElement = document.createElement("div");
    cardBodyElement.setAttribute("class", "card-body");
    cardBodyElement.innerText = weather.description;

    collapseElement.appendChild(cardBodyElement);

    return collapseElement;
}
