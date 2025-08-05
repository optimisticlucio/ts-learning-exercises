import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers.jsx";

export const store = configureStore({
  reducer: rootReducer,
});
