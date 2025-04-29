import axios from "axios";
import { ProductTypes } from "../Types/types";

export const CreateProduct = async (formData: FormData) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v1/product/create-product`,
      formData,
      {
        headers: {
          Authorization: `Beare ${localStorage.getItem("accessToken")}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in CreateProduct API: ", error);
  }
};
export const GetAllProduct = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/product/get-all-product`,
      {
        headers: {
          Authorization: `Beare ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in GetAllProduct API: ", error);
  }
};

export const GetProductById = async (id: any) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/product/get-product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in GetProdutById", error);
  }
};

export const EditProduct = async ({
  id,
  updateProduct,
}: {
  id: string;
  updateProduct: Partial<ProductTypes>;
}) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/v1/product/update-product/${id}`,
      {
        updateProduct,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in EditProduct", error);
  }
};

export const DeleteProduct = async (id: any) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/v1/product/delete-product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error in DeleteProduct", error);
  }
};
