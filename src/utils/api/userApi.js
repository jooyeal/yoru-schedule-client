import { publicRequest } from "./requestUrl";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} from "../../store/slices/userSlice";
import {
  clearErrorMessage,
  storeErrorMessage,
} from "../../store/slices/errorSlice";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  dispatch(clearErrorMessage());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
    dispatch(storeErrorMessage(err.response.data));
  }
};

export const logOut = async (dispatch) => {
  dispatch(logoutStart());
  dispatch(storeErrorMessage(null));
  try {
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutFailure());
  }
};
