
// MAP //
$(document).ready(function() {
function showMap() {

	// Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
	var queryURL = "https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200280920-62ec1f09ac521aa8e117ab800e4cda97";
	$.ajax({
	  url: queryURL,
	  method: "GET"
	}).then(function(response) {
 
	  // Printing the entire object to console
	  console.log(response);
 
	  // Empty the contents of the artist-div, append the new artist content
	  $("#map").append(response);
	});
  }

  showMap();

  function initMap() {
    // The location of Uluru
    var uluru = {lat: 41.8266548, lng: -87.93220009999999};
    var locations = [
    ['Fullersburg Woods', 41.8266548, -87.93220009999999, 4],
    ['Little Red School House Nature Center', 41.7089669, -87.87716069999999]
  ];
      var marker;
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: uluru});
    // The marker, positioned at Uluru
    for (i = 0; i < locations.length; i++) {  
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
    // var marker = new google.maps.Marker({position: uluru, map: map});
  }



  




//CONTACT FORM FOR HIKER RSVP//
  var hikerNameInput = $("#hikerName");
  var numberOfHikersInput = $("#numberOfHikers");
  var hikerEmailInput = $("#hikerEmail");

  var submitRSVPForm = $("#submitRSVP");

  $(submitRSVPForm).on("submit", handleSubmitRSVP);

  function handleSubmitRSVP(event) {
      event.preventDefault();
      console.log("button clicked")
      // Wont submit the post if we are missing a body, title, or author
      if (!hikerNameInput.val().trim()) {
        return;
      }
      // Constructing a newPost object to hand to the database
      var newHiker = {
          hikerName: hikerNameInput
              .val()
              .trim(),
          numberOfHikers: parseInt(numberOfHikersInput.val()),
              
          hikerEmail: hikerEmailInput
              .val()
              .trim()
      };
      console.log(newHiker);
      submitRSVP(newHiker);    
  }

  function submitRSVP(hikerInfo) {
      $.post("/api/hikers", hikerInfo, function() {
        getHikers();
      });
  }

  function getHikers() {
      $.get("/api/hikers", renderHikerList);
  }
  // show message that hiker has successfully RSVP'd

  function renderHikerList(hikerData) {
      console.log(hikerData);
      $("#hikerDisplay").append(hikerData[0]); 
  }

});