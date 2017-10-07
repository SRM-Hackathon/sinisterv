var posts = {};

var currLocation = {};

var currentState;

var map;

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
        // console.log(data.results[0].address_components[6].long_name);
        currentState = data.results[0].address_components[6].long_name;
        initMap();
    })
}


function initMap() {

	document.querySelector("#map").style.height = window.innerHeight - 7 + "px";

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {

    		userLocation = {
    			lat: position.coords.latitude,
    			lng: position.coords.longitude
    		};

    		map = new google.maps.Map(document.getElementById("map"), {
    			zoom: 19,
    			center: userLocation,
    			styles: mapStyle
    		});

            var tempPost;

            firebase.database().ref("all" + "/").on('child_added', function(data) {
                tempPost = data.val();

                // console.log(data.key);
                // console.log(tempPost);

                var lat = data.val().location.lat;
                var lng = data.val().location.lng;

                // showToast(data.val().author + " has uploaded new exiciting things!");


                if(posts.hasOwnProperty(lat + "-" + lng)){
                    posts[lat + "-" + lng].push(tempPost);
                }else{
                    posts[lat + "-" + lng] = [tempPost];
                    new google.maps.Marker({
                        position: data.val().location,
                        // icon: "images/blog.png",
                        map: map,
                    }).addListener("click", function(){
                        showInfo(lat + "-" + lng, this);
                    })
                }
            });

		});
	}
}

function showInfo(geoString, marker){

    post = posts[geoString];

    var links = "";

    for (item in post){
        links += `
            <span class="mdl-chip mdl-chip--contact mdl-chip--deletable">
                <a href="#" onclick="showModal('${geoString}', ${item})">
                    <img class="mdl-chip__contact" src="${post[item].photoURL}"></img>
                    <span class="mdl-chip__text">${post[item].author}</span>
                </a>
            </span>
        `;
    }

    var infoWindow = new google.maps.InfoWindow({
        content: `<div>${links}</div>`
    });

    infoWindow.open(map, marker);
    
}


function showModal(geoString, item){
    var modalHTML = `
        <div class="modal fade" id="my-modal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document" id="modal-frame">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h3 class="modal-title">${posts[geoString][item].title}</h3>
              </div>
              <div class="modal-body">
                ${posts[geoString][item].author}
                <p id="blog-modal-content">${posts[geoString][item].content}</p>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    `;

    $("#modal-div").html(modalHTML);

    $("#my-modal").modal("show");
}

function showToast(message){
    document.querySelector('#demo-toast-example').MaterialSnackbar.showSnackbar({message: message})
}

if(document.location.href.split("//")[1].split("/")[0] != "localhost:8000"){
    if(document.location.href.split(":")[0] == "http"){
        document.location.href = document.location.href.replace("http", "https");
    }
}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    
  } else {
    window.location = "/";
  }
});


function signOut(){
  firebase.auth().signOut()
}


const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]