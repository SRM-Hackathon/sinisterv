var currLocation = {};

var currentState;

var postState;


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
}

function showPosition(position) {
    currLocation = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
	};

	var API_KEY = "AIzaSyAwmDkG8MmwilGeUia3DaRMhui-z1nmr78";
    var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currLocation.lat},${currLocation.lng}&key=${API_KEY}`;

    $.get(url, (data) => {
        console.log(data.results[0].address_components[6].long_name);
        currentState = data.results[0].address_components[6].long_name;
    })
}

function getDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd<10){
	    dd='0'+dd;
	} 
	if(mm<10){
	    mm='0'+mm;
	} 
	var today = dd+'/'+mm+'/'+yyyy;

	return today
}

function postBlogPost(){

	var title = document.querySelector("#blog-title").value;

	if(postState == "text"){
		var content = document.querySelector("#blog-content").value;
	}else{

		var videoURL = document.querySelector("#blog-video").value.replace("watch?v=", "embed/")

		var content = `
			<iframe width="560" height="315" src="${videoURL}" 
			frameborder="0" allowfullscreen></iframe>
		`;
	}

	if(title != "" && content != ""){
		var uid = firebase.auth().currentUser.uid;
		var timestamp = Math.floor(Date.now() / 1000);

		var blogData = {
			title: title,
			content: content,
			date: getDate(),
			author: firebase.auth().currentUser.displayName,
			photoURL: firebase.auth().currentUser.photoURL,
			location: currLocation
		}

		firebase.database().ref( uid + "/blg" + timestamp + "/").set(blogData);
		firebase.database().ref( currentState + "/blg" + timestamp + "/").set(blogData);
		firebase.database().ref( "all/blg" + timestamp + "/").set(blogData);

		console.log(blogData);

		document.querySelector("#blog-title").value = "";
		document.querySelector("#blog-content").value = "";
		document.querySelector("#blog-video").value = "";

		showToast("Your beautiful content has been uploaded!");

		// window.location = "main.html"

	}else{
		console.log("Fill in the fields!");
	}
}


function postVideo(){
	$("#blog-content").hide();
	$("#post-text-button").show();
	$("#post-video-button").hide();
	$("#blog-video").show();
	postState = "video";
}

function postText(){
	$("#blog-content").show();
	$("#post-text-button").hide();
	$("#post-video-button").show();
	$("#blog-video").hide();
	postState = "text";
}


function showToast(message){
	document.querySelector('#demo-toast-example').MaterialSnackbar.showSnackbar({message: message})
}

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {

	} else {
		window.location = "/";
	}
});

if(document.location.href.split("//")[1].split("/")[0] != "localhost:8000"){
    if(document.location.href.split(":")[0] == "http"){
        document.location.href = document.location.href.replace("http", "https");
    }
}

postText();