import React from "react";
import BookPreview from "../../components/BookPreview";
import BestSellers from "./BestSellers";
import BigSale from "./BigSale";

export default function Home() {
    return (
        <div className="w-full h-full">
            <div className="px-7">
                <BestSellers />
                <BigSale />
                <div className="h-52"></div>
            </div>
        </div>
    );
}
