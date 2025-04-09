import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import bookingReducer from "./bookingSlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
    product: productReducer,
  },
});
export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
