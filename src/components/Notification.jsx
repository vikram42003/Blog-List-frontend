import { useContext } from "react";
import { Context } from "../ContextProvider";

const Notification = () => {
  const { notification } = useContext(Context);

  if (!notification) return null;

  const [notifType, notifMessage] = notification.split(".");

  const color = notifType === "success" ? "green" : "red";

  const notificationStyle = {
    color: color,
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={notificationStyle}>{notifMessage}</div>;
};

export default Notification;
