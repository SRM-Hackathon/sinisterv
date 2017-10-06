var posts = {};

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
        // console.log(data.results[0].address_components[6].long_name);
        currentState = data.results[0].address_components[6].long_name;
        initMap();
    })
}


function initMap() {

	document.querySelector("#map").style.height = window.screen.availHeight + "px";

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {

    		userLocation = {
    			lat: position.coords.latitude,
    			lng: position.coords.longitude
    		};

    		var map = new google.maps.Map(document.getElementById("map"), {
    			zoom: 17,
    			center: userLocation,
    			styles: mapStyle
    		});

            var tempPost;

            firebase.database().ref(currentState + "/").on('child_added', function(data) {
                tempPost = data.val();

                // console.log(data.key);
                // console.log(tempPost);

                var lat = data.val().location.lat;
                var lng = data.val().location.lng;

                if(posts.hasOwnProperty(lat + "-" + lng)){
                    posts[lat + "-" + lng].push(tempPost);
                }else{
                    posts[lat + "-" + lng] = [tempPost];
                    new google.maps.Marker({
                        position: data.val().location,
                        map: map,
                    }).addListener("click", function(){
                        showInfo(lat + "-" + lng, this);
                    })
                }
            });

			var infowindow2 = new google.maps.InfoWindow({
			    content: `<a href="#">Link to somewhere else</a>`
			});

		});
	}
}

function showInfo(geoString, marker){

    post = posts[geoString];

    var links = "";

    for (item in post){
        links += `
        <li><a href="#" onclick="showModal('${geoString}', ${item})">
        ${post[item].title}
        </a></li>
        `;
    }

    // console.log(links);
    // console.log(post);

    var infoWindow = new google.maps.InfoWindow({
        content: `<ul>${links}</ul>`
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
                <h4 class="modal-title">${posts[geoString][item].title}</h4>
              </div>
              <div class="modal-body">
                <p>${posts[geoString][item].content}</p>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    `;

    $("#modal-div").html(modalHTML);

    $("#my-modal").modal("show");

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