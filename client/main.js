import { MAPBOX_TOKEN } from "./config.js";
import { fetchSpots } from "./api.js";
import { buildDetailDialog } from "./dialog.js";

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
      const marker = new mapboxgl.Marker()
        .setLngLat([spot.lng, spot.lat])
        .addTo(map);

      marker.getElement().addEventListener("click", () => {
        const existing = document.querySelector("dialog.spot-dialog");
        if (existing) existing.remove();

        const dialog = buildDetailDialog(spot);
        document.body.appendChild(dialog);
        dialog.showModal();
      });
    }
  } catch (err) {
    console.error(err);
  }
});
