import { configureStore } from "@reduxjs/toolkit";
import { pageStateSplice } from "./pageStateSplice";
import { queryPickerSplice } from "./queryPickerSplice";
import { cartSplice } from "./cartSplice";
import { authSplice } from "./authSplice";
const store = configureStore({
    reducer: {
        pageState: pageStateSplice.reducer,
        queryPicker: queryPickerSplice.reducer,
        cart: cartSplice.reducer,
        auth: authSplice.reducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
