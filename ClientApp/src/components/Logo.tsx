import React from "react";
import { Link } from "react-router-dom";
import LogoImg from "../assets/logo.png";

export default function Logo() {
    return (
        <Link to="/" className="flex gap-x-1 items-center">
            <img src={LogoImg} alt="logo" className="w-10 h-auto" />
            <div className="text-2xl text-primary font-semibold leading-9">BookStore</div>
        </Link>
    );
}
