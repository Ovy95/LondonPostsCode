import { useState } from "react";
import ReactMapGL from "react-mapbox-gl";


const token = "pk.eyJ1Ijoib3Z5OTUiLCJhIjoiY2tuNXVvbm1mMDd2ZTJ2czYwcmE5YzU4NSJ9._zotf_OBUausz3cZo4Rsgw"
export default function Map() {
  const [viewport, setViewport] = useState({
  // The latitude and longitude of the center of London
  latitude: 51.5074,
  longitude: -0.1278,
  zoom: 10,
  });
return (
  <ReactMapGL
    {...viewport}
    width = "100%"
    height = "100%"
    mapStyle = "mapbox://styles/mapbox/streets-v11"
    mapboxApiAccessToken= "pk.eyJ1Ijoib3Z5OTUiLCJhIjoiY2tuNXVvbm1mMDd2ZTJ2czYwcmE5YzU4NSJ9._zotf_OBUausz3cZo4Rsgw"
    onViewportChange={(viewport) => setViewport(viewport)}
    >
 </ReactMapGL>,<h2>hello world</h2>)
}
