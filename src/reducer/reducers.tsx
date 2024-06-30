import { combineReducers } from "redux";
import userManagementReducer from "./userManagement.reducer";

const rootReducer = combineReducers({
  usersReducer: userManagementReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
