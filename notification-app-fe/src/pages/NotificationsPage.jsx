import { useState } from "react";
import { log } from "../../../logging-middleware/logger";
import {
  Alert,
  Badge,
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";

export function NotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const [viewedIds, setViewedIds] = useState(
    JSON.parse(localStorage.getItem("viewedNotifications")) || []
  );

  const { notifications, totalPages, loading, error } =
    useNotifications(page, 10, filter);

  const unreadCount = notifications.filter(
    (n) => !viewedIds.includes(n.ID)
  ).length;

  const handleFilterChange = async (newFilter) => {
    setFilter(newFilter);
    setPage(1);

    await log(
      "frontend",
      "debug",
      "state",
      `Filter changed to ${newFilter}`
    );
  };

  const handlePageChange = async (_, newPage) => {
    setPage(newPage);

    await log(
      "frontend",
      "debug",
      "state",
      `Page changed to ${newPage}`
    );
  };

  const markViewed = (id) => {
    if (!viewedIds.includes(id)) {
      const updatedViewed = [...viewedIds, id];

      setViewedIds(updatedViewed);

      localStorage.setItem(
        "viewedNotifications",
        JSON.stringify(updatedViewed)
      );
    }
  };

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 4 }}>
      <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
        <Badge badgeContent={unreadCount} color="primary" max={99}>
          <NotificationsIcon sx={{ fontSize: 28 }} />
        </Badge>

        <Typography variant="h5" fontWeight={700}>
          Notifications
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Box mb={3}>
        <NotificationFilter
          value={filter}
          onChange={handleFilterChange}
        />
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error">
          Failed to load notifications: {error}
        </Alert>
      )}

      {!loading && !error && notifications.length === 0 && (
        <Alert severity="info">No notifications available</Alert>
      )}

      {!loading && !error && notifications.length > 0 && (
        <Stack spacing={2}>
          {notifications.map((n) => (
            <NotificationCard
              key={n.ID}
              notification={n}
              viewed={viewedIds.includes(n.ID)}
              onClick={() => markViewed(n.ID)}
            />
          ))}
        </Stack>
      )}

      {!loading && totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
}