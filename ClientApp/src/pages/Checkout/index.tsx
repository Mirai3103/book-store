import React from "react";
import ChooseAddress from "./ChooseAddress";

interface IProps {}

export default function CheckoutPage({}: IProps) {
    return (
        <div className="w-full h-full flex">
            <ChooseAddress />
        </div>
    );
}
