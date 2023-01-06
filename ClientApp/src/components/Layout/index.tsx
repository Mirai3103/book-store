import * as React from "react";
import Header from "../Header";
import { useLocation } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";

export default function Layout({ children }: { children: React.ReactNode }) {
    const reactLocation = useLocation();
    const [isLoaded, setIsLoaded] = React.useState(true);
    React.useLayoutEffect(() => {
        setIsLoaded(false);
        setTimeout(() => {
            window.scrollTo(0, 0);
            setIsLoaded(true);
        }, 1000);
    }, [reactLocation.pathname]);
    return (
        <div className=" py-0 px-0 relative flex flex-col">
            <Header />
            {!isLoaded && <LoadingScreen />}
            <div className=" overflow-y-auto overflow-x-hidden ">{children}</div>
        </div>
    );
}
