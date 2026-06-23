import { log } from "../logger";

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_BEARER_TOKEN;

export async function fetchNotifications(page = 1, limit = 10, type = "All") {
  try {
    let url = `${API_URL}/notifications?page=${page}&limit=${limit}`;

    if (type !== "All") {
      url += `&notification_type=${type}`;
    }

    await log(
      "frontend",
      "info",
      "api",
      `Sending notification request: page=${page}, limit=${limit}, filter=${type}`
    );

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!response.ok) {
      await log(
        "frontend",
        "error",
        "api",
        `Notification API returned status ${response.status}`
      );
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    await log(
      "frontend",
      "info",
      "api",
      `Successfully fetched ${data.notifications?.length || 0} notifications`
    );

    return data;
  } catch (error) {
    await log(
      "frontend",
      "fatal",
      "api",
      `Fetch notifications failed: ${error.message}`
    );
    throw error;
  }
}