// Initialize and add the map
function initMap() {
    let map;
    //default Location is Boston University
    let location = {
        lat: 42.350876,
        lng: -71.106918,
    };

    // The map, centered at Boston University
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: location,
    });

    // The marker, positioned at Boston University
    const marker = new google.maps.Marker({
        position: location,
        map: map,
    });
}

window.initMap = initMap;