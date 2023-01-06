import { configureStore } from "@reduxjs/toolkit";
import { pageStateSplice } from "./pageStateSplice";
import { queryPickerSplice } from "./queryPickerSplice";

const store = configureStore({
    reducer: {
        pageState: pageStateSplice.reducer,
        queryPicker: queryPickerSplice.reducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
