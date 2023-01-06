import { createSlice } from "@reduxjs/toolkit";
import store, { RootState } from "./store";
import { IProvider, IPublisher, ICategory } from "../types/ServerEntity";

interface ICategoryGroupByParent {
    id: number;
    name: string;
    isChoosen?: boolean;
    childCategories: {
        id: number;
        name: string;
        parentID: number;
        isChoosen?: boolean;
    }[];
}

export interface QueryPicker {
    providers: IProvider[] | null;
    publishers: IPublisher[] | null;
    categories: ICategoryGroupByParent[] | null;
    authors: string[] | null;
    languages: string[] | null;
}

const initialState: QueryPicker = {
    providers: null,
    publishers: null,
    categories: null,
    authors: null,
    languages: null,
};

export const queryPickerSplice = createSlice({
    name: "queryPicker",
    initialState,
    reducers: {
        setProviders: (state, action) => {
            state.providers = action.payload;
        },
        setPublishers: (state, action) => {
            state.publishers = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setAuthors: (state, action) => {
            state.authors = action.payload;
        },
        setLanguages: (state, action) => {
            state.languages = action.payload;
        },
    },
});

export const selectProviders = (state: RootState) => state.queryPicker.providers;
export const selectPublishers = (state: RootState) => state.queryPicker.publishers;
export const selectCategories = (state: RootState) => state.queryPicker.categories;
export const selectAuthors = (state: RootState) => state.queryPicker.authors;
export const selectLanguages = (state: RootState) => state.queryPicker.languages;

export const { setProviders } = queryPickerSplice.actions;
export const { setPublishers } = queryPickerSplice.actions;
export const { setCategories } = queryPickerSplice.actions;
export const { setAuthors } = queryPickerSplice.actions;
export const { setLanguages } = queryPickerSplice.actions;
