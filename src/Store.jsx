import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./WishListSlice"; // Import wishlist slice
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persist config for cart
const cartPersistConfig = {
  key: "cart",
  storage,
};

// Persist config for wishlist
const wishlistPersistConfig = {
  key: "wishlist",
  storage,
};

// Create persisted reducers
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedWishlistReducer = persistReducer(wishlistPersistConfig, wishlistReducer);

const store = configureStore({
  reducer: {
    mycart: persistedCartReducer, // Persisted cart reducer
    wishlist: persistedWishlistReducer, // Persisted wishlist reducer
  },
});

export const persistor = persistStore(store);
export default store;
