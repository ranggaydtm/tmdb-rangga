import { combineReducers } from "redux";
import snackbarReducer from "./snackbarReducer";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  snackbar: snackbarReducer,
});

export default reducer;
