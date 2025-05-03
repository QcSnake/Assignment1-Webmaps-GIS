let arenaOverlay = null;

var defaultIcon = L.icon({
  iconUrl: "/static/img/marker-icon.png",
  iconRetinaUrl: "/static/img/marker-icon-2x.png",
  shadowUrl: "/static/img/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function task4() {
  const imageBounds = [
    [59.598395, 15.223799],
    [59.597454, 15.225675],
  ];

  if (arenaOverlay && mymap.hasLayer(arenaOverlay)) {
    mymap.removeLayer(arenaOverlay);
    window.sidebar.hide();
    return;
  }

  arenaOverlay = L.imageOverlay("/static/img/Lidl.png", imageBounds); // Fixat
  arenaOverlay.addTo(mymap);
  arenaOverlay.bindPopup("<h1>Lindesberg Lidl</h1>");
  arenaOverlay.on("click", () => arenaOverlay.openPopup());
  mymap.fitBounds(imageBounds);

  window.sidebar.setContent(`
    <h2>Lidl</h2>
    <p>This image shows a Lidl in Lindesberg</p>
  `);
  window.sidebar.show();
}

window.task4 = task4;
