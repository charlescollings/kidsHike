$(document).ready(function() {

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