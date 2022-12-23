import Header from "./components/Header";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <div className="w-screen h-screen py-0 px-0 relative flex flex-col">
            <Header title="Home" />
            <div className=" overflow-auto grow">
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
