import { useState, useEffect } from "react";
import { fetchNotifications } from "../apis/notifications";
import { log } from "../logger";

export function useNotifications(page, limit, filter) {
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");

        log("frontend", "info", "API", "Fetching notifications");

        const data = await fetchNotifications(page, limit, filter);

        setNotifications(data.notifications ?? []);
        setTotal(data.total ?? 50);

        log("frontend", "info", "API", "Notifications loaded");
      } catch (err) {
        setError(err.message);
        log("frontend", "error", "API", err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page, limit, filter]);

  const totalPages = Math.ceil(total / limit);

  return { notifications, total, totalPages, loading, error };
}