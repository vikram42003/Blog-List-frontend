import { useReducer } from "react";

import loginService from "../services/login";
import blogsService from "../services/blogs";
import { useShowNotification } from "./notificationReducer";

const userReducer = (state, action) => {
  switch (action.type) {
    case "login": {
      return action.payload;
    }
    case "logout": {
      return null;
    }
  }
};

export const useSetUser = () => {
  const [user, dispatch] = useReducer(userReducer, null);
  const { showNotification } = useShowNotification();

  const login = async (userDetails) => {
    try {
      const user = await loginService.login(userDetails);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "login", payload: user });
      blogsService.setToken(user.token);
      showNotification(`success.Logged in as ${user.name}`);
    } catch (error) {
      console.log("Login Failed! - \n", error);
      showNotification(`failure.Could not log in - ${error?.response?.data?.error}`);
    }
  };

  const autoLogin = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "login", payload: user });
      blogsService.setToken(user.token);
      showNotification(`success.Logged in as ${user.name}`);
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
    localStorage.removeItem("user");
    blogsService.setToken(null);
    showNotification("success.Successfully logged out");
  };

  return {
    user,
    login,
    autoLogin,
    logout,
  };
};
