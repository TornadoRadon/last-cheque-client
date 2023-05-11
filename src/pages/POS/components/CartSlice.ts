import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentType } from "../../../models/Cheque";
import { ProductWithCat } from "../../../models/Product";
import { RootState } from "../../../utils/store";

export interface CartState {
  products: ProductWithCat[];
  paymentType: PaymentType;
}

const initialState: CartState = {
  products: [],
  paymentType: PaymentType.CASH,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    empty: (state) => {
      state.products = [];
      state.paymentType = PaymentType.CASH;
    },
    setPaymentType: (
      state,
      action: PayloadAction<CartState["paymentType"]>
    ) => {
      state.paymentType = action.payload;
    },
    addProduct: (state, action: PayloadAction<ProductWithCat>) => {
      let index = state.products.findIndex((e) => e.id === action.payload.id);
      if (index === -1) {
        //add new from top
        state.products.unshift(action.payload);
      } else {
        //increment existing one
        state.products[index].qty++;
      }
    },
    minProduct: (state, action: PayloadAction<ProductWithCat>) => {
      let index = state.products.findIndex((e) => e.id === action.payload.id);
      
      if (state.products[index].qty > 1) {
        //decrese
        state.products[index].qty--;
      } else {
        //remove
        state.products = state.products
        .filter((e) => e.id !== action.payload.id)
        .map((e) => e);
      }
    },
    removeProduct: (state, action: PayloadAction<ProductWithCat>) => {
      state.products = state.products
        .filter((e) => e.id !== action.payload.id)
        .map((e) => e);
    },
  },
});

export const { empty, setPaymentType, addProduct, removeProduct, minProduct } = cartSlice.actions;
export const cart = (state: RootState) => state.cart;
export default cartSlice.reducer;
