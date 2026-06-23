import { Card, CardContent, Typography, Chip } from "@mui/material";

export function NotificationCard({ notification, viewed, onClick }) {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: "pointer",
        border: viewed ? "1px solid gray" : "2px solid blue",
      }}
    >
      <CardContent>
        <Typography variant="h6">{notification.Message}</Typography>

        <Chip label={notification.Type} sx={{ mt: 1, mr: 1 }} />

        <Typography mt={2}>
          {viewed ? "Viewed" : "New"}
        </Typography>

        <Typography variant="body2">
          {notification.Timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
}