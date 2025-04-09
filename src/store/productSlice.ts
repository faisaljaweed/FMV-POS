import { createSlice } from "@reduxjs/toolkit";
interface ProductFeatures {
  swimmingPool: boolean;
  parking: boolean;
  wifi: boolean;
  secuirty: boolean;
  kitchen: boolean;
  bbqArea: boolean;
  airCondition: boolean;
}

interface ProductState {
  _id: string;
  name: string;
  description: string;
  location: string;
  type: string;
  price: number;
  vendorId: string;
  standingCapacity: number;
  seatedCapacity: number;
  size: number;
  features: ProductFeatures;
  createdAt: string;
  updatedAt: string;
}

const initialState: ProductState = {
  _id: "",
  name: "",
  description: "",
  location: "",
  type: "",
  price: 0,
  vendorId: "",
  standingCapacity: 0,
  seatedCapacity: 0,
  size: 0,
  features: {
    swimmingPool: false,
    parking: false,
    wifi: false,
    secuirty: false,
    kitchen: false,
    bbqArea: false,
    airCondition: false,
  },
  createdAt: "",
  updatedAt: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
});

const productReducer = productSlice.reducer;
export default productReducer;
