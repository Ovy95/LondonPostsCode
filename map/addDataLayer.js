const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
export function addDataLayer(map) {
  
  map.addSource('places', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/sjwhitworth/london_geojson/master/london_postcodes.json'
  });


 // Add a new layer to visualize the polygon.
map.addLayer({
  'id': 'places',
  'type': 'fill',
  'source': "places", // reference the data source
  'layout': {},
  'paint': {
  'fill-color': '#0080ff', // blue color fill
  'fill-opacity': 0.5
  }
  });
  // Add a black outline around the polygon.
  map.addLayer({
  'id': 'outline',
  'type': 'line',
  'source': 'places',
  'layout': {},
  'paint': {
  'line-color': '#000',
  'line-width': 0.5
    }
  });

  
  
  map.on('click', 'places', function (e) {
    var coordinates = e.features[0].geometry.coordinates[0].slice();
    var name = e.features[0].properties.Name;
    var description = e.features[0].properties.Description;
     
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    var displayMessage = '<strong> ' +name+ '</strong>'+'<p>'+description+'</p>'



    new mapboxgl.Popup()
    .setLngLat(coordinates[0])
    .setHTML(displayMessage)
    .addTo(map);
    });


     
    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', function () {
    map.getCanvas().style.cursor = 'pointer';
    });
     
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', function () {
    map.getCanvas().style.cursor = '';
    });

 



}

// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
