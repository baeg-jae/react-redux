import { combineReducers } from "redux";
import userReducer from "./user";
import updateReducer from "./update";
const rootReducer = combineReducers({
  userReducer,
  updateReducer,
});

export default rootReducer;
