import { combineReducers } from "redux";
import authReducer from "./authSlice";

const initialState = {
  loading: false,
  error: null,
  success: null,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "UPDATE_USER_DATA_REQUEST":
      return { ...state, loading: true, error: null, success: null };
    case "UPDATE_USER_DATA_SUCCESS":
      return { ...state, loading: false, success: action.payload };
    case "UPDATE_USER_DATA_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
});

export default rootReducer;
