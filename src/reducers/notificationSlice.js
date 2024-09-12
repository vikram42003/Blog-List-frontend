import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    },
  },
});

const { setNotification, clearNotification } = notificationSlice.actions;

let timeoutId;
export const showNotification = (text) => {
  return (dispatch) => {
    dispatch(setNotification(text));
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

export default notificationSlice.reducer;
