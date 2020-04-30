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
            return true;
        },
        uiShown: function () {
            document.getElementById('loader').style.display = 'none';
        }
    },
    signInFlow: 'popup',
    signInSuccessUrl: 'user.html',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
};

ui.start('#firebaseui-auth-container', uiConfig);
