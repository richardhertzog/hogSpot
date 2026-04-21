import { submitSpot } from "./api.js";

export function buildSubmissionDialog(lngLat) {
  const dialog = document.createElement("dialog");
  dialog.className = "submission-dialog";

  dialog.innerHTML = `
    <button class="dialog-close" aria-label="Close">✕</button>
    <h2>Add a spot</h2>
    <form id="submission-form" novalidate>
      <input type="hidden" name="lat" value="${lngLat.lat}" />
      <input type="hidden" name="lng" value="${lngLat.lng}" />

      <label>
        Description <span aria-hidden="true">*</span>
        <textarea name="description" required rows="3"></textarea>
      </label>

      <label class="inline">
        <input type="checkbox" name="paid" />
        Paid parking
      </label>

      <label id="hours-label" hidden>
        Hours
        <input type="text" name="hours" placeholder="e.g. 9am–6pm Mon–Sat" />
      </label>

      <label>
        Notes
        <textarea name="notes" rows="2" placeholder="e.g. No parking Tue/Fri 7–9am"></textarea>
      </label>

      <label>
        Address <span aria-hidden="true">*</span>
        <input type="text" name="address" required />
      </label>

      <label>
        Your name (optional)
        <input type="text" name="submitter_name" />
      </label>

      <label>
        Your email (optional)
        <input type="email" name="submitter_email" />
      </label>

      <label>
        Photo (optional)
        <input type="file" name="photo" accept="image/*" />
        <img id="photo-preview" hidden alt="Photo preview" />
      </label>

      <button type="submit">Submit spot</button>
    </form>
  `;

  const paidCheckbox = dialog.querySelector('[name="paid"]');
  const hoursLabel = dialog.querySelector("#hours-label");

  paidCheckbox.addEventListener("change", () => {
    hoursLabel.hidden = !paidCheckbox.checked;
  });

  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());

  const photoInput = dialog.querySelector('[name="photo"]');
  const photoPreview = dialog.querySelector("#photo-preview");

  photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];
    if (!file) {
      photoPreview.hidden = true;
      return;
    }
    photoPreview.src = URL.createObjectURL(file);
    photoPreview.hidden = false;
  });

  const form = dialog.querySelector("form");
  const errorEl = document.createElement("p");
  errorEl.className = "form-errors";
  errorEl.hidden = true;
  form.appendChild(errorEl);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.hidden = true;

    const data = new FormData(form);
    // FormData checkbox sends "on" or nothing — convert to boolean
    data.set("paid", paidCheckbox.checked ? "1" : "0");

    const submitBtn = form.querySelector("[type=submit]");
    submitBtn.disabled = true;

    try {
      await submitSpot(data);
      dialog.close();
      dialog.dispatchEvent(new CustomEvent("spot-submitted", { bubbles: true }));
    } catch (err) {
      errorEl.textContent = err.errors ? err.errors.join(", ") : "Something went wrong.";
      errorEl.hidden = false;
    } finally {
      submitBtn.disabled = false;
    }
  });

  return dialog;
}
