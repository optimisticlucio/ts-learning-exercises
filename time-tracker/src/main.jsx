import { createRoot } from "react-dom/client";
import "./index.css";
import TimeTracker from "./time-tracker.jsx";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <TimeTracker />
  </Provider>,
);
