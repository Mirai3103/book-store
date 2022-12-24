import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import LoadingScreen from "../components/LoadingScreen";
import Page404 from "../pages/Page404";
import Layout from "../components/Layout";
import BookDetail from "../pages/BookDetail/index";
const routes: RouteObject[] = [
    {
        path: "/",
        element: (
            <Layout>
                <Home />
            </Layout>
        ),
    },
    {
        path: "/loading",
        element: <LoadingScreen />,
    },
    {
        path: "/book/:id",
        element: (
            <Layout>
                <BookDetail />
            </Layout>
        ),
    },
    //404
    {
        path: "*",
        element: <Page404 />,
    },
];
export default function Routes() {
    return useRoutes(routes);
}
