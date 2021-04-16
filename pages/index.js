import Head from "next/head";
import { useEffect,useState } from "react";
import styles from "../styles/Home.module.css";

const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

mapboxgl.accessToken = "apiKey"

export default function Home() {
  
  const [pageIsMounted, setPageIsMounted] = useState(false)
  
  useEffect(() => {
    setPageIsMounted(true)
      const map = new mapboxgl.Map({
        container: "my-map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-0.1271489487312465,51.505593452532054],
        
        zoom: 9,
      });
}, [])
  
  
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

      <main className={styles.main}>
        <h3>A map of London</h3>
        <div id="my-map" style={{ height: 500, width: 500 }} />
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
