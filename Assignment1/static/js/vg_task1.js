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
    name: "Mogadishu, Somalia",
    coords: [2.0469, 45.3182],
    Quickfacts: "Population: 2.2 million, Area: 91 km²",
    address: "Mogadishu, Somalia",
    info: "The capital and largest city of Somalia, located on the Indian Ocean coast.",
  },
  {
    name: "Stockholm, Sweden",
    coords: [59.3293, 18.0686],
    Quickfacts: "Population: 975,000, Area: 188 km²",
    address: "Stockholm, Sweden",
    info: "The capital of Sweden, spread across 14 islands with a beautiful blend of historic and modern architecture.",
  },
  {
    name: "Beijing, China",
    coords: [39.9042, 116.4074],
    Quickfacts: "Population: 21.5 million, Area: 16,410 km²",
    address: "Beijing, China",
    info: "The capital of China, known for its ancient sites such as the Forbidden City and modern architecture.",
  },
  {
    name: "Brasília, Brazil",
    coords: [-15.7801, -47.9292],
    Quickfacts: "Population: 3.1 million, Area: 5,802 km²",
    address: "Brasília, Brazil",
    info: "The capital city of Brazil, known for its modernist architecture and unique city planning.",
  },
  {
    name: "Canberra, Australia",
    coords: [-35.2809, 149.1300],
    Quickfacts: "Population: 430,000, Area: 814 km²",
    address: "Canberra, Australia",
    info: "The capital city of Australia, carefully planned with large areas of natural vegetation and Lake Burley Griffin.",
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
  
  // Adjust view to show all cities - world view
  mymap.setView([20, 0], 2);

  cities.forEach(function (city) {
    var marker = L.marker(city.coords, { icon: defaultIcon }).addTo(mymap);
    cityMarkers.push(marker);

    marker.on("click", function () {
      // Zoom to the clicked city
      mymap.setView(city.coords, 10);
      
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
      var weatherUrl = `https://api.weatherapi.com/v1/current.json?key=c65e680ed6994968b04191053250305&q=${lat},${lon}`;

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
