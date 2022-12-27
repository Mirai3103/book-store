import Header from "./components/Header";
import Routes from "./routes";
import { BrowserRouter, useLocation } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    );
}

export default App;
