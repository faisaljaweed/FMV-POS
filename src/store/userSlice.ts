import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  DeleteUser,
  GetUser,
  LoginUser,
  Logout,
  Register,
} from "../Api/User_Api";
import { UserTypes } from "../Types/types";
import { Rootstate } from "./store";

interface UserState {
  items: UserTypes[];
  apiCallInProgress: boolean;
  userInfo: UserTypes | null;
}

const initialState: UserState = {
  userInfo: null,
  items: [],
  apiCallInProgress: false,
};

export const getUserThunk = createAsyncThunk("user/get-user", async () => {
  const user = await GetUser();
  return user;
});

export const deleteUserThunk = createAsyncThunk(
  "user/deleteuser",
  async (id: string) => {
    const deleteUser = await DeleteUser(id);
    return deleteUser;
  }
);

export const loginUserThunk = createAsyncThunk(
  "user/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const loginUser = await LoginUser(credentials);
      // Access Token
      const accessToken = loginUser.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      // Role
      const role = loginUser.data.loggedInUser.role;
      localStorage.setItem("role", role);
      // UserName
      const username = loginUser.data.loggedInUser.username;
      localStorage.setItem("userName", username);
      // User
      const user = loginUser.data.loggedInUser;
      localStorage.setItem("user", JSON.stringify(user));
      return loginUser;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  "user/registerUser",
  async (user: Partial<UserTypes>) => {
    const newUser = await Register(user);
    return newUser;
  }
);

export const logoutUserThunk = createAsyncThunk("user/logoutUser", async () => {
  const logoutUser = await Logout();
  localStorage.removeItem("accessToken");
  localStorage.removeItem("role");
  localStorage.removeItem("usename");
  return logoutUser;
});
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All User Only Admin
      .addCase(getUserThunk.pending, (state) => {
        state.apiCallInProgress = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.apiCallInProgress = false;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.apiCallInProgress = false;
      })
      // Register User (Vendor)
      .addCase(registerUserThunk.pending, (state) => {
        state.apiCallInProgress = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.apiCallInProgress = false;
      })
      .addCase(registerUserThunk.rejected, (state) => {
        state.apiCallInProgress = false;
      })
      // Login (Vendor and admin)
      .addCase(loginUserThunk.pending, (state) => {
        state.apiCallInProgress = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.apiCallInProgress = false;
        state.userInfo = action.payload.data; // Assuming your API returns data in this structure
      })
      .addCase(loginUserThunk.rejected, (state) => {
        state.apiCallInProgress = false;
      })
      // Logout (Admin and Vendor)
      .addCase(logoutUserThunk.pending, (state) => {
        state.apiCallInProgress = true;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.userInfo = null;
        state.apiCallInProgress = false;
        state.items = [];
      })
      .addCase(logoutUserThunk.rejected, (state) => {
        state.apiCallInProgress = false;
      });
  },
});

const userReducer = userSlice.reducer;

export const { logout } = userSlice.actions;
export const selectApiCallInProgress = (state: Rootstate) => {
  return state.user.apiCallInProgress;
};

export const selectCurrentUser = (state: Rootstate) => state.user.userInfo;
export const selectUserList = (state: Rootstate) => {
  return state.user.items;
};

export default userReducer;
