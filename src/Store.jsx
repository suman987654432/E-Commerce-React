import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./WishListSlice"; // Import wishlist slice

const store = configureStore({
  reducer: {
    mycart: cartReducer,
    wishlist: wishlistReducer, // Add wishlist reducer
  },
});

export default store;
