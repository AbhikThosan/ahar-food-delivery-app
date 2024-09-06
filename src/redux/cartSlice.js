import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    updateCartItem: (state, action) => {
      const index = state.findIndex(
        (item) => item.mealid === action.payload.mealid
      );
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
    setCart: (state, action) => {
      return action.payload;
    },
  },
});

export const { addToCart, updateCartItem, setCart } = cartSlice.actions;
export default cartSlice.reducer;
