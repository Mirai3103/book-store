import React from "react";
import { RouteObject, useRoutes, createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import LoadingScreen from "../components/LoadingScreen";
import Page404 from "../pages/Page404";
import Layout from "../components/Layout";
import BookDetail from "../pages/BookDetail/index";
import SearchPage from "../pages/Search";

// const routes2: RouteObject[] = [
//     {
//         path: "/",
//         element: (
//             <Layout>
//                 <Home />
//             </Layout>
//         ),
//     },
//     {
//         path: "/loading",
//         element: <LoadingScreen />,
//     },
//     {
//         path: "/book/:id",
//         element: (
//             <Layout>
//                 <BookDetail />
//             </Layout>
//         ),
//     },
//     {
//         path: "/search",
//         element: (
//             <Layout>
//                 <Search />
//             </Layout>
//         ),
//     },
//     //404
//     {
//         path: "*",
//         element: <Page404 />,
//     },
// ];
// export default function Routes() {
//     return useRoutes(routes2);
// }

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
                        path: "/",
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
                ],
            },
            {
                element: <AdminLayout />,
                path: "/admin",
                children: [
                    {
                        path: "/admin",
                        element: <h1>Test</h1>,
                    },
                ],
            },
        ],
    },
]);

export default routes;
