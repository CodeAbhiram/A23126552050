import { Typography, Stack, Box } from "@mui/material";
import { NotificationCard } from "../components/NotificationCard";
import { useNotifications } from "../hooks/useNotifications";

const priority = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export function PriorityPage() {
  const { notifications } = useNotifications(1, 10, "All");

  const sorted = [...notifications]
    .sort((a, b) => {
      const pa = priority[a.Type];
      const pb = priority[b.Type];

      if (pb !== pa) return pb - pa;

      return (
        new Date(b.Timestamp).getTime() -
        new Date(a.Timestamp).getTime()
      );
    })
    .slice(0, 10);

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", py: 4 }}>
      <Typography variant="h4" mb={3}>
        Priority Notifications
      </Typography>

      <Stack spacing={2}>
        {sorted.map((n) => (
          <NotificationCard
            key={n.ID}
            notification={n}
            viewed={false}
          />
        ))}
      </Stack>
    </Box>
  );
}