import React from "react";
import LogoIcon from "../assets/logo.png";
import ReactDOM from "react-dom";

export default function LoadingScreen() {
    const text = "Bookstore";
    const bodyElement = document.body;
    return ReactDOM.createPortal(
        <div className="grid w-screen h-screen  top-0 left-0  bg-white fixed " style={{ zIndex: 1000 }}>
            <div className="flex items-center justify-center gap-x-3">
                <img src={LogoIcon} alt="Logo" className="w-28 h-auto animate-spin-slow" />
                <div className="font-bold text-3xl text-primary bounce-loading">
                    {text.split("").map((char, index) => (
                        <span key={index}>{char}</span>
                    ))}
                </div>
            </div>
        </div>,
        bodyElement
    );
}
