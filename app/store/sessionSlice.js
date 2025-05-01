import { createSlice } from "@reduxjs/toolkit";

// Initialize state from localStorage if available
const initialState = {
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user")) || null
      : null, // Fetch user from localStorage
  token:
    typeof window !== "undefined"
      ? localStorage.getItem("token") || null
      : null, // Fetch token from localStorage
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      // Save to localStorage when user logs in
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user)); // Store user data in localStorage
        localStorage.setItem("token", token); // Store token in localStorage
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;

      // Remove from localStorage when user logs out
      if (typeof window !== "undefined") {
        localStorage.removeItem("user"); // Remove user data from localStorage
        localStorage.removeItem("token"); // Remove token from localStorage
      }
    },
  },
});

export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
