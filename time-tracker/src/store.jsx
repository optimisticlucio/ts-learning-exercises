import { configureStore } from '@reduxjs/toolkit'
import {reducer} from "./reducers.jsx";

export const store = configureStore({
    reducer: reducer,
});