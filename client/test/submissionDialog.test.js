import assert from "node:assert/strict";
import { parseHTML } from "linkedom";
import { buildSubmissionDialog } from "../submission.js";

const { document } = parseHTML("<!DOCTYPE html><html><body></body></html>");
globalThis.document = document;

const dialog = buildSubmissionDialog({ lat: 37.7749, lng: -122.4194 });
document.body.appendChild(dialog);

const paidCheckbox = dialog.querySelector('[name="paid"]');
const hoursLabel = dialog.querySelector("#hours-label");

// Hours field hidden by default
assert.equal(hoursLabel.hidden, true);

// Check paid — hours field appears
paidCheckbox.checked = true;
paidCheckbox.dispatchEvent(new document.defaultView.Event("change"));
assert.equal(hoursLabel.hidden, false);

// Uncheck paid — hours field hides
paidCheckbox.checked = false;
paidCheckbox.dispatchEvent(new document.defaultView.Event("change"));
assert.equal(hoursLabel.hidden, true);

// Coordinates are embedded in hidden inputs
assert.equal(dialog.querySelector('[name="lat"]').value, "37.7749");
assert.equal(dialog.querySelector('[name="lng"]').value, "-122.4194");

console.log("buildSubmissionDialog: all assertions passed");
