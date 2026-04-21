import assert from "node:assert/strict";
import { submitSpot } from "../api.js";

// Success case
globalThis.fetch = async (url, opts) => {
  assert.equal(url, "http://localhost:3000/spots");
  assert.equal(opts.method, "POST");
  assert.ok(opts.body instanceof FormData);
  return { ok: true, json: async () => ({ id: 42, status: "pending" }) };
};

const formData = new FormData();
formData.set("description", "Near Civic Center");
formData.set("lat", "37.7749");
formData.set("lng", "-122.4194");
formData.set("paid", "0");
formData.set("address", "Civic Center, SF");

const result = await submitSpot(formData);
assert.equal(result.id, 42);
assert.equal(result.status, "pending");

// Error case — server returns 422 with errors
globalThis.fetch = async () => ({
  ok: false,
  json: async () => ({ errors: ["Description can't be blank", "Address can't be blank"] }),
});

try {
  await submitSpot(new FormData());
  assert.fail("Should have thrown");
} catch (err) {
  assert.deepEqual(err.errors, ["Description can't be blank", "Address can't be blank"]);
}

console.log("submitSpot: all assertions passed");
