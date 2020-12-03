import { createSlice } from "@reduxjs/toolkit";
import { setAuthToken } from "../../utils";
import {
  login as loginAPI,
  register as registerAPI,
  getMe as getMeAPI,
} from "../../WebAPI";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoadingAuth: false,
    errorMessage: null,
  },
  reducers: {
    setIsLoadingAuth: (state, action) => {
      state.isLoadingAuth = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setIsLoadingAuth,
  setUser,
  setErrorMessage,
} = userReducer.actions;

export const getMe = () => (dispatch) => {
  dispatch(setIsLoadingAuth(true));
  dispatch(setErrorMessage(null));
  return getMeAPI().then((res) => {
    if (res.ok === 0) {
      setAuthToken(null);
      dispatch(setIsLoadingAuth(false));
      return dispatch(setErrorMessage(res.message));
    }
    dispatch(setUser(res.data));
    dispatch(setIsLoadingAuth(false));
    return res;
  });
};

export const login = (username, password) => (dispatch) => {
  dispatch(setIsLoadingAuth(true));
  dispatch(setErrorMessage(null));
  return loginAPI(username, password).then((res) => {
    if (res.ok !== 1) {
      dispatch(setIsLoadingAuth(false));
      return dispatch(setErrorMessage(res.message));
    }
    setAuthToken(res.token);
    return dispatch(getMe());
  });
};

export const register = (username, nickname, password) => (dispatch) => {
  dispatch(setIsLoadingAuth(true));
  dispatch(setErrorMessage(null));
  return registerAPI(username, nickname, password).then((res) => {
    if (res.ok === 0) {
      dispatch(setIsLoadingAuth(false));
      return dispatch(setErrorMessage(res.message));
    }
    setAuthToken(res.token);
    return dispatch(getMe());
  });
};

export default userReducer.reducer;
