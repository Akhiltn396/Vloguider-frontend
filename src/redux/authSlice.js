import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user") || null,
    loading: false,
    error: false,
    message: "",
    isAuthenticated: false,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = false;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.isAuthenticated = true;
    },
    loginError: (state) => {
      state.error = true;
      state.message =
        state.error === true
          ? "User not found...Please Login again "
          : "User found successfully";
    },
    logOut: (state) => {
      state.user = null;
      // state.error = false
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginError, logOut } =
  authSlice.actions;

export default authSlice.reducer;
