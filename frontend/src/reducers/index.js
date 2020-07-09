import { combineReducers } from "redux";
import messages from "./messages";
import errors from "./errors";
import prompts from "./prompts";
import auth from "./auth";
import times from "./times";

export default combineReducers({
  messagesReducer: messages,
  errorsReducer: errors,
  promptsReducer: prompts,
  authReducer: auth,
  timesReducer: times,
});
