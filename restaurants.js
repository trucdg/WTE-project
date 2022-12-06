// Initialize and add the map
function initMap() {
    let map;
    //default Location is Boston University
    let location = {
        lat: 40.758896,
        lng: -73.985130,
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

    // nearbySearch by Google API
    // use eventListener on the input element to get users' input
    // pass in user's input to the nearbySearch service (search nearby places by keywords)

    const keywordInput = document.getElementById('keyword');
    keywordInput.addEventListener('change', (e) => {
        e.preventDefault();
        map = new google.maps.Map(mapContainer, {
            center: location,
            zoom: 12
        });
        createMarker(location, map);

        //get the target element to display the restaurants
        let restContainer = document.getElementById('restaurants-cont');
        restContainer.innerHTML = '<h2>Restaurants Near You </h2>';

        // create the PlacesService Object to use nearbySearch
        // find restaurants within 5000m of the user's location with matched keywords
        let request = {
            location: location,
            radius: '5000',
            type: 'restaurant'
        };
        request.keyword = keywordInput.value;
        let service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
    });

    // callback function passed into nearbySearch

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            let currentInfoWindow = null;
            let qty = Math.min(3, results.length);
            for (let i = 0; i < qty; i++) {
                let result = results[i];
                let contentString =
                    `<div style="color:black">` +
                    `<h3>${result.name}</h3>` +
                    `<p>Address: ${result.vicinity}</p>` +
                    `<p>Price Level: ${result.price_level}/4</p>` +
                    `<p>Rating: ${result.rating}/5 </p>` +
                    `</div>`;
                let infoWindow = new google.maps.InfoWindow({
                    content: contentString
                });
                let marker = new google.maps.Marker({
                    position: result.geometry.location,
                    map: map,
                    label: result.name,
                });
                marker.addListener('click', () => {
                    if (currentInfoWindow != null) {
                        currentInfoWindow.close();
                    };
                    infoWindow.open({
                        anchor: marker,
                        map,
                        shouldFocus: false,
                    });
                    currentInfoWindow = infoWindow;
                });

                //display Restaurants
                let newDiv = document.createElement('div');
                newDiv.classList.add('restaurant');
                document.querySelector('#restaurants-cont').appendChild(newDiv);
                let img = document.createElement('img');
                img.src = result.photos[0].getUrl();
                newDiv.appendChild(img);
                let infoBox = document.createElement('div');
                infoBox.innerHTML = contentString;
                newDiv.appendChild(infoBox);

            }
        }
    }
}






