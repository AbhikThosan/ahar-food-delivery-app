import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: [],
  reducers: {
    setMealIds: (state, action) => {
      return action.payload;
    },
  },
});

export const { setMealIds } = menuSlice.actions;
export default menuSlice.reducer;
