(function() {
    var template = '<li data-tbh=%ID%><div class=tbhControls><a href="javascript:toggleLikeTBH(\'%ID%\')" class="liked%LIKED%"><i class="fa fa-heart" aria-hidden="true"></i></a><a href="javascript:deleteTBH(\'%ID%\')"><i class="fa fa-trash" aria-hidden="true"></i></a></div><div class=liDataEqual><div class=liData><span class=tbhLabel>Name:</span><p class=tbhName>%NAME%</p><span class=tbhLabel>Text:</span><p class=tbhText>%TEXT%</div><details><summary>In-Depth Data</summary><div class=liData><span class=tbhLabel>Connection:</span><div class=liDataEqual>%CONNECTION%</div><span class=tbhLabel>Language:</span><div class=liDataEqual>%LANGUAGE%</div><span class=tbhLabel>User-Agent:</span><div class=liDataEqual>%USERAGENT%</div><span class=tbhLabel>Vendor:</span><div class=liDataEqual>%VENDOR%</div></div></details></div>';
    var auth = firebase.auth();
    auth.onAuthStateChanged(function(user) {
        if(!user) {
            return location.assign("../login");
        }
        var uid = user.uid;
        var userPath = firebase.database().ref("userPaths/" + uid);
        userPath.once("value").then(function(userPathSnapshot) {
            if(!userPathSnapshot.val()) {
                return location.assign("../logout");
            }
            var userPath = userPathSnapshot.val();
            loadUserPath(userPath);
        });
    });
    var escape = function(string) {
        var el = document.createElement('span');
        el.innerText = string;
        return el.innerHTML;
    };
    var loadUserPath = function(path) {
        var tbhPath = firebase.database().ref("tbhContent/" + path);
        tbhPath.on("value", function(snapshot) {
            var $tbhList = document.getElementById("tbhList");
            $tbhList.innerHTML = "";
            var tbhs = snapshot.val();
            window.toggleLikeTBH = function(id) {
                var path = tbhPath.child(id).child("liked");
                path.once("value").then(function(snapshot) {
                    if(snapshot.val()) path.set(false);
                    if(!snapshot.val()) path.set(true);
                });
            };
            window.deleteTBH = function(id) {
                var path = tbhPath.child(id);
                path.set(null);
            };
            for(var tbh_ in tbhs) {
                var tbh = tbhs[tbh_],
                    id = tbh_,
                    name = escape(tbh.name),
                    text = escape(tbh.text),
                    connection = escape(tbh.posterData.connection),
                    language = escape(tbh.posterData.language),
                    userAgent = escape(tbh.posterData.userAgent),
                    vendor = escape(tbh.posterData.vendor),
                    liked = tbh.liked,
                    resolvedTemplate = template.replace(/%ID%/g, id).replace(/%NAME%/g, name).replace(/%TEXT%/g, text).replace(/%CONNECTION%/g, connection).replace(/%LANGUAGE%/g, language).replace(/%USERAGENT%/g, userAgent).replace(/%VENDOR%/g, vendor).replace(/%LIKED%/g, liked);
                $tbhList.innerHTML += resolvedTemplate;
            }
        });
    };
})();