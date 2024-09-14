import { createContext } from "react";
import PropTypes from "prop-types";

import { useShowNotification } from "./reducers/notificationReducer";

export const Context = createContext();

const ContextProvider = (props) => {
  const { notification, showNotification } = useShowNotification();

  const contextToProvide = {
    notification,
    showNotification,
  };

  return <Context.Provider value={contextToProvide}>{props.children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.any,
};

export default ContextProvider;
