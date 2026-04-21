export function buildDetailDialog(spot) {
  const dialog = document.createElement("dialog");
  dialog.className = "spot-dialog";

  const paid = spot.paid
    ? `Paid${spot.hours ? ` · ${spot.hours}` : ""}`
    : "Free";

  dialog.innerHTML = `
    <button class="dialog-close" aria-label="Close">✕</button>
    <h2 class="dialog-address">${spot.address ?? "Unknown address"}</h2>
    <p class="dialog-paid">${paid}</p>
    ${spot.description ? `<p class="dialog-description">${spot.description}</p>` : ""}
    ${spot.notes ? `<p class="dialog-notes">${spot.notes}</p>` : ""}
    ${spot.photo_url ? `<img class="dialog-photo" src="${spot.photo_url}" alt="Spot photo" />` : ""}
  `;

  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());

  return dialog;
}
