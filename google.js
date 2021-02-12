document.addEventListener("DOMContentLoaded", function(){

});


function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile()

  if (profile){
    $.post('/',
    {
      name: profile.getName(),
      email: profile.getEmail()
    })
    window.location.href = "./class/select/select.html"

  }
}
