const API_BASE = "http://localhost:3000";

export async function fetchSpots() {
  const res = await fetch(`${API_BASE}/spots`);
  if (!res.ok) throw new Error(`Failed to fetch spots: ${res.status}`);
  return res.json();
}

export async function submitSpot(formData) {
  const wrapped = new FormData();
  for (const [key, value] of formData.entries()) {
    wrapped.append(`parking_spot[${key}]`, value);
  }

  const res = await fetch(`${API_BASE}/spots`, {
    method: "POST",
    body: wrapped,
  });
  const json = await res.json();
  if (!res.ok) throw Object.assign(new Error("Submission failed"), { errors: json.errors });
  return json;
}
