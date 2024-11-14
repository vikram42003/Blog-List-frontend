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

  const login = async (userDetails) => {
    const user = await loginService.login(userDetails);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: "login", payload: user });
    blogsService.setToken(user.token);
  };

  const autoLogin = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "login", payload: user });
      blogsService.setToken(user.token);
      return user;
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
    localStorage.removeItem("user");
    blogsService.setToken(null);
  };

  return {
    user,
    login,
    autoLogin,
    logout,
  };
};
