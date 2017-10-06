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

if(document.location.href.split("//")[1].split("/")[0] != "localhost:8000"){
    if(document.location.href.split(":")[0] == "http"){
        document.location.href = document.location.href.replace("http", "https");
    }
}