import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import CountrySelector from "./CountrySelector.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CountrySelector />
  </StrictMode>,
);
