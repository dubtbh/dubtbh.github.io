(function() {
    window.tbh = function(config) {
        try {
            // Initialize Firebase
            var fbConfig = {
                apiKey: "AIzaSyDswph-PsDgkJl0F7uun6ka3p6JBIP38g8",
                authDomain: "dubtbh-6b0d9.firebaseapp.com",
                databaseURL: "https://dubtbh-6b0d9.firebaseio.com",
                projectId: "dubtbh-6b0d9",
                storageBucket: "dubtbh-6b0d9.appspot.com",
                messagingSenderId: "348480340889"
            };
            firebase.initializeApp(fbConfig);
            var displayName = config.displayName,
                path = config.path,
                header = config.header,
                textAreaPlaceholder = config.textAreaPlaceholder,
                colors = {
                    themeColor: config.themeColor,
                    accentColor: config.accentColor,
                    textColor: config.textColor
                };
            var $navBar = document.getElementById("navBar"),
                $navBarDisplayName = $navBar.firstElementChild,
                $tbhArea = document.getElementById("tbhArea"),
                $makeTBH = document.getElementById("makeTBH"),
                $tbhName = document.getElementById("tbhName"),
                $submitTBH = document.getElementById("submitTBH"),
                populateConfig = function() {
                    //theme colour
                    $navBarDisplayName.innerText = header;
                    $navBar.style.backgroundColor = colors.themeColor;
                    $navBar.style.color = colors.textColor;
                    $submitTBH.style.backgroundColor = colors.themeColor;
                    $submitTBH.style.color = colors.textColor;
                    $navBar.style.borderBottom = "1px solid " + colors.accentColor;
                    $tbhArea.setAttribute("placeholder", textAreaPlaceholder);
                };
            var tbhHasValidText = function($tbhArea) {
                var text = $tbhArea.value.trim();
                var name = $tbhName.value.trim();
                if(text == "" || name.length > 15) {
                    return $submitTBH.setAttribute("disabled", true) ? false : false;
                }
                return $submitTBH.removeAttribute("disabled") ? true : true;
            }
            $tbhArea.oninput = function() {
                tbhHasValidText($tbhArea);
            };
            $submitTBH.onclick = function() {
                if(tbhHasValidText($tbhArea)) {
                    $submitTBH.setAttribute("disabled", true);
                    $submitTBH.innerText = "Loading...";
                    var text = $tbhArea.value.trim();
                    var name = $tbhName.value.trim();
                    var uploadObject = {
                        name: name,
                        text: text,
                        liked: false,
                        posterData: {
                            userAgent: navigator.userAgent || "",
                            language: navigator.language || "",
                            connection: (navigator.connection || {type: "unknown"}).type,
                            vendor: navigator.vendor || ""
                        }
                    };
                    var database = firebase.database();
                    var ref = database.ref("tbhContent/" + path);
                    var key = ref.push().key;
                    ref.child(key).set(uploadObject).then(function(a, b, c) {
                        $makeTBH.innerHTML = "<div id='successDiv'><h1>Your TBH was successfully posted!</h1><br><a href='https://dubtbh.ml'><button>Ask for your own TBH page!</button></a></div>";
                    }).
                    catch(function(error) {
                        alert("We encountered an error posting your TBH: " + error);
                        location.reload();
                    });
                }
            };
            populateConfig();
            $tbhArea.focus();
        } catch (e) {
            document.body.innerHTML = (e);
        }
    };
})();