import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import categoryReducer from "./categorySlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    category: categoryReducer,
    cart: cartReducer,
  },
});

export default store;
