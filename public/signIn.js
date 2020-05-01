
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      window.isSignedIn = true;
      updatePageContent(user);
    } else {
      // No user is signed in.
      window.isSignedIn = false;
    }
  });

const updatePageContent = user => {
    const signInContainer = document.getElementById("signInContainer");
    const authContainer = document.getElementById("firebaseui-auth-container");
    const listElement = document.createElement("ul");
    const nameListElement = document.createElement("li");
    const emailListElement = document.createElement("li");
    
    nameListElement.innerText = "Profile Name: " + user.displayName;
    emailListElement.innerText = "Email: " + user.email;

    listElement.appendChild(nameListElement);
    listElement.appendChild(emailListElement);

    authContainer.remove();
    signInContainer.appendChild(listElement);
}