(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly').scrolly({
				offset: function() {
					return $header.height();
				}
			});

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right'
				});

	});

})(jQuery);


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