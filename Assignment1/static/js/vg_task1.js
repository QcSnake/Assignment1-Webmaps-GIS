// Use Leaflet's default icon for city markers
var defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Define the list of cities
var cities = [
  {
    name: "Cape Town, South Africa",
    coords: [-33.89800254432449, 18.499471299066073],
    Quickfacts: "Population: 4.6 million, Area: 2,461 km²",
    address: "Cape Town, South Africa",
    info: "A vibrant city known for its stunning landscapes and culture.",
  },
  {
    name: "New York City, USA",
    coords: [40.712776, -74.005974],
    Quickfacts: "Population: 8.4 million, Area: 789 km²",
    address: "New York City, USA",
    info: "The largest city in the USA, known for its skyline and culture.",
  },
  {
    name: "Tokyo, Japan",
    coords: [35.689487, 139.691711],
    Quickfacts: "Population: 14 million, Area: 2,194 km²",
    address: "Tokyo, Japan",
    info: "The capital city of Japan, known for its modernity and tradition.",
  },
  {
    name: "Paris, France",
    coords: [48.856613, 2.352222],
    Quickfacts: "Population: 2.1 million, Area: 105 km²",
    address: "Paris, France",
    info: "The capital city of France, known for its art and culture.",
  },
  {
    name: "Dubai, UAE",
    coords: [25.276987, 55.296249],
    Quickfacts: "Population: 3.3 million, Area: 4,114 km²",
    address: "Dubai, UAE",
    info: "A modern city known for its luxury and skyscrapers.",
  },
];

var cityMarkers = [];

// Function to remove existing markers
function clearCityMarkers() {
  cityMarkers.forEach(function (marker) {
    mymap.removeLayer(marker);
  });
  cityMarkers = [];
}

// Function to add markers and fetch weather data on marker click
function vg_task1() {
  clearCityMarkers();

  // Show initial sidebar message
  window.sidebar.setContent("<h2>Select a City marker for more info</h2>");
  window.sidebar.show();

  cities.forEach(function (city) {
    var marker = L.marker(city.coords, { icon: defaultIcon }).addTo(mymap);
    cityMarkers.push(marker);

    marker.on("click", function () {
      // Show basic city info with a loading weather message
      window.sidebar.setContent(`
        <h2>${city.name}</h2>
        <p><strong>Address:</strong> ${city.address}</p>
        <p><strong>Quick facts:</strong> ${city.Quickfacts}</p>
        <p>${city.info}</p>
        <p><em>Loading weather information...</em></p>
      `);

      var lat = city.coords[0];
      var lon = city.coords[1];

      // Use WeatherAPI.com's current weather endpoint with your API key
      var weatherUrl = `https://api.weatherapi.com/v1/current.json?key=770ec5a5ed744876a57172350251304&q=${lat},${lon}`;

      // Debug: log the URL being fetched
      console.log("Fetching weather data from:", weatherUrl);

      // Get current weather data via fetch
      fetch(weatherUrl)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.json();
        })
        .then(function (data) {
          // Extract current temperature (in °C) and condition text from the response
          var temperature = data.current && data.current.temp_c ? data.current.temp_c : "N/A";
          var weatherDescription = data.current && data.current.condition && data.current.condition.text 
            ? data.current.condition.text 
            : "No description available";

          // Build the weather information HTML
          var weatherInfo = `
            <p><strong>Current Temperature:</strong> ${temperature}°C</p>
            <p><strong>Weather:</strong> ${weatherDescription}</p>
          `;

          // Update the sidebar with both city and weather information
          const content = `
            <h2>${city.name}</h2>
            <p><strong>Address:</strong> ${city.address}</p>
            <p><strong>Quick facts:</strong> ${city.Quickfacts}</p>
            <p>${city.info}</p>
            ${weatherInfo}
          `;
          window.sidebar.setContent(content);
        })
        .catch(function (err) {
          console.error("Weather API call error: ", err);
          const content = `
            <h2>${city.name}</h2>
            <p><strong>Address:</strong> ${city.address}</p>
            <p><strong>Quick facts:</strong> ${city.Quickfacts}</p>
            <p>${city.info}</p>
            <p><em>Failed to load weather data.</em></p>
          `;
          window.sidebar.setContent(content);
        });
    });
  });
}

// Expose the function globally so it can be called from anywhere
window.vg_task1 = vg_task1;
