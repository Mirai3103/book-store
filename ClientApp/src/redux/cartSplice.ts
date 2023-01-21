import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import store, { RootState } from "./store";
import { IBookPreview } from "../types/ServerEntity";
import { authInstance } from "../utils/axiosInstance";
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
        addListCartItem: (state, action: PayloadAction<CartItem[]>) => {
            state.cartItems = action.payload;
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(addBookAsync.fulfilled, (state, action) => {
                const cartItem = action.payload;
                cartItem.isCheck = false;
                const existingCartItem = state.cartItems.find((item) => item.bookId === cartItem.bookId);
                if (existingCartItem) {
                    existingCartItem.quantity += cartItem.quantity;
                } else {
                    state.cartItems.push(cartItem);
                }
            })
            .addCase(addBookAsync.rejected, (state, action) => {
                console.log(action.error);
            })
            .addCase(removeBookAsync.fulfilled, (state, action) => {
                const bookId = action.payload;
                const existingCartItem = state.cartItems.find((item) => item.bookId === bookId);
                if (existingCartItem) {
                    state.cartItems = state.cartItems.filter((item) => item.bookId !== bookId);
                }
            })
            .addCase(removeBookAsync.rejected, (state, action) => {
                console.log(action.error);
            })
            .addCase(clearCartAsync.fulfilled, (state, action) => {
                state.cartItems = [];
            })
            .addCase(clearCartAsync.rejected, (state, action) => {
                console.log(action.error);
            })
            .addCase(setQuantityAsync.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.map((item) => {
                    if (item.bookId === action.payload.bookId) {
                        item.quantity = action.payload.quantity;
                    }
                    return item;
                });
            })
            .addCase(quickBuyAsync.fulfilled, (state, action) => {
                const cartItem = action.payload;
                cartItem.isCheck = false;
                const existingCartItem = state.cartItems.find((item) => item.bookId === cartItem.bookId);
                if (existingCartItem) {
                    existingCartItem.quantity += cartItem.quantity;
                    state.cartItems = state.cartItems.filter((item) => item.bookId !== cartItem.bookId);
                    state.cartItems.unshift(cartItem);
                } else {
                    state.cartItems.unshift(cartItem);
                }
                state.cartItems = state.cartItems.map((item) => {
                    item.isCheck = item.bookId === cartItem.bookId;
                    return item;
                });
            });
    },
});

export const addBookAsync = createAsyncThunk("cart/addBookAsync", async (cartItem: CartItem, { getState }) => {
    const isAuth = (getState() as any).auth.isAuthenticated;
    if (!isAuth) {
        return cartItem;
    } else {
        const res = await authInstance.post("/api/User/UpdateCart", {
            bookId: cartItem.bookId,
            amount: cartItem.quantity,
        });
    }
    return cartItem;
});

export const quickBuyAsync = createAsyncThunk("cart/quickBuyAsync", async (cartItem: CartItem, { getState }) => {
    const isAuth = (getState() as any).auth.isAuthenticated;
    if (!isAuth) {
        return cartItem;
    } else {
        const res = await authInstance.post("/api/User/UpdateCart", {
            bookId: cartItem.bookId,
            amount: cartItem.quantity,
        });
    }
    return cartItem;
});

export const removeBookAsync = createAsyncThunk("cart/removeBookAsync", async (bookId: number, { getState }) => {
    const isAuth = (getState() as any).auth.isAuthenticated;
    if (!isAuth) {
        return bookId;
    } else {
        const res = await authInstance.post("/api/User/UpdateCart", {
            bookId: bookId,
            amount: 0,
        });
    }
    return bookId;
});
export const clearCartAsync = createAsyncThunk("cart/clearCartAsync", async (_, { getState }) => {
    const isAuth = (getState() as any).auth.isAuthenticated;
    if (!isAuth) {
        return;
    } else {
        const res = await authInstance.post("/api/User/ClearCart");
    }
});

export const setQuantityAsync = createAsyncThunk(
    "cart/setQuantityAsync",
    async (
        cartItem: {
            bookId: number;
            quantity: number;
        },
        { getState }
    ) => {
        const isAuth = (getState() as any).auth.isAuthenticated;
        if (!isAuth) {
            return cartItem;
        } else {
            const res = await authInstance.post("/api/User/UpdateCart", {
                bookId: cartItem.bookId,
                amount: cartItem.quantity,
                isSet: true,
            });
        }
        return cartItem;
    }
);

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const { changeCartItemCheck, changeAllCartItemCheck, addListCartItem } = cartSplice.actions;
