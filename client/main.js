import { MAPBOX_TOKEN } from "./config.js";
import { fetchSpots } from "./api.js";

mapboxgl.accessToken = MAPBOX_TOKEN;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: [-122.4194, 37.7749], // San Francisco
  zoom: 13,
});

map.on("load", async () => {
  try {
    const spots = await fetchSpots();
    for (const spot of spots) {
      new mapboxgl.Marker()
        .setLngLat([spot.lng, spot.lat])
        .addTo(map);
    }
  } catch (err) {
    console.error(err);
  }
});
