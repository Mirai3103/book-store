import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import store, { RootState } from "./store";
import { IBookPreview } from "../types/ServerEntity";

export interface CartItem {
    bookId: number;
    book: IBookPreview;
    quantity: number;
    isCheck?: boolean;
}

export interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

export const cartSplice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCartItem: (state, action: PayloadAction<CartItem>) => {
            const cartItem = action.payload;
            cartItem.isCheck = false;
            const existingCartItem = state.cartItems.find((item) => item.bookId === cartItem.bookId);
            if (existingCartItem) {
                existingCartItem.quantity += cartItem.quantity;
            } else {
                state.cartItems.push(cartItem);
            }
        },
        removeCartItem: (state, action: PayloadAction<number>) => {
            const bookId = action.payload as number;
            const existingCartItem = state.cartItems.find((item) => item.bookId === bookId);
            if (existingCartItem) {
                state.cartItems = state.cartItems.filter((item) => item.bookId !== bookId);
            }
        },
        changeCartItemQuantity: (state, action: PayloadAction<{ bookId: number; quantity: number }>) => {
            const { bookId, quantity } = action.payload as { bookId: number; quantity: number };
            const existingCartItem = state.cartItems.find((item) => item.bookId === bookId);
            if (existingCartItem) {
                if (quantity <= 0) {
                    state.cartItems = state.cartItems.filter((item) => item.bookId !== bookId);
                    return;
                }
                existingCartItem.quantity = quantity;
            }
        },
        changeCartItemCheck: (state, action: PayloadAction<{ bookId: number; isCheck: boolean }>) => {
            const { bookId, isCheck } = action.payload as { bookId: number; isCheck: boolean };
            const existingCartItem = state.cartItems.find((item) => item.bookId === bookId);
            if (existingCartItem) {
                existingCartItem.isCheck = isCheck;
            }
        },
        changeAllCartItemCheck: (state, action: PayloadAction<boolean>) => {
            const isCheck = action.payload as boolean;
            state.cartItems.forEach((item) => (item.isCheck = isCheck));
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
    },
});

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const {
    addCartItem,
    removeCartItem,
    changeCartItemQuantity,
    changeCartItemCheck,
    changeAllCartItemCheck,
    clearCart,
} = cartSplice.actions;
