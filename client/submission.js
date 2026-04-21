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

  return dialog;
}
