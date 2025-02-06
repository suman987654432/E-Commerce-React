import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0, // Ensure this updates dynamically
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
            if (existingItem) {
                alert("This product is already added to the cart!");
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1, price: Number(action.payload.price) });
                state.totalQuantity += 1;
                state.totalPrice += action.payload.price; // Add price on adding product
            }
        },
        removeFromCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state.totalPrice -= state.cartItems[itemIndex].price * state.cartItems[itemIndex].quantity;
                state.totalQuantity -= state.cartItems[itemIndex].quantity;
                state.cartItems.splice(itemIndex, 1);
            }
        },
        increaseQuantity: (state, action) => {
            const item = state.cartItems.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
                state.totalQuantity += 1;
                state.totalPrice += item.price; // Update total price
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.cartItems.find((item) => item.id === action.payload.id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                state.totalQuantity -= 1;
                state.totalPrice -= item.price; // Update total price
            }
        },
    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
