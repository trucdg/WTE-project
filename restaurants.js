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

    // create Marker function

    function createMarker(location, map) {
        let marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: icon,
        });
    }

    createMarker(location, map);
}

window.initMap = initMap;