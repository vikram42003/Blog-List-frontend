import { useContext } from "react";
import { Context } from "../ContextProvider";

const Notification = () => {
  const { notification } = useContext(Context);

  console.log("Notification was called with - ", notification);

  if (notification) console.log("NOTIFICATION IS: ", notification);
  if (!notification) return <div>TEST</div>;

  const successSvg = (
    <svg
      className="h-5 w-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
    </svg>
  );

  const failureSvg = (
    <svg
      className="inline h-5 w-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
    </svg>
  );

  const [notifType, notifMessage] = notification.split(".");

  const textColor = notifType === "success" ? "text-green-500" : "text-red-500";
  const svgType = notifType === "success" ? successSvg : failureSvg;

  return (
    <div
      className={`text-lg absolute right-8 top-20 flex items-center gap-2 rounded-md bg-slate-100 p-3 ${textColor} shadow-lg`}
    >
      {svgType} {notifMessage}
    </div>
  );
};

export default Notification;
