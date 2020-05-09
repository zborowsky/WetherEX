
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      window.isSignedIn = true;
      updateNav();
    } else {
      // No user is signed in.
      window.isSignedIn = false;
    }
  });

const updateNav = () => {
    const signInNavItem = document.querySelector('#navItemSignIn');
    signInNavItem.innerText = 'My Profile';
}