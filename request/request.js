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
    signInSuccessURL: "#",
    signInOptions: [{
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      recaptchaParameters: {
        type: 'image', // 'audio'
        size: 'invisible', // 'invisible' or 'compact'
        badge: 'bottomright' //' bottomright' or 'inline' applies to invisible.
      }
    }]
  });
  var $submit = document.getElementById("submit");
  $submit.onclick = function() {
    var thingMissing = false;
    var req = document.getElementsByClassName("required")
    for(var i = 0; i < req.length; i++) {
      var thing = req[i];
      if(!thing.value || thing.value == "") {
        thingMissing = true;
      }
    }
    if(thingMissing) return;
    var obj = {
      displayName: document.getElementById("displayName").value,
      header: document.getElementById("header").value,
      themeColor: document.getElementById("themeColor").value,
      textColor: document.getElementById("textColor").value,
      accentColor: document.getElementById("accentColor").value,
      placeholder: document.getElementById("placeholder").value,
      title: document.getElementById("pageTitle").value,
      uid: document.getElementById("uid").value,
      destination: "DESTINATION",
      path: "PATH",
      email: document.getElementById("email").value,
      name: document.getElementById("name").value
    };
    var key = firebase.database().ref("requests").push().key;
    firebase.database().ref("requests").child(key).set(obj).then(function() {
      location.assign("/");
    }).
    catch(function(err) {
      alert(err);
    });
    console.log(obj);
  };
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      document.getElementById("uid").value = user.uid;
      document.getElementById("firebaseui-auth-container").remove();
    }
  })
})();