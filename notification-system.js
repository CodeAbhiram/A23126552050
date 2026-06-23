const API_URL = "http://4.224.186.213/evaluation-service/notifications";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYW5hcGFsYWFiaGlyYW0uMjMuY3NtQGFuaXRzLmVkdS5pbiIsImV4cCI6MTc4MjE5ODgzMywiaWF0IjoxNzgyMTk3OTMzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOWMxOWMwYWYtMTdlZS00Y2MzLTgzM2UtYjZjZjVkNzgyZWUzIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2FuYXBhbGEgYWJoaXJhbSIsInN1YiI6Ijg5MGE3ZDRhLWIzNTctNDIxNi1iMjNjLWE2MmNkZDNiYzM3YyJ9LCJlbWFpbCI6InNhbmFwYWxhYWJoaXJhbS4yMy5jc21AYW5pdHMuZWR1LmluIiwibmFtZSI6InNhbmFwYWxhIGFiaGlyYW0iLCJyb2xsTm8iOiJhMjMxMjY1NTIwNTAiLCJhY2Nlc3NDb2RlIjoiTVRxeGFyIiwiY2xpZW50SUQiOiI4OTBhN2Q0YS1iMzU3LTQyMTYtYjIzYy1hNjJjZGQzYmMzN2MiLCJjbGllbnRTZWNyZXQiOiJxcnRUek5HakJjYUZGbmVWIn0.wlmaTxjUvNEUc4eMcFaYdBH4B37ewybmo6LmpmY9Pfg";

// Priority weights
const PRIORITY = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

// Fetch notifications
async function fetchNotifications() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    return data.notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    return [];
  }
}

// Sort notifications by:
// 1. Priority weight
// 2. Recency
function getTopNotifications(notifications, limit = 10) {
  const sorted = [...notifications].sort((a, b) => {
    const weightA = PRIORITY[a.Type] || 0;
    const weightB = PRIORITY[b.Type] || 0;

    // Higher priority first
    if (weightA !== weightB) {
      return weightB - weightA;
    }

    // If same priority, newer notification first
    const timeA = new Date(a.Timestamp).getTime();
    const timeB = new Date(b.Timestamp).getTime();

    return timeB - timeA;
  });

  return sorted.slice(0, limit);
}

// Display result
function printNotifications(topNotifications) {
  console.log("\n===== TOP 10 PRIORITY NOTIFICATIONS =====\n");

  topNotifications.forEach((notification, index) => {
    console.log(`Rank: ${index + 1}`);
    console.log(`ID: ${notification.ID}`);
    console.log(`Type: ${notification.Type}`);
    console.log(`Message: ${notification.Message}`);
    console.log(`Timestamp: ${notification.Timestamp}`);
    console.log("-----------------------------------");
  });
}

// Main function
async function main() {
  const notifications = await fetchNotifications();

  if (notifications.length === 0) {
    console.log("No notifications found.");
    return;
  }

  const top10 = getTopNotifications(notifications, 10);

  printNotifications(top10);
}

main();