import * as React from "react";
import Header from "../Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className=" py-0 px-0 relative flex flex-col">
            <Header title="Home" />
            <div className=" overflow-y-auto overflow-x-hidden ">{children}</div>
        </div>
    );
}
