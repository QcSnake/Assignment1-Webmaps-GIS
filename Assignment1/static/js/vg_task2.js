// vg_task2.js – Clustered school points with color-coded markers

// Define color palette for clusters
const clusterColors = ['red', 'blue', 'green', 'orange', 'purple', 'cyan', 'magenta'];

// Helper: create a colored circle marker
function makeClusterMarker(lat, lon, color) {
  return L.circleMarker([lat, lon], {
    radius: 8,
    fillColor: color,
    color: '#000',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  });
}

function vg_task2() {
  clearCityMarkers();

  window.sidebar.setContent('<h2>School Clusters</h2><p>Loading…</p>');
  window.sidebar.show();

  d3.csv("/static/data/school_locations_clustered.csv").then(function(data) {
    window.sidebar.setContent('<h2>School Clusters</h2><p>Click a marker for details.</p>');

    data.forEach(function(d) {
      var lat = +d.ycoord;
      var lon = +d.xcoord;
      var clusterId = +d.cluster;
      var name = d.Name;
      var desc = d.descriptio;

      var color = clusterColors[clusterId % clusterColors.length];
      var marker = makeClusterMarker(lat, lon, color).addTo(mymap);
      cityMarkers.push(marker);

      marker.on('click', function() {
        window.sidebar.setContent(`
          <h2>${name}</h2>
          <p><strong>Description:</strong> ${desc}</p>
          <p><strong>Cluster:</strong> ${clusterId}</p>
          <p><strong>Coords:</strong> ${lat.toFixed(4)}, ${lon.toFixed(4)}</p>
        `);
      });
    });
  }).catch(function(err) {
    console.error('Error loading CSV:', err);
    window.sidebar.setContent('<h2>Error</h2><p>Could not load clustered data.</p>');
  });
}

window.vg_task2 = vg_task2;
