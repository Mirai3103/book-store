import React from "react";
import BookPreview from "../../components/BookPreview";
import BestSellers from "./BestSellers";
import BigSale from "./BigSale";
import TopSeries from "./TopSeries";

export default function Home() {
    return (
        <div className="w-full h-full">
            <div className="px-7">
                <BestSellers />
                <BigSale />
                <TopSeries />
                <div className="h-52"></div>
            </div>
        </div>
    );
}
