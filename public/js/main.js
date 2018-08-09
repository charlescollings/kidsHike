
// hike data
var locations = [
    ['Fullersburg Woods', 41.8266548, -87.93220009999999, "http://www.dupageforest.org/places-to-go/forest-preserves/fullersburg-woods " , "https://cdn2.hubspot.net/hubfs/2920355/Places-to-Go/Documents/Forest-Preserves/Fullersburg-Woods-Trails-Guide-2017.pdf?t=1528217538568"],
    ['Little Red School House Nature Center', 41.7089669, -87.87716069999999, "http://fpdcc.com/nature-centers/little-red-schoolhouse-nature-center/ ", "https://map.fpdcc.com/#/?poi=319-Little+Red+Schoolhouse+Nature+Center"],
    ['Starved Rock State Park', 41.3508119, -88.84122539999998, "http://www.starvedrockstatepark.org/ ", "https://www.starvedrockstatepark.org/wp-content/uploads/TrailMap_11x17-2018.pdf"],
    ['Morton Arboretum', 41.8163563, -88.0691635, "http://www.mortonarb.org/ ", "http://www.mortonarb.org/files/16MRK_HikingMap_112116_OPTIM.pdf"],
    ['Shabbona State Park', 41.759148, -88.8699532, "https://shabbonalake.com/ ", "http://shabbonalake.com/"],
    ['Maple Grove', 41.7946368, -88.02769380000001, "http://www.dupageforest.org/places-to-go/forest-preserves/maple-grove ", "https://cdn2.hubspot.net/hubfs/2920355/Places-to-Go/Documents/Forest-Preserves/Maple-Grove-Trails-Guide-2017.pdf?t=1528217538568"],
    ['Waterfall Glen Forest Preserve', 41.7505384, -87.9758569, "http://www.dupageforest.org/places-to-go/forest-preserves/waterfall-glen ", "https://www.dupageforest.org/hubfs/Places-to-Go/Documents/Forest-Preserves/Waterfall-Glen-Trails-Guide-2017.pdf?t=1527873634916"],
    ['Mary Mix McDonald Woods', 42.1524212, -87.77867090000001, "https://www.chicagobotanic.org/gardens/mcdonaldwoods ", "https://www.chicagobotanic.org/walk/tours#tours/map/13"],
    ['Harms Woods', 42.0672578, -87.77150110000002, "http://fpdcc.com/harms-woods/ ", "https://map.fpdcc.com/#/?search=harms"],
    ['Crabtree Nature Center', 42.1103167, -88.16070439999999, "http://fpdcc.com/nature-centers/crabtree-nature-center/ ", "http://fpdcc.com/downloads/maps/nature-centers/english/FPCC-Crabtree-Nature-Center-Map-4-17.pdf"],
    ['Ryerson Woods', 42.18163, -87.91497809999998, "https://www.lcfpd.org/ryerson/ ", "https://maps.lakecountyil.gov/trailmap/?&extent=-9787719.5845%2C5185043.3545%2C-9784767.2043%2C5189811.1142%2C102100"],
    ['Busse Woods', 42.0338661, -88.02348689999997, "http://fpdcc.com/busse-woods/ ", "http://fpdcc.com/downloads/maps/trails/english/FPCC-Busse-Trail-Map-9-16.pdf"],

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
            var map = new google.maps.Map(
                document.getElementById('map'), {zoom: 8, center: centerSpot});

            for (i = 0; i < preserves.length; i++) {   
                marker = new google.maps.Marker({
                  position: new google.maps.LatLng(preserves[i].geometry.coordinates[1], preserves[i].geometry.coordinates[0]),
                  map: map,

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

//CONTACT FORM FOR HIKER RSVP//
var hikerNameInput = $("#hikerName");
var numberOfHikersInput = $("#numberOfHikers");
var hikerEmailInput = $("#hikerEmail");
var submitRSVPForm = $("#submitRSVP");
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];

$(submitRSVPForm).on("submit", handleSubmitRSVP);
$(span).on("click", closeModal);

function handleSubmitRSVP(event) {
    event.preventDefault();
    if (!hikerNameInput.val().trim()) {
      return;
    }

    var newHiker = {
        hikerName: hikerNameInput
            .val()
            .trim(),
        numberOfHikers: parseInt(numberOfHikersInput.val()),
            
        hikerEmail: hikerEmailInput
            .val()
            .trim()
    };

    submitRSVP(newHiker);
    showConfirm();    
};

function submitRSVP(hikerInfo) {
    $.post("/api/hikers", hikerInfo);
  };

function showConfirm() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}


 