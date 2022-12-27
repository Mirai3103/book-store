import { configureStore } from "@reduxjs/toolkit";
import { pageStateSplice } from "./pageStateSplice";

const store = configureStore({
    reducer: {
        pageState: pageStateSplice.reducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
