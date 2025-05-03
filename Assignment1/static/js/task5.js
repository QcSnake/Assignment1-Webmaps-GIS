// Create a global marker cluster group variable for fuel stations.
let fuelMarkersCluster = L.markerClusterGroup();

// Function to clear any previously added clustered fuel station markers.
function clearfuelstationLayers() {
  if (mymap.hasLayer(fuelMarkersCluster)) {
    mymap.removeLayer(fuelMarkersCluster);
  }
  fuelMarkersCluster.clearLayers();
}

// Define Task 5 for fuel stations with clustering
function task5() {
  // Clear any previous markers/clusters.
  clearfuelstationLayers();

  // If the fuel GeoJSON layer is already on the map, remove it and hide the sidebar.
  if (mymap.hasLayer(fuellayer)) {
    mymap.removeLayer(fuellayer);
    window.sidebar.hide();
    return;
  }

  // Loop through each fuel station feature in your GeoJSON data.
  // IMPORTANT: Update "fuel.features" to "fuelstations.features" if your fuel data is defined as "fuelstations"
  fuelstations.features.forEach((feature) => {
    const coords = feature.geometry.coordinates;
    const props = feature.properties;
    // Convert [lon, lat] into Leaflet's [lat, lon] order.
    const latlng = [coords[1], coords[0]];

    // Create a marker (do not add it directly to the map)
    const marker = L.marker(latlng);

    // Bind a click event to open the sidebar with feature details.
    marker.on("click", () => {
      const content = `
        <h2>${props.name || "Unnamed Fuel Station"}</h2>
        ${props.opening_ho ? `<p><strong>Hours:</strong> ${props.opening_ho}</p>` : ""}
        ${props.operator ? `<p><strong>Operator:</strong> ${props.operator}</p>` : ""}
        ${props.website ? `<p><strong>Website:</strong> <a href="${props.website}" target="_blank">${props.website}</a></p>` : ""}
        <p><em>Click more markers to compare fuel stations.</em></p>
      `;
      window.sidebar.setContent(content);
      window.sidebar.show();
    });

    // Add the marker to the cluster group.
    fuelMarkersCluster.addLayer(marker);
  });

  // Add the cluster group to the map.
  mymap.addLayer(fuelMarkersCluster);

  // Optionally adjust the map to the bounds of the marker clusters.
  mymap.fitBounds(fuelMarkersCluster.getBounds());
}

// Expose the task5 function globally.
window.task5 = task5;
