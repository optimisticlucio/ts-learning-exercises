import { createStore } from "redux";
import { coreReducer, initialState } from "./reducers.js";

export const store = createStore(coreReducer, initialState);
