var currLocation = {};

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

	var uid = firebase.auth().currentUser.uid;
	var timestamp = Math.floor(Date.now() / 1000);

	var blogData = {
		title: "test title",
		content: "test content",
		date: getDate(),
		location: currLocation
	}

	firebase.database().ref( uid + "/blg" + timestamp + "/").set(blogData);
	firebase.database().ref( getCity() + "/blg" + timestamp + "/").set(blogData);

	console.log(blogData);
}

function getCity(){
	var API_KEY = "AIzaSyAwmDkG8MmwilGeUia3DaRMhui-z1nmr78";
	var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currLocation.lat},${currLocation.lng}&key=${API_KEY}`;

	$.get(url, (data) => {
		console.log(data.results[0].address_components[6].long_name);
		return data.results[0].address_components[6].long_name;
	})
}



// console.log(getCity() + "/blgefsgggdfgfdg");