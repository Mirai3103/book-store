import * as React from "react";
import Header from "../Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-screen h-screen py-0 px-0 relative flex flex-col">
            <Header title="Home" />
            <div className=" overflow-auto grow">{children}</div>
        </div>
    );
}
