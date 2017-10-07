function getFeed(){

	var uid = firebase.auth().currentUser.uid;

	firebase.database().ref("all").on("child_added", (data)=>{


		$("#card-nodata").hide();


		var html = `
			<div class="row">
	            <div class="col s12 m6">
	                <div class="card blue-grey darken-1">
	                    <div class="card-content white-text">

	                        <div class="chip">
	                            <img src="${data.val().photoURL}" alt="Contact Person">
	                            ${data.val().author}
	                        </div>
	                        <span class="card-title">${data.val().title}</span>
	                        <p class="card-post-body">${data.val().content}</p>
	                    </div>
	                    <div class="card-action">
	                        <a href="#">Like</a>
	                        <a href="#">Comment</a>
	                    </div>
	                </div>
	            </div>
	        </div>
		`;

		console.log(data.val());

		document.querySelector("#cards-slot").innerHTML += html; 

	})

}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    getFeed()
  } else {

  }
});