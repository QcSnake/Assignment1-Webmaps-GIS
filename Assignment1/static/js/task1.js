function task1() {
  var polylineCoords = [
    [60.483526405604536, 15.42558658483017],
    [60.48503811382744, 15.430350187859899],
    [60.48445669593737, 15.435113790878386],
  ];
  var polyline = L.polyline(polylineCoords, { color: "red" })
    .addTo(mymap)
    .bindPopup("Route from Borlänge Centralstation to Scandic hotel ");
  mymap.fitBounds(polyline.getBounds());

  var blackIcon = L.icon({
    iconUrl: "/static/img/map-marker.svg", // ✅ FIXED
    iconSize: [32, 37],
    iconAnchor: [32, 37],
    popupAnchor: [0, -30],
  });

  L.marker([60.48368396381887, 15.425904399624885], { icon: blackIcon })
    .addTo(mymap)
    .bindPopup(
      `<h3>Borlänge Centralstation</h3><img src="/static/img/borlange.jpg" width="150px">` // ✅ FIXED
    );

  var polygonCoords = [
    [60.48487596888646, 15.417347074630516],
    [60.48469372960908, 15.41911016553006],
    [60.48365470949412, 15.418879570535022],
    [60.483711513276134, 15.417010790262756],
  ];
  var polygon = L.polygon(polygonCoords, { color: "green" })
    .addTo(mymap)
    .bindPopup("<h1>Kupolen</h1>");

  mymap.fitBounds(polygon.getBounds());
}

window.task1 = task1;
function task1() {
  var polylineCoords = [
    [60.483526405604536, 15.42558658483017],
    [60.48503811382744, 15.430350187859899],
    [60.48445669593737, 15.435113790878386],
  ];
  var polyline = L.polyline(polylineCoords, { color: "red" })
    .addTo(mymap)
    .bindPopup("Route from Borlänge Centralstation to Scandic hotel ");
  mymap.fitBounds(polyline.getBounds());

  var blackIcon = L.icon({
    iconUrl: "/static/img/map-marker.svg", // ✅ FIXED
    iconSize: [32, 37],
    iconAnchor: [32, 37],
    popupAnchor: [0, -30],
  });

  L.marker([60.48368396381887, 15.425904399624885], { icon: blackIcon })
    .addTo(mymap)
    .bindPopup(
      `<h3>Borlänge Centralstation</h3><img src="/static/img/borlange.jpg" width="150px">` // ✅ FIXED
    );

  var polygonCoords = [
    [60.48487596888646, 15.417347074630516],
    [60.48469372960908, 15.41911016553006],
    [60.48365470949412, 15.418879570535022],
    [60.483711513276134, 15.417010790262756],
  ];
  var polygon = L.polygon(polygonCoords, { color: "green" })
    .addTo(mymap)
    .bindPopup("<h1>Kupolen</h1>");

  mymap.fitBounds(polygon.getBounds());
}

window.task1 = task1;
