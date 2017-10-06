function googleLogin(){

	var provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithRedirect(provider);

	firebase.auth().getRedirectResult().then(function(result) {
	if (result.credential) {
		var token = result.credential.accessToken;
	}
	var user = result.user;
	}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		var email = error.email;
		var credential = error.credential;
	});


}

function facebookLogin(){

	var provider = new firebase.auth.FacebookAuthProvider();

	firebase.auth().signInWithRedirect(provider);

	firebase.auth().getRedirectResult().then(function(result) {
		if (result.credential) {
		var token = result.credential.accessToken;
	}
		var user = result.user;
	}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		var email = error.email;
		var credential = error.credential;
	});

}

function signOut(){
	firebase.auth().signOut()
}

$("#login").hide();
$("#loader").show();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("logged in!!");
    window.location = "main.html"
  } else {
    console.log("logged out!!");
    $("#login").show();
    $("#loader").hide();
  }
});