
// this is our hike data
var locations = [
    ['Fullersburg Woods', 41.8266548, -87.93220009999999, "http://www.dupageforest.org/places-to-go/forest-preserves/fullersburg-woods " , "https://cdn2.hubspot.net/hubfs/2920355/Places-to-Go/Documents/Forest-Preserves/Fullersburg-Woods-Trails-Guide-2017.pdf?t=1528217538568"],
    ['Little Red School House Nature Center', 41.7089669, -87.87716069999999, "http://fpdcc.com/nature-centers/little-red-schoolhouse-nature-center/ ", "https://map.fpdcc.com/#/?poi=319-Little+Red+Schoolhouse+Nature+Center"],
    ['Starved Rock State Park', 41.3508119, -88.84122539999998, "http://www.starvedrockstatepark.org/ ", "https://www.starvedrockstatepark.org/wp-content/uploads/TrailMap_11x17-2018.pdf"],
    ['Morton Arboretum', 41.8163563, -88.0691635, "http://www.mortonarb.org/ ", "http://www.mortonarb.org/files/16MRK_HikingMap_112116_OPTIM.pdf"],
    ['Shabbona State Park', 41.759148, -88.8699532, "https://shabbonalake.com/ ", "http://shabbonalake.com/"],
    ['Maple Grove', 41.7946368, -88.02769380000001, "http://www.dupageforest.org/places-to-go/forest-preserves/maple-grove ", "https://cdn2.hubspot.net/hubfs/2920355/Places-to-Go/Documents/Forest-Preserves/Maple-Grove-Trails-Guide-2017.pdf?t=1528217538568"],
    ['Waterfall Glen Forest Preserve', 41.7505384, -87.9758569, "http://www.dupageforest.org/places-to-go/forest-preserves/waterfall-glen ", "https://www.dupageforest.org/hubfs/Places-to-Go/Documents/Forest-Preserves/Waterfall-Glen-Trails-Guide-2017.pdf?t=1527873634916"]
];

function pageLoad() {
    for (var i=0; i < locations.length; i++) {
        $("#hikes-text").append("<div class='hikes-text-info'><span class='icon fas fa-tree'></span>&nbsp;" + locations[i][0] + "<div class='trail-sub-text'><a class='ghost-link' href=javascript:showHikeMarker(" + locations[i][1] + "," + locations[i][2] + ")>View on map</a><a class='ghost-link' target='_blank' href=" + locations[i][3] + ">Get more info</a><a class='ghost-link' target='_blank' href=" + locations[i][4] + ">See trail map</a><br></div></div>");
    }
};

pageLoad();

function showHikeMarker(latitude, longitude) {
  var clickedHike = {lat: latitude, lng: longitude};
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 10, center: clickedHike});
  var marker = new google.maps.Marker({position: clickedHike, map: map});
}

var kidsHikeMap = $("#kidsHikesMap");
var forestPresMap = $("#forestPresMap");

$(kidsHikeMap).on("submit", initMap);
$(forestPresMap).on("submit", renderForestPresMap);

function renderForestPresMap() {
    $.ajax({
        url: "/api/locations/preserves",
        method: "GET"
      }).then(function(response) {
            let preserves = response.features;
            var infowindow = new google.maps.InfoWindow();
            var marker, i
            var centerSpot = {lat: 41.8163563, lng: -88.0691635};
            // The map, centered at centrerSpot
            var map = new google.maps.Map(
                document.getElementById('map'), {zoom: 8, center: centerSpot});

                // var image = {
                //     url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                //     // This marker is 20 pixels wide by 32 pixels high.
                //     size: new google.maps.Size(20, 32),
                //     // The origin for this image is (0, 0).
                //     origin: new google.maps.Point(0, 0),
                //     // The anchor for this image is the base of the flagpole at (0, 32).
                //     anchor: new google.maps.Point(0, 32)
                //   };

            // The markers, positioned at all fores preserves
            for (i = 0; i < preserves.length; i++) {   
                marker = new google.maps.Marker({
                  position: new google.maps.LatLng(preserves[i].geometry.coordinates[1], preserves[i].geometry.coordinates[0]),
                  map: map,
                  // icon: image
                });
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                  return function() {
                    infowindow.setContent(preserves[i].properties.name);
                    infowindow.open(map, marker);
                  }
                })(marker, i));
            }
    });
};



function initMap() {
    var infowindow = new google.maps.InfoWindow();
    var marker, i

    // The location to center map
    var centerSpot = {lat: locations[3][1], lng: locations[3][2]};

    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 8, center: centerSpot});
    
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
  }



//function showMap() {
//
//	// Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
//	var queryURL = "https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200280920-62ec1f09ac521aa8e117ab800e4cda97";
//	$.ajax({
//	  url: queryURL,
//	  method: "GET"
//	}).then(function(response) {
// 
//	  // Printing the entire object to console
//	  console.log(response);
// 
//	  // Empty the contents of the artist-div, append the new artist content
//	  $("#map").append(response);
//	});
//  }
//
//  showMap();


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
    };

  function submitRSVP(hikerInfo) {
      $.post("/api/hikers", hikerInfo, function() {
        getHikers();
      });
    };

  function getHikers() {
      $.get("/api/hikers", renderHikerList);
    };
  // show message that hiker has successfully RSVP'd

  function renderHikerList(hikerData) {
      console.log(hikerData);
      $("#hikerDisplay").append(hikerData[0]); 
    };

 