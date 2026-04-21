import assert from "node:assert/strict";
import { filterSpots } from "../filters.js";

const spots = [
  { id: 1, paid: false },
  { id: 2, paid: true },
  { id: 3, paid: false },
];

const all = filterSpots(spots, "all");
assert.equal(all.length, 3);

const free = filterSpots(spots, "free");
assert.equal(free.length, 2);
assert.ok(free.every(s => !s.paid));

const paid = filterSpots(spots, "paid");
assert.equal(paid.length, 1);
assert.equal(paid[0].id, 2);

console.log("filterSpots: all assertions passed");
