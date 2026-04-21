import assert from "node:assert/strict";
import { fetchSpots } from "../api.js";

const mockSpots = [
  { id: 1, lat: "37.7749", lng: "-122.4194", description: "Near Civic Center", paid: false },
  { id: 2, lat: "37.7850", lng: "-122.4083", description: "SoMa lot", paid: true },
];

globalThis.fetch = async () => ({
  ok: true,
  json: async () => mockSpots,
});

const spots = await fetchSpots();
assert.equal(spots.length, 2);
assert.equal(spots[0].id, 1);
assert.equal(spots[1].paid, true);

console.log("fetchSpots: all assertions passed");
