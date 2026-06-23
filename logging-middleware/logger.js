const LOG_API = import.meta.env.VITE_LOG_API;
const TOKEN = import.meta.env.VITE_BEARER_TOKEN;

export async function log(stack, level, packageName, message) {
  try {
    await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: packageName,
        message,
      }),
    });
  } catch (error) {
    console.error("Logging failed:", error);
  }
}