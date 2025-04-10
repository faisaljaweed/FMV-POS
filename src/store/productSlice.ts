import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductTypes } from "../Types/types";
import { Rootstate } from "./store";
import {
  CreateProduct,
  DeleteProduct,
  EditProduct,
  GetAllProduct,
  GetProductById,
} from "../Api/Product_Api";

interface ProductState {
  items: ProductTypes[];
  apiCallInProgress: boolean;
}

const initialState: ProductState = {
  items: [],
  apiCallInProgress: false,
};

export const getProductThunk = createAsyncThunk(
  "product/get-product",
  async () => {
    const getProduct = await GetAllProduct();
    return getProduct;
  }
);
export const addProductThunk = createAsyncThunk(
  "product/add-product",
  async () => {
    const createProduct = await CreateProduct();
    return createProduct;
  }
);
export const deleteProductThunk = createAsyncThunk(
  "product/delete-product",
  async (id: string) => {
    const deleteProduct = await DeleteProduct(id);
    return deleteProduct;
  }
);
export const editProductThunk = createAsyncThunk(
  "product/edit-product",
  async (id: string) => {
    const editProduct = await EditProduct(id);
    return editProduct;
  }
);
export const getProductByIdThunk = createAsyncThunk(
  "product/get-product-by-id",
  async (id: string) => {
    const getProductById = await GetProductById(id);
    return getProductById;
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProductThunk.pending, (state) => {
        state.apiCallInProgress = true;
      })
      .addCase(getProductThunk.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.apiCallInProgress = false;
      })
      .addCase(getProductThunk.rejected, (state) => {
        state.apiCallInProgress = false;
      });
  },
});

const productReducer = productSlice.reducer;

export const selectProductApiCallInProgress = (state: Rootstate) => {
  return state.product.apiCallInProgress;
};

export const selectProductList = (state: Rootstate) => {
  return state.product.items;
};

export default productReducer;
