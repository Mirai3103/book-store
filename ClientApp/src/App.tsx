import Header from "./components/Header";
import Routes from "./routes";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/index";

function App() {
    return (
        <>
            <RouterProvider router={routes} />
        </>
    );
}

export default App;
