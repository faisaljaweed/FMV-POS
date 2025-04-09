import { createSlice } from "@reduxjs/toolkit";
interface BookingState {
  _id: string;
  name: string;
  startTime: string;
  endTime: string;
  totalGuest: number;
  message: string;
  email: string;
  productId: string;
  userId: string;
  bookingDate: string;
  status: string;
  isCancel: boolean;
  vendorId: string;
  createdAt: string;
  updatedAt: string;
}

const initialState: BookingState = {
  _id: "",
  name: "",
  startTime: "",
  endTime: "",
  totalGuest: 0,
  message: "",
  email: "",
  productId: "",
  userId: "",
  bookingDate: "",
  status: "pending",
  isCancel: false,
  vendorId: "",
  createdAt: "",
  updatedAt: "",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
});

const bookingReducer = bookingSlice.reducer;
export default bookingReducer;
