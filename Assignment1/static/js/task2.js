// Use Leaflet's default icon for school markers
var defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

var schools = [
  {
    name: "Hagagymnasiet",
    coords: [60.489157, 15.414135],
    students: 800,
    address: "Läroverksgatan 6, 784 40 Borlänge",
    info: "A well-known gymnasium in Borlänge.",
  },
  {
    name: "Borlänge High",
    coords: [60.49, 15.42],
    students: 1200,
    address: "Street 1, Borlänge",
    info: "A popular high school in the city.",
  },
  {
    name: "Central Elementary",
    coords: [60.485, 15.43],
    students: 600,
    address: "Street 2, Borlänge",
    info: "An elementary school in the city center.",
  },
  {
    name: "Eastside School",
    coords: [60.4875, 15.41],
    students: 500,
    address: "Street 3, Borlänge",
    info: "A school on the east side of Borlänge.",
  },
  {
    name: "Westside Academy",
    coords: [60.4905, 15.405],
    students: 700,
    address: "Street 4, Borlänge",
    info: "An academy known for its strong academic programs.",
  },
];

var schoolMarkers = [];
var polylineMeasureControl = null;

function clearSchoolMarkers() {
  schoolMarkers.forEach(function (marker) {
    mymap.removeLayer(marker);
  });
  schoolMarkers = [];
}

function task2() {
  clearSchoolMarkers();

  // Show sidebar
  window.sidebar.setContent("<h2>Select a school marker for more info</h2>");
  window.sidebar.show();

  // Add markers
  schools.forEach(function (school) {
    var marker = L.marker(school.coords, { icon: defaultIcon }).addTo(mymap);
    schoolMarkers.push(marker);

    marker.on("click", function () {
      const content = `
        <h2>${school.name}</h2>
        <p><strong>Address:</strong> ${school.address}</p>
        <p><strong>Number of Students:</strong> ${school.students}</p>
        <p>${school.info}</p>
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

  // Connect schools
  var lineCoords = schools.map(function (school) {
    return { lat: school.coords[0], lng: school.coords[1] };
  });
  polylineMeasureControl.seed([lineCoords]);
}

// Expose globally
window.task2 = task2;
