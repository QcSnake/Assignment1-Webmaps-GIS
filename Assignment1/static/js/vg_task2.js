// vg_task2.js – Clustered school points with color-coded markers

// Define updated color palette for clusters
const clusterColors = ['#FF5733', '#33A8FF', '#4CAF50', '#FFC107', '#9C27B0', '#00BCD4', '#FF4081'];

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

  // Load the raw school locations data
  d3.csv("/static/data/school_locations.csv").then(function(data) {
    // Extract coordinates for clustering
    const points = data.map(d => [+d.xcoord, +d.ycoord]);
    
    // Perform k-means clustering
    const k = 5; // Number of clusters
    const clusters = kMeansClustering(points, k);
    
    // Assign cluster IDs back to the original data
    data.forEach((d, i) => {
      d.cluster = clusters[i];
    });

    window.sidebar.setContent('<h2>School Clusters</h2><p>Click a marker for details.</p>');

    // Display clustered points on the map
    data.forEach(function(d) {
      var lat = +d.ycoord;
      var lon = +d.xcoord;
      var clusterId = d.cluster;
      var name = d.Name;
      var desc = d.descriptio || "No description available";

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
    window.sidebar.setContent('<h2>Error</h2><p>Could not load school location data.</p>');
  });
}

// K-means clustering implementation
function kMeansClustering(points, k, maxIterations = 50) {
  // Get random centroids from the dataset
  let centroids = getRandomCentroids(points, k);
  let clusters = new Array(points.length).fill(0);
  let iterations = 0;
  let changed = true;

  while (changed && iterations < maxIterations) {
    changed = false;
    iterations++;

    // Assign points to nearest centroid
    for (let i = 0; i < points.length; i++) {
      const newCluster = getNearestCentroidIndex(points[i], centroids);
      if (newCluster !== clusters[i]) {
        clusters[i] = newCluster;
        changed = true;
      }
    }

    // Recalculate centroids
    centroids = recalculateCentroids(points, clusters, k);
  }

  return clusters;
}

function getRandomCentroids(points, k) {
  const centroids = [];
  const used = new Set();
  
  while (centroids.length < k) {
    const idx = Math.floor(Math.random() * points.length);
    if (!used.has(idx)) {
      used.add(idx);
      centroids.push([...points[idx]]);
    }
  }
  
  return centroids;
}

function getNearestCentroidIndex(point, centroids) {
  let minDist = Infinity;
  let nearestIndex = 0;
  
  for (let i = 0; i < centroids.length; i++) {
    const dist = distance(point, centroids[i]);
    if (dist < minDist) {
      minDist = dist;
      nearestIndex = i;
    }
  }
  
  return nearestIndex;
}

function distance(a, b) {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
}

function recalculateCentroids(points, clusters, k) {
  const centroids = Array(k).fill().map(() => [0, 0]);
  const counts = Array(k).fill(0);
  
  for (let i = 0; i < points.length; i++) {
    const cluster = clusters[i];
    centroids[cluster][0] += points[i][0];
    centroids[cluster][1] += points[i][1];
    counts[cluster]++;
  }
  
  for (let i = 0; i < k; i++) {
    if (counts[i] > 0) {
      centroids[i][0] /= counts[i];
      centroids[i][1] /= counts[i];
    }
  }
  
  return centroids;
}

window.vg_task2 = vg_task2;
