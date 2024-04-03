import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import ticketReducer from "./tickets/ticketSlice"
const store = configureStore({
  reducer: {
    auth : authReducer,
    ticket : ticketReducer,
  },
});
export default store;
