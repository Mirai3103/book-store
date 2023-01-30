import React from "react";
import { RouteObject, useRoutes, createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import LoadingScreen from "../components/LoadingScreen";
import Page404 from "../pages/Page404";
import Layout from "../components/Layout";
import BookDetail from "../pages/BookDetail/index";
import SearchPage from "../pages/Search";
import TestPage from "pages/Test";
import TrendingPage from "pages/TrendingPage";
import CartPage from "../pages/Cart/index";
import CheckoutPage from "../pages/Checkout/index";
import withAuthPage from "HOC/withAuth";
function Default() {
    return <Outlet />;
}
function NormalUserLayout() {
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
}
function AdminLayout() {
    return (
        <div>
            <h1>This admin</h1>
            <Outlet />
        </div>
    );
}
const AdminPage = withAuthPage(AdminLayout, true);

const routes = createBrowserRouter([
    {
        element: <Default />,
        errorElement: <Page404 />,
        children: [
            {
                element: <NormalUserLayout />,
                path: "",
                children: [
                    {
                        path: "",
                        element: <Home />,
                    },
                    {
                        path: "/book/:id",
                        element: <BookDetail />,
                    },
                    {
                        path: "/search",
                        element: <SearchPage />,
                    },
                    {
                        path: "/trending",
                        element: <TrendingPage />,
                    },
                    {
                        path: "/cart",
                        element: <CartPage />,
                    },
                    {
                        path: "/checkout",
                        element: <CheckoutPage />,
                    },
                ],
            },
            {
                element: <AdminPage />,
                path: "admin",
                children: [
                    {
                        path: "",
                        element: <h1>Test</h1>,
                    },
                    {
                        path: "hehe",
                        element: <h1>Testhehe</h1>,
                    },
                ],
            },
            {
                element: <TestPage />,
                path: "test",
            },
        ],
    },
]);

export default routes;
