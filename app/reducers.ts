import { taskReducer } from "@features/task";
import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({
  task: taskReducer,
});
