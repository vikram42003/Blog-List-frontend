import { useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "setNotification": {
      return action.payload;
    }
    case "clearNotification": {
      return null;
    }
  }
};

export const useShowNotification = () => {
  const [notification, dispatch] = useReducer(notificationReducer, null);

  let timeoutId;
  const showNotification = (text) => {
    dispatch({ type: "setNotification", payload: text });
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      dispatch({ type: "clearNotification" });
    }, 5000);
  };

  return {
    notification,
    showNotification,
  };
};
