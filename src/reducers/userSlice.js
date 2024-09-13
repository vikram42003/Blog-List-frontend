import { createSlice } from "@reduxjs/toolkit";

import { showNotification } from "./notificationSlice";
import loginService from "../services/login";
import blogsService from "../services/blogs";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
  },
});

export const initializeUser = () => {
  return async (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(userSlice.actions.setUser(user));
      blogsService.setToken(user.token);
    }
  };
};

export const login = (userDetails) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userDetails);
      console.log(user);
      blogsService.setToken(user.token);
      dispatch(userSlice.actions.setUser(user));
      window.localStorage.setItem("user", JSON.stringify(user));
      dispatch(showNotification(`success.Logged in as ${user.name}`));
    } catch (error) {
      console.log("Login Failed! - \n", error);
      dispatch(showNotification(`failure.Could not log in - ${error.response?.data?.error}`));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("user");
    dispatch(userSlice.actions.setUser(null));
    blogsService.setToken(null);
    dispatch(showNotification("success.Successfully logged out"));
  };
};

export default userSlice.reducer;
