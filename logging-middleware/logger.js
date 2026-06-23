const LOG_API = "http://4.224.186.213/evaluation-service/logs";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYW5hcGFsYWFiaGlyYW0uMjMuY3NtQGFuaXRzLmVkdS5pbiIsImV4cCI6MTc4MjE5ODgzMywiaWF0IjoxNzgyMTk3OTMzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOWMxOWMwYWYtMTdlZS00Y2MzLTgzM2UtYjZjZjVkNzgyZWUzIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2FuYXBhbGEgYWJoaXJhbSIsInN1YiI6Ijg5MGE3ZDRhLWIzNTctNDIxNi1iMjNjLWE2MmNkZDNiYzM3YyJ9LCJlbWFpbCI6InNhbmFwYWxhYWJoaXJhbS4yMy5jc21AYW5pdHMuZWR1LmluIiwibmFtZSI6InNhbmFwYWxhIGFiaGlyYW0iLCJyb2xsTm8iOiJhMjMxMjY1NTIwNTAiLCJhY2Nlc3NDb2RlIjoiTVRxeGFyIiwiY2xpZW50SUQiOiI4OTBhN2Q0YS1iMzU3LTQyMTYtYjIzYy1hNjJjZGQzYmMzN2MiLCJjbGllbnRTZWNyZXQiOiJxcnRUek5HakJjYUZGbmVWIn0.wlmaTxjUvNEUc4eMcFaYdBH4B37ewybmo6LmpmY9Pfg";

export async function log(stack, level, packageName, message) {
  try {
    const payload = {
      stack,
      level,
      package: packageName,
      message,
    };

    console.log("Sending log:", payload);

    const response = await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.text();
    console.log("Logger response:", result);
  } catch (error) {
    console.error("Logging failed:", error);
  }
}