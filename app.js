// Initialize and add the map
let marker
let tracker
let map

function initMap() {
    var uluru = {lat: -25.344, lng: 131.036};
    map = new google.maps.Map(document.getElementById('map'), {zoom: 4, center: uluru});
    marker = new google.maps.Marker({position: uluru, map: map});
    createButton('Start', startTracking, "btn btn-success")
    createButton('Stop', stopTracking, "btn btn-danger")
}

function createButton (text, clickFunction, classes) {
    let button = document.createElement('button')
    button.addEventListener('click', clickFunction)
    button.innerHTML = text
    button.className = classes

    document.querySelector('.buttons').append(button)
}

const trackmovement = () => {   
    fetch( `http://api.open-notify.org/iss-now.json`)
        .then(r => r.json())
        .then(r => {
            const { latitude, longitude } = r.iss_position
            marker.setPosition({
                lat: parseInt(latitude),
                lng: parseInt(longitude)
            })
            map.panTo({
                lat: parseInt(latitude),
                lng: parseInt(longitude)
            })
        })
        .catch(e => console.error(e)) 
}

function startTracking () {
    tracker = setInterval(trackmovement, 2000)
}
function stopTracking () {
    clearInterval(tracker)
}