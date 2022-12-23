import React from "react";
import LogoIcon from "../assets/logo.png";

export default function LoadingScreen() {
    const text = "Bookstore";
    return (
        <div className="grid w-screen h-screen">
            <div className="flex items-center justify-center gap-x-3">
                <img src={LogoIcon} alt="Logo" className="w-28 h-auto animate-spin-slow" />
                <div className="font-bold text-3xl text-primary bounce-loading">
                    {text.split("").map((char, index) => (
                        <span key={index}>{char}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
