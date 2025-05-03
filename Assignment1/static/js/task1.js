function task1() {
  var polylineCoords = [
    [60.604309, 15.634885],
    [60.60738, 15.63281], 
    [60.621410, 15.622422],
  ];
  var polyline = L.polyline(polylineCoords, { color: "red" })
    .addTo(mymap)
    .bindPopup("It is 3.3km to Bristen studentbostäder from Falun Knutpunkten");
  mymap.fitBounds(polyline.getBounds());

  var blackIcon = L.icon({
    iconUrl: "/static/img/map-marker.svg",
    iconSize: [32, 37],
    iconAnchor: [32, 37],
    popupAnchor: [0, -30],
  });

  L.marker([60.604309, 15.634885], { icon: blackIcon })
    .addTo(mymap)
    .bindPopup(
      `<h3>Falun Knutpunkten</h3><img src="/static/img/falun_knutpunkten.jpg" width="150px">`
    );

  // Klar
  var polygonCoords = [
    [60.600346, 15.611500],
    [60.598875, 15.608731],
    [60.597362, 15.611546],
    [60.599218, 15.615966],
  ];
  var polygon = L.polygon(polygonCoords, { color: "green" })
    .addTo(mymap)
    .bindPopup("<h1>Falun Gruvan</h1>");

  mymap.fitBounds(polygon.getBounds());
}

window.task1 = task1;
