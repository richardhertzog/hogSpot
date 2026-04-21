/** @param {"all"|"free"|"paid"} filter */
export function filterSpots(spots, filter) {
  if (filter === "free") return spots.filter(s => !s.paid);
  if (filter === "paid") return spots.filter(s => s.paid);
  return spots;
}
