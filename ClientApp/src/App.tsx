import Header from "./components/Header";
import Routes from "./routes";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/index";
import React from "react";
import { authInstance } from "./utils/service";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { login, logout, selectIsAuthenticated } from "./redux/authSplice";
import { addListCartItem } from "./redux/cartSplice";

function App() {
    const dispath = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    React.useEffect(() => {
        authInstance
            .get("/api/Auth/GetUser")
            .then((res) => {
                dispath(login(res.data));
            })
            .catch((err) => {
                if (err instanceof axios.CanceledError) {
                    dispath(logout());
                } else {
                    console.log(err);
                }
            });
    }, []);
    React.useEffect(() => {
        authInstance.get("/api/User/GetCartDetails").then((res) => {
            dispath(addListCartItem(res.data));
        });
    }, [isAuthenticated]);
    return (
        <>
            <RouterProvider router={routes} />
        </>
    );
}

export default App;
