const API_BASE = "http://localhost:3000";

export async function fetchSpots() {
  const res = await fetch(`${API_BASE}/spots`);
  if (!res.ok) throw new Error(`Failed to fetch spots: ${res.status}`);
  return res.json();
}
