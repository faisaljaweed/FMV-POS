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
  async (formData: FormData) => {
    const createProduct = await CreateProduct(formData);
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
  async ({
    id,
    updateProduct,
  }: {
    id: string;
    updateProduct: Partial<ProductTypes>;
  }) => {
    const editProduct = await EditProduct({ id, updateProduct });
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
      // get All Product
      .addCase(getProductThunk.pending, (state) => {
        state.apiCallInProgress = true;
      })
      .addCase(getProductThunk.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.apiCallInProgress = false;
      })
      .addCase(getProductThunk.rejected, (state) => {
        state.apiCallInProgress = false;
      })
      // Add a product
      .addCase(addProductThunk.pending, (state) => {
        state.apiCallInProgress = true;
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        state.apiCallInProgress = false;
        state.items.unshift(action.payload);
      })
      .addCase(addProductThunk.rejected, (state) => {
        state.apiCallInProgress = false;
      })
      // Edit Product
      .addCase(editProductThunk.pending, (state) => {
        state.apiCallInProgress = true;
      })
      .addCase(editProductThunk.fulfilled, (state, action) => {
        state.apiCallInProgress = false;
        const updatedProduct = action.payload?.data;
        const index = state.items.findIndex(
          (p) => p._id === updatedProduct._id
        );
        console.log(updatedProduct._id);
        if (index !== -1) {
          state.items[index] = updatedProduct;
        }
      })

      .addCase(editProductThunk.rejected, (state) => {
        state.apiCallInProgress = false;
      });
    //
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
