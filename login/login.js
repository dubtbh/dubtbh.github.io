(function() {
  firebase.initializeApp({
    apiKey: "AIzaSyDswph-PsDgkJl0F7uun6ka3p6JBIP38g8",
    authDomain: "dubtbh-6b0d9.firebaseapp.com",
    databaseURL: "https://dubtbh-6b0d9.firebaseio.com",
    projectId: "dubtbh-6b0d9",
    storageBucket: "dubtbh-6b0d9.appspot.com",
    messagingSenderId: "348480340889"
  });
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', {
    signInSuccessUrl: '../read',
    signInOptions: [
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ]
  });
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      location.assign("../read");
    }
  });
})();