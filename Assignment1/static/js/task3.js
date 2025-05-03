let supermarketMarkers = [];
let bufferLayer = null;
let nonOverlapLayer = null;

function clearSupermarketLayers() {
  supermarketMarkers.forEach(marker => mymap.removeLayer(marker));
  supermarketMarkers = [];

  if (bufferLayer) {
    mymap.removeLayer(bufferLayer);
    bufferLayer = null;
  }

  if (nonOverlapLayer) {
    mymap.removeLayer(nonOverlapLayer);
    nonOverlapLayer = null;
  }
}

function task3() {
  clearSupermarketLayers();

  if (mymap.hasLayer(supermarketlayer)) {
    mymap.removeLayer(supermarketlayer);
    window.sidebar.hide();
    return;
  }

  supermarketlayer.addTo(mymap);
  mymap.fitBounds(supermarketlayer.getBounds());

  supermarket.features.forEach(feature => {
    const [lon, lat] = feature.geometry.coordinates;
    const props = feature.properties;
    const latlng = [lat, lon];

    const marker = L.marker(latlng).addTo(mymap);
    supermarketMarkers.push(marker);

    marker.on("click", () => {
      const content = `
        <h2>${props.name || "Unnamed Supermarket"}</h2>
        ${props.opening_ho ? `<p><strong>Hours:</strong> ${props.opening_ho}</p>` : ""}
        ${props.operator ? `<p><strong>Operator:</strong> ${props.operator}</p>` : ""}
        ${props.website ? `<p><strong>Website:</strong> <a href='${props.website}' target='_blank'>${props.website}</a></p>` : ""}
        <p><em>Click more markers to compare supermarkets.</em></p>
      `;

      window.sidebar.setContent(content);
      window.sidebar.show();
    });
  });

  const buffers = supermarket.features.map(feature => {
    const buffer = turf.buffer(feature, 1, { units: "kilometers" });
    buffer.properties = feature.properties;
    return buffer;
  });

  const nonOverlapping = buffers.filter((buffer, i) => {
    return !buffers.some((other, j) => j !== i && turf.booleanIntersects(buffer, other));
  });

  bufferLayer = L.geoJSON(buffers, {
    style: { color: "blue", weight: 1, fillOpacity: 0.3 },
  }).addTo(mymap);

  nonOverlapLayer = L.geoJSON(nonOverlapping, {
    style: { color: "red", weight: 2, fillOpacity: 0.4 },
  }).addTo(mymap);
}

window.task3 = task3;
