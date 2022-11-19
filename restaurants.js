// Initialize and add the map
function initMap() {
    let map;
    //default Location is Boston University
    let location = {
        lat: 42.350876,
        lng: -71.106918,
    };

    let mapOptions = {
        center: location,
        zoom: 12,
    }

    const mapContainer = document.getElementById("map");

    //create the map 
    map = new google.maps.Map(mapContainer, mapOptions);

    const icon = "https://img.icons8.com/plasticine/100/000000/user-location.png";

    //createMarker function, which takes in 2 inputs: (location, map)

    function createMarker(location, map) {
        let marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: icon,
        });
    }

    // create a marker centered at BU
    createMarker(location, map);

    // get location of the use using the user's browser geolocation
    if (navigator.geolocation) {
        console.log("Geolocation is supported!");

        navigator.geolocation.getCurrentPosition(
            (currentPosition) => {
                location.lat = currentPosition.coords.latitude;
                location.lng = currentPosition.coords.longitude;
                map = new google.maps.Map(mapContainer, mapOptions);
                createMarker(location, map);
            },

            (err) => {
                console.log("Access to Geolocation is denied!");
                console.log("Map is centered at default location.");
                console.log(err.message);
                map = new google.maps.Map(mapContainer, mapOptions);
                createMarker(location, map);
            }
        );
    } else {
        // geolocation is not supported
        console.log("Geolocation is not supported by the browser!");
        console.log("Map is centered at the default location");
        map = new google.maps.Map(mapContainer, mapOptions);
        createMarker(location, map);
    }

    // add Autocomplete feature of the places library

    let autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("search-input"),
        {
            type: ["establishment"],
            fields: ["geometry", "name"],
        }
    );

    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        // when user enters a location that is not suggested by autocomplete
        // or autocomplete fails to get a place
        if (!place.geometry) {
            alert(`No details available for input: '${place.name}' \n
                    Please select a location from the dropdown!`);
        } else {
            location = place.geometry.location;
            map = new google.maps.Map(mapContainer, {
                center: location,
                zoom: 13,
            });

            console.log("location entered:" + location);
            createMarker(location, map);
        }
    });
}

window.initMap = initMap;