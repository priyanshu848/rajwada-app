import { createStore } from "redux";
import combinedReducer from "./rootReducer";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () => createStore(combinedReducer);
export const wrapper = createWrapper(makeStore);
