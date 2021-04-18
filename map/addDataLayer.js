export function addDataLayer(map) {
  
  map.addSource('jack', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/sjwhitworth/london_geojson/master/london_postcodes.json'
  });


 // Add a new layer to visualize the polygon.
map.addLayer({
  'id': 'postcodes.live',
  'type': 'fill',
  'source': "jack", // reference the data source
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
  'source': 'jack',
  'layout': {},
  'paint': {
  'line-color': '#000',
  'line-width': 0.5
    }
  });
}


  

