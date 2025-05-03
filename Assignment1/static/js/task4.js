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
    [59.63151595124441, 16.528875970173914],
    [59.63252769848319, 16.530340786934413],
  ];

  if (arenaOverlay && mymap.hasLayer(arenaOverlay)) {
    mymap.removeLayer(arenaOverlay);
    window.sidebar.hide();
    return;
  }

  arenaOverlay = L.imageOverlay("/static/img/arena.png", imageBounds); // ✅ FIXED
  arenaOverlay.addTo(mymap);
  arenaOverlay.bindPopup("<h1>Expandia Arena</h1>");
  arenaOverlay.on("click", () => arenaOverlay.openPopup());
  mymap.fitBounds(imageBounds);

  window.sidebar.setContent(`
    <h2>Expandia Arena</h2>
    <p>This image shows the layout of the arena Vasagatan 89, 722 23 Västerås.</p>
  `);
  window.sidebar.show();
}

window.task4 = task4;
