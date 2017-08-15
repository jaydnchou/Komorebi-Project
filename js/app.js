// Initialize Firebase
var config = {
apiKey: "AIzaSyAzyxZ1l_5rolG_KkLIe-86QXpWAsAtjn0",
authDomain: "ga-project-7e05a.firebaseapp.com",
databaseURL: "https://ga-project-7e05a.firebaseio.com",
projectId: "ga-project-7e05a",
storageBucket: "ga-project-7e05a.appspot.com",
};

firebase.initializeApp(config);
var database = firebase.database();

/////////////////////////////////////////////////////////

var reservationData = {};


// Get Reservation-Day Data
$('.reservation-day').on('change', function() {
    reservationData.day = $(this).val();
});// end event listener


// Update 'Name' Property of reservationData Object
$('.reservations').on('submit', function(event) {
    event.preventDefault();
    reservationData.name = $('.reservation-name').val();
    // push reservation object to firebase
    database.ref('reservations').push(reservationData);
});// end event listener


// Add each Reservation and Update View
database.ref('reservations').on('child_added', function(snapshot) {
    // get element 
    var reservationList = $('.reservation-list');
    // get data from db
    var reservations = snapshot.val();
    // get template from script tag
    var source = $('#reservation-template').html();
    // compile template
    var template = Handlebars.compile(source);
    // pass data to template to be evaluated within Handlebars
    var reservationTemplate = template(reservations);
    // insert data into page
    reservationList.append(reservationTemplate);
})

/////////////////////////////////////////////////////////

// Create Map - Google Maps API 
function initMap () {
    var cafe = {lat: -33.8726629, lng: 151.2044161};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: cafe,
    });

    var marker = new google.maps.Marker({
        position: cafe,
        map: map,
        animation:google.maps.Animation.BOUNCE
    });
}