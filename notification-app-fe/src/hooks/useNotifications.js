import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";
import { log } from "../../../logging-middleware/logger";

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

        log("frontend", "info", "api", "Fetching notifications");

        const data = await fetchNotifications(page, limit, filter);

        setNotifications(data.notifications ?? []);
        setTotal(data.total ?? 50);

        log("frontend", "info", "api", "Notifications loaded");
      } catch (err) {
        setError(err.message);
        log("frontend", "error", "api", err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page, limit, filter]);

  const totalPages = Math.ceil(total / limit);

  return { notifications, total, totalPages, loading, error };
}