import { createRoot } from "react-dom/client";
import "./index.css";
import TimeTracker from "./components/time-tracker.jsx";

createRoot(document.getElementById("root")).render(
    <TimeTracker />
);
