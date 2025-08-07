import { createRoot } from "react-dom/client";
import "./index.css";
import { TimeTracker } from "./components/time-tracker.jsx";
import TaskList from "./mobx/task-list.js";

createRoot(document.getElementById("root")).render(
  <TimeTracker taskList={new TaskList()} />,
);
