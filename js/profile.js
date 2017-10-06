function getProfile(){
	var html = `
		<center>
		<img alt='' class='card-img-profile img-responsive' src='${firebase.auth().currentUser.photoURL}'>
		</center>
        <h4 class='card-title'>
            ${firebase.auth().currentUser.displayName}
            <small>${firebase.auth().currentUser.email}</small>
        </h4>
	`;

	$("#card-info").html(html);
}


firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		getProfile()
	} else {
		window.location = "/";
	}
});