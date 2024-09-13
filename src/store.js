import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationSlice";
import userReducer from "./reducers/userSlice";
import blogsReducer from "./reducers/blogsSlice";

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
});
