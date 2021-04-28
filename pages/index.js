import Head from "next/head";
import { useEffect,useState } from "react";
import styles from "../styles/Home.module.css";
import { addDataLayer } from "../map/addDataLayer";

import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
import Graph from "../lib/graphs";



export default function Home() {
  
  const [pageIsMounted, setPageIsMounted] = useState(false)
  const [Map, setMap] = useState();
  
  mapboxgl.accessToken = "pk.eyJ1Ijoib3Z5OTUiLCJhIjoiY2tuYnI5ZHI1MDVvNDJ2b2FzaDJja3lvcCJ9.imylaw3Zbt-htP9aQsR42g"

  useEffect(() => {
    setPageIsMounted(true)
      let map = new mapboxgl.Map({
        container: "my-map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-0.1271489487312465,51.505593452532054],
        zoom: 9,

      });

      var geocoder = new MapboxGeocoder({
        accessToken: "pk.eyJ1Ijoib3Z5OTUiLCJhIjoiY2tuYnI5ZHI1MDVvNDJ2b2FzaDJja3lvcCJ9.imylaw3Zbt-htP9aQsR42g",
        mapboxgl: mapboxgl,
        marker: {
          color: 'orange'
          },
      }); 
    map.addControl(geocoder)
      
    setMap(map);
  }, [])

    useEffect(() => {
      if (pageIsMounted) {
        Map.on("load", function () {
          addDataLayer(Map);
        });
      }
    }, [pageIsMounted, setMap, Map]);
  
  return (




    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />




      </Head>
      <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.css" type="text/css"></link>

      <main className={styles.main}>
        <h3>A map of London</h3>
        <div id="my-map" style={{ height: 500, width: 900 }} />

        

      <Graph></Graph>

      </main>


      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
  
}



