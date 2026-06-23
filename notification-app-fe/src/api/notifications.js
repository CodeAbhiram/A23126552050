const API_URL = "http://4.224.186.213/evaluation-service/notifications";
const TOKEN = "YOUR_TOKEN";

export async function fetchNotifications(page = 1, limit = 10, type = "All") {
  let url = `${API_URL}?page=${page}&limit=${limit}`;

  if (type !== "All") {
    url += `&notification_type=${type}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}