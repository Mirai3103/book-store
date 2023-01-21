import React from "react";
import BillView from "./BillView";
import CartView from "./CartView";

export default function CartPage() {
    return (
        <div className="w-full flex mx-4 bg-transparent justify-evenly">
            <CartView />
            <BillView />
        </div>
    );
}
