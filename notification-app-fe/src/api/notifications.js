import { log } from "../../../logging-middleware/logger";

const API_URL = "http://4.224.186.213/evaluation-service/notifications";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYW5hcGFsYWFiaGlyYW0uMjMuY3NtQGFuaXRzLmVkdS5pbiIsImV4cCI6MTc4MjE5ODgzMywiaWF0IjoxNzgyMTk3OTMzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOWMxOWMwYWYtMTdlZS00Y2MzLTgzM2UtYjZjZjVkNzgyZWUzIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2FuYXBhbGEgYWJoaXJhbSIsInN1YiI6Ijg5MGE3ZDRhLWIzNTctNDIxNi1iMjNjLWE2MmNkZDNiYzM3YyJ9LCJlbWFpbCI6InNhbmFwYWxhYWJoaXJhbS4yMy5jc21AYW5pdHMuZWR1LmluIiwibmFtZSI6InNhbmFwYWxhIGFiaGlyYW0iLCJyb2xsTm8iOiJhMjMxMjY1NTIwNTAiLCJhY2Nlc3NDb2RlIjoiTVRxeGFyIiwiY2xpZW50SUQiOiI4OTBhN2Q0YS1iMzU3LTQyMTYtYjIzYy1hNjJjZGQzYmMzN2MiLCJjbGllbnRTZWNyZXQiOiJxcnRUek5HakJjYUZGbmVWIn0.wlmaTxjUvNEUc4eMcFaYdBH4B37ewybmo6LmpmY9Pfg";

export async function fetchNotifications(page = 1, limit = 10, type = "All") {
  try {
    let url = `${API_URL}?page=${page}&limit=${limit}`;

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