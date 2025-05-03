let fuelMarkersCluster = L.markerClusterGroup();

function clearfuelstationLayers() {
  if (mymap.hasLayer(fuelMarkersCluster)) {
    mymap.removeLayer(fuelMarkersCluster);
  }
  fuelMarkersCluster.clearLayers();
}

function task5() {
  
  clearfuelstationLayers();

  if (mymap.hasLayer(fuellayer)) {
    mymap.removeLayer(fuellayer);
    window.sidebar.hide();
    return;
  }

  fuelstations.features.forEach((feature) => {
    const coords = feature.geometry.coordinates;
    const props = feature.properties;
    const latlng = [coords[1], coords[0]];

    const marker = L.marker(latlng);

    marker.on("click", () => {
      const content = `
        <h2>${props.name || "Unnamed Fuel Station"}</h2>
      `;
      window.sidebar.setContent(content);
      window.sidebar.show();
    });

    fuelMarkersCluster.addLayer(marker);
  });

  mymap.addLayer(fuelMarkersCluster);

  mymap.fitBounds(fuelMarkersCluster.getBounds());
}

window.task5 = task5;
