import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ShoppingCartType } from "../types/index";

interface CartState {
  cart: ShoppingCartType[];
  cartStatus: boolean;
  detailStatus: boolean;
}

const initialState: CartState = {
  cart: localStorage.getItem("fakeCart")
    ? JSON.parse(localStorage.getItem("fakeCart") || "")
    : [],
  cartStatus: false,
  detailStatus: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (
      state: { cart: ShoppingCartType[] },
      action: PayloadAction<ShoppingCartType>
    ) => {
      let updateStatus: boolean = false;
      state.cart = state.cart.map((item): any => {
        if (item.product.id === action.payload.product.id) {
          updateStatus = true;
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      if (!updateStatus) {
        state.cart.push(action.payload);
      }
      localStorage.setItem("fakeCart", JSON.stringify(state.cart));
    },
    deleteCart: (
      state: { cart: any[] },
      action: PayloadAction<ShoppingCartType>
    ) => {
      console.log(action.payload);
      state.cart = state.cart.filter((item: { product: { id: number } }) => {
        return item.product.id !== action.payload.product.id;
      });
      localStorage.setItem("fakeCart", JSON.stringify(state.cart));
    },
    changeCartStatus: (state: { cartStatus: boolean }) => {
      state.cartStatus = !state.cartStatus;
    },
    clearCart: (state: { cart: ShoppingCartType[] }) => {
      state.cart = [];
      localStorage.removeItem("fakeCart");
    },
  },
});

export const { addCart, changeCartStatus, deleteCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
