import React from "react";
import BookPreview from "../../components/BookPreview";
import BestSellers from "./BestSellers";
import BigSale from "./BigSale";
import TopSeries from "./TopSeries";
import LoadingScreen from "../../components/LoadingScreen";

export default function Home() {
    const [isLoaded, setIsLoaded] = React.useState(false);

    return (
        <div className="w-full h-full ">
            {!isLoaded && <LoadingScreen />}
            <div className="px-7">
                <BestSellers setIsLoaded={setIsLoaded} />
                <BigSale />
                <TopSeries />
                <div className="h-52"></div>
            </div>
        </div>
    );
}
