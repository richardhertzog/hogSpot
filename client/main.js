import { MAPBOX_TOKEN } from "./config.js";
import { fetchSpots } from "./api.js";
import { buildDetailDialog } from "./dialog.js";
import { filterSpots } from "./filters.js";

mapboxgl.accessToken = MAPBOX_TOKEN;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: [-122.4194, 37.7749], // San Francisco
  zoom: 13,
});

let activeMarkers = [];

function renderMarkers(spots) {
  activeMarkers.forEach(m => m.remove());
  activeMarkers = [];

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

    activeMarkers.push(marker);
  }
}

map.on("load", async () => {
  try {
    const spots = await fetchSpots();

    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderMarkers(filterSpots(spots, btn.dataset.filter));
      });
    });

    renderMarkers(spots);
  } catch (err) {
    console.error(err);
  }
});
