import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import FormBuilder from "./form-builder.tsx";
import exampleForm from "./form-example.json";
import type { FormElement } from "./types.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FormBuilder formElements={exampleForm as Array<FormElement>} />
  </StrictMode>,
);
