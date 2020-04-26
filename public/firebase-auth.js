 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyCKqbw3QfGpf-KNCz0o88WQsMEM_hx7LvA",
    authDomain: "weterex.firebaseapp.com",
    databaseURL: "https://weterex.firebaseio.com",
    projectId: "weterex",
    storageBucket: "weterex.appspot.com",
    messagingSenderId: "480424916593",
    appId: "1:480424916593:web:48a86ea0aa5f0bb8098dd0",
    measurementId: "G-C7KR5WZ7QN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'user.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
};
ui.start('#firebaseui-auth-container', uiConfig);