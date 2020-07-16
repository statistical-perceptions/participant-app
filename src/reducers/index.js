import { combineReducers } from "redux";
import dataReducer from "./dataReducer";

export default combineReducers({
  expt: dataReducer
});