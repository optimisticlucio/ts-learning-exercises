import { createStore } from "redux";
import { rootReducer, initialState } from "./reducers.js";

export const store = createStore(rootReducer, initialState);
