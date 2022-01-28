import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    errorMessage: "",
  },
  reducers: {
    storeErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
});

export const { storeErrorMessage, clearErrorMessage } = errorSlice.actions;
export default errorSlice.reducer;
