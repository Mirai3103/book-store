import * as React from "react";
import Header from "../Header";
import { useLocation } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import { BiChevronUpCircle } from "react-icons/bi";
import { createToast } from "../Toast";

export default function Layout({ children }: { children: React.ReactNode }) {
    const reactLocation = useLocation();
    const [isLoaded, setIsLoaded] = React.useState(true);
    const location = useLocation();
    const handleScrollToTop = () => {
        window.scrollTo(0, 0);
    };
    React.useLayoutEffect(() => {
        setIsLoaded(false);
        handleScrollToTop();
        setTimeout(() => {
            const ev = new MouseEvent("mousedown", {
                cancelable: true,
                bubbles: true,
                clientX: 1,
                clientY: 1,
            });
            document.dispatchEvent(ev);
            setIsLoaded(true);
        }, 100);
    }, [reactLocation.pathname]);
    React.useEffect(() => {
        const message = location.state?.message;
        const type = location.state?.type || "info";
        if (message) {
            createToast(type, message, type, 5000);
        }
        //clear state
        history.replaceState(null, "", location.pathname);
    }, [location.state]);

    return (
        <div className=" py-0 px-0 relative flex flex-col">
            <Header />
            {!isLoaded && <LoadingScreen />}
            <div className=" overflow-y-auto overflow-x-hidden ">{children}</div>
            <div className="fixed bottom-0 right-0 m-3">
                <button className="bg-primary rounded-full p-2 text-white" onClick={handleScrollToTop}>
                    <BiChevronUpCircle size={30} />
                </button>
            </div>
        </div>
    );
}
