import { MAPBOX_TOKEN } from "./config.js";

mapboxgl.accessToken = MAPBOX_TOKEN;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: [-122.4194, 37.7749], // San Francisco
  zoom: 13,
});
