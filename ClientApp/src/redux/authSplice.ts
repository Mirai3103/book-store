import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import store, { RootState } from "./store";
import { IUser } from "types/ServerEntity";
import { cookies } from "utils/axiosInstance";
import { DeliveryAddress } from "../types/ServerEntity";
import { authInstance } from "../utils/axiosInstance";

export interface AuthState {
    isAuthenticated: boolean;
    user: IUser | null;
    deliveryAddresses: DeliveryAddress[] | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    deliveryAddresses: null,
};

export const authSplice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("refreshToken");
            cookies.remove("accessToken");
            //dispatch(removeAllCartItem());
        },
        setDeliveryAddresses: (state, action: PayloadAction<DeliveryAddress[] | null>) => {
            state.deliveryAddresses = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchDeliveryAddressesAsync.fulfilled, (state, action) => {
            state.deliveryAddresses = action.payload;
        });
    },
});

export const fetchDeliveryAddressesAsync = createAsyncThunk("auth/fetchDeliveryAddresses", async () => {
    const res = await authInstance.get("/api/DeliveryAddress/GetMyAddress");
    return res.data;
});

export const { login, logout, setDeliveryAddresses } = authSplice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectDeliveryAddresses = (state: RootState) => state.auth.deliveryAddresses;
