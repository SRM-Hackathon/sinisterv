var currLocation = {};

var currentState;


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
	var content = document.querySelector("#blog-content").value;

	if(title != "" && content != ""){
		var uid = firebase.auth().currentUser.uid;
		var timestamp = Math.floor(Date.now() / 1000);

		var blogData = {
			title: title,
			content: content,
			date: getDate(),
			location: currLocation
		}

		firebase.database().ref( uid + "/blg" + timestamp + "/").set(blogData);
		firebase.database().ref( currentState + "/blg" + timestamp + "/").set(blogData);

		console.log(blogData);
	}else{
		console.log("Fill in the fields!");
	}
}


// console.log(getCity() + "/blgefsgggdfgfdg");