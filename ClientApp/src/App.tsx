import Header from "./components/Header";
import Routes from "./routes";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/index";
import React from "react";
import { authInstance, cookies } from "./utils/axiosInstance";
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
                console.log(err);
                if (err instanceof axios.CanceledError) {
                    dispath(logout());
                }
            });
    }, [isAuthenticated]);
    React.useEffect(() => {
        if (isAuthenticated) {
            authInstance
                .get("/api/User/GetCartDetails")
                .then((res) => {
                    dispath(addListCartItem(res.data));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [isAuthenticated]);
    return (
        <>
            <RouterProvider router={routes} />
        </>
    );
}

export default App;
