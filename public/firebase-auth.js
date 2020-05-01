var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            window.isSignedIn = true;
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
