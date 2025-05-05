// Use Leaflet's default icon for location markers
var defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

var places = [
  {
    name: "Svampen",
    coords: [59.288219539789274, 15.22547660538062],
    visitors: 150000,
    address: "Svampen, 703 75 Örebro",
    info: "Iconic mushroom-shaped water tower with observation deck and restaurant offering panoramic city views.",
  },
  {
    name: "Örebro Castle",
    coords: [59.2740032006127, 15.215429349689321],
    visitors: 200000,
    address: "Kansligatan 1, 703 61 Örebro",
    info: "Medieval castle on an island in Svartån river dating back to the 13th century.",
  },
  {
    name: "Wadköping",
    coords: [59.2727495408786, 15.232793913207129],
    visitors: 120000,
    address: "Bertil Wadströms gata, 702 11 Örebro",
    info: "Open-air museum with historic buildings and craft shops showing Örebro's cultural heritage.",
  },
  {
    name: "Stortorget",
    coords: [59.2718620582811, 15.213385000984674],
    visitors: 500000,
    address: "Stortorget, 703 61 Örebro",
    info: "Main square in the city center with shops, restaurants and cultural events.",
  },
  {
    name: "Örebro University",
    coords: [59.25482345641353, 15.249287612431942],
    visitors: 17000,
    address: "Fakultetsgatan 1, 702 81 Örebro",
    info: "Modern university campus with around 17,000 students and beautiful grounds.",
  },
];

var placeMarkers = [];
var polylineMeasureControl = null;

function clearPlaceMarkers() {
  placeMarkers.forEach(function (marker) {
    mymap.removeLayer(marker);
  });
  placeMarkers = [];
}

function task2() {
  clearPlaceMarkers();

  // Immediately zoom to Örebro
  mymap.setView([59.27412, 15.2151], 13); // Örebro city center

  // Show sidebar
  window.sidebar.setContent("<h2>Select a landmark marker for more info</h2>");
  window.sidebar.show();

  // Add markers
  places.forEach(function (place) {
    var marker = L.marker(place.coords, { icon: defaultIcon }).addTo(mymap);
    placeMarkers.push(marker);

    marker.on("click", function () {
      const content = `
        <h2>${place.name}</h2>
        <p><strong>Address:</strong> ${place.address}</p>
        <p><strong>Annual Visitors:</strong> ${place.visitors}</p>
        <p>${place.info}</p>
      `;
      window.sidebar.setContent(content);
    });
  });

  // Remove existing measure control if present
  if (polylineMeasureControl) {
    mymap.removeControl(polylineMeasureControl);
  }

  // Polyline Measure
  var options = {
    position: "topright",
    unit: "kilometres",
    showBearings: true,
    clearMeasurementsOnStop: false,
    showClearControl: true,
  };
  polylineMeasureControl = L.control.polylineMeasure(options).addTo(mymap);

  // Connect places
  var lineCoords = places.map(function (place) {
    return { lat: place.coords[0], lng: place.coords[1] };
  });
  polylineMeasureControl.seed([lineCoords]);
}

// Expose globally
window.task2 = task2;
