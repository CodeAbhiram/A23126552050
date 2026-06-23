import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { NotificationsPage } from "./pages/NotificationsPage";
import { PriorityPage } from "./pages/PriorityPage";

function App() {
  useEffect(() => {
    log(
      "frontend",
      "info",
      "page",
      "Application initialized and routes mounted"
    );
  }, []);
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <Link to="/">All Notifications</Link>
        {" | "}
        <Link to="/priority">Priority</Link>
      </div>

      <Routes>
        <Route path="/" element={<NotificationsPage />} />
        <Route path="/priority" element={<PriorityPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;