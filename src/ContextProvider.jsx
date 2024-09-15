import { createContext } from "react";
import PropTypes from "prop-types";

import { useShowNotification } from "./reducers/notificationReducer";
import { useSetUser } from "./reducers/userReducer";

export const Context = createContext();

const ContextProvider = (props) => {
  const { notification, showNotification } = useShowNotification();
  const { user, login, autoLogin, logout } = useSetUser();

  const contextToProvide = {
    notification,
    showNotification,
    user,
    login,
    autoLogin,
    logout,
  };

  return <Context.Provider value={contextToProvide}>{props.children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.any,
};

export default ContextProvider;
