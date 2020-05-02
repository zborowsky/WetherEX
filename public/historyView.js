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
        }
        else{
            console.log("no data");
        }
    });
}
