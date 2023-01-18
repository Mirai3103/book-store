import { PayloadAction, createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import store, { RootState } from "./store";
import { IUser } from "types/ServerEntity";
import { cookies } from "utils/axiosInstance";
import { clearCartAsync } from "./cartSplice";

export interface AuthState {
    isAuthenticated: boolean;
    user: IUser | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
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
    },
});

export const { login, logout } = authSplice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
