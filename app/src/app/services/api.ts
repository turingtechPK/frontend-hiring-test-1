const API_BASE = "https://frontend-test-api.aircall.dev";

export async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function refreshToken(token: string) {
  const res = await fetch(`${API_BASE}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Refresh token failed");
  return res.json();
}

export async function getCalls(token: string, offset: number, limit: number) {
  const res = await fetch(`${API_BASE}/calls?offset=${offset}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch calls");
  return res.json();
}

export async function addNote(token: string, callId: string, content: string) {
  const res = await fetch(`${API_BASE}/calls/${callId}/note`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("Failed to add note");
  return res.json();
}

export async function archiveCall(token: string, callId: string) {
  const res = await fetch(`${API_BASE}/calls/${callId}/archive`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to archive/unarchive call");
  return res.json();
} 