import assert from "node:assert/strict";
import { parseHTML } from "linkedom";
import { buildDetailDialog } from "../dialog.js";

const { document, HTMLDialogElement, HTMLElement } = parseHTML("<!DOCTYPE html><html><body></body></html>");
globalThis.document = document;

const spot = {
  address: "Civic Center Plaza, SF",
  paid: true,
  hours: "9am–6pm Mon–Sat",
  description: "Near the main entrance",
  notes: "No parking Tue/Fri 7–9am",
  photo_url: null,
};

const dialog = buildDetailDialog(spot);
document.body.appendChild(dialog);

assert.ok(dialog.querySelector(".dialog-address").textContent.includes("Civic Center Plaza"));
assert.ok(dialog.querySelector(".dialog-paid").textContent.includes("Paid"));
assert.ok(dialog.querySelector(".dialog-paid").textContent.includes("9am–6pm"));
assert.ok(dialog.querySelector(".dialog-description").textContent.includes("Near the main entrance"));
assert.ok(dialog.querySelector(".dialog-notes").textContent.includes("No parking"));
assert.equal(dialog.querySelector(".dialog-photo"), null);

const freeSpot = { address: "Market St", paid: false, description: "Side street", notes: null, photo_url: null };
const freeDialog = buildDetailDialog(freeSpot);
assert.ok(freeDialog.querySelector(".dialog-paid").textContent.includes("Free"));

console.log("buildDetailDialog: all assertions passed");
