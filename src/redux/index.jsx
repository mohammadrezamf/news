import { combineReducers } from "redux";
import { NewsReducer } from "./newsSlice";

export const Reducers = combineReducers({
    News :NewsReducer,
})