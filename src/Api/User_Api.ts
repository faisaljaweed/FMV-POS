import axios from "axios";
import { UserTypes } from "../Types/types";
export const LoginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v1/user/login`,
      credentials
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const Register = async (user: Partial<UserTypes>) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v1/user/sigup`,
      user
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const Logout = async () => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v1/user/logout`
    );
    return response;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const GetUser = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/user/get-user`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const DeleteUser = async (id: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/v1/user/delete-user/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
