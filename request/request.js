(function() {
  var $submit = document.getElementById("submit");
  $submit.onclick = function() {
    var obj = {
      displayName:document.getElementById("displayName").value,
      header:document.getElementById("header").value,
      themeColor:document.getElementById("themeColor").value,
      textColor:document.getElementById("textColor").value,
      accentColor:document.getElementById("accentColor").value,
      placeholder:document.getElementById("placeholder").value,
      title:document.getElementById("pageTitle").value
    };
    console.log(obj);
  };
})();