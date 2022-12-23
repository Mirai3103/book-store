import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import LoadingScreen from "../components/LoadingScreen";
const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/loading",
        element: <LoadingScreen />,
    },
];
export default function Routes() {
    return useRoutes(routes);
}
