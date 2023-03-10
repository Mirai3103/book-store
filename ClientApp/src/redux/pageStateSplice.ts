import { createSlice } from "@reduxjs/toolkit";
import store, { RootState } from "./store";

export interface BreadCrumb {
    name: string;
    path: string;
    fullName?: string;
}

export interface PageState {
    breadCrumbs: BreadCrumb[];
    title: string;
}

const initialState: PageState = {
    breadCrumbs: [
        {
            name: "Home",
            path: "/",
        },
    ],
    title: "Home",
};

export const pageStateSplice = createSlice({
    name: "pageState",
    initialState,
    reducers: {
        changeBreadCrumbs: (state, action) => {
            state.breadCrumbs = action.payload;
        },
        changeTitle: (state, action) => {
            state.title = action.payload;
        },
        resetPageState: (state) => {
            state.title = initialState.title;
            state.breadCrumbs = initialState.breadCrumbs;
        },
    },
});

export const selectBreadCrumbs = (state: RootState) => state.pageState.breadCrumbs;
export const selectTitle = (state: RootState) => state.pageState.title;

export const { changeBreadCrumbs } = pageStateSplice.actions;
export const { changeTitle } = pageStateSplice.actions;
export const { resetPageState } = pageStateSplice.actions;
