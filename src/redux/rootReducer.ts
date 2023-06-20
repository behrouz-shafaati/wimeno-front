import { combineReducers } from "redux";
import authReducer from "./slice/authSlice";
// slices
import { apiSlice } from "./api/api";

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

export { rootReducer };
