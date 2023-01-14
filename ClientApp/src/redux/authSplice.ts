import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import store, { RootState } from "./store";
import { IUser } from "types/ServerEntity";

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
        },
    },
});

export const { login, logout } = authSplice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
