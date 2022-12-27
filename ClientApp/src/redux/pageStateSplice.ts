import { createSlice } from "@reduxjs/toolkit";
import store, { RootState } from "./store";

interface BreadCrumb {
    name: string;
    path: string;
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
    },
});

export const selectBreadCrumbs = (state: RootState) => state.pageState.breadCrumbs;
export const selectTitle = (state: RootState) => state.pageState.title;

export const { changeBreadCrumbs } = pageStateSplice.actions;
export const { changeTitle } = pageStateSplice.actions;
