import { createRoot } from "react-dom/client";
import "./index.css";
import TimeTracker from "./components/time-tracker.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <TimeTracker />
  </Provider>,
);
