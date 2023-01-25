import React from "react";
export const colors = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    invertPrimary: "bg-white text-primary-dark hover:bg-slate-100",
};
interface IColorsButton {
    [key: string]: string;
}
interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    classColor?: keyof IColorsButton;
}

export default function Button({ children, className, classColor = colors.primary, ...props }: Props) {
    return (
        <button
            type="button"
            {...props}
            className={
                `${classColor} rounded-md px-2 py-2 flex justify-center items-center font-semibold text-lg ` + className
            }
        >
            {children}
        </button>
    );
}

export function ButtonOutline({ children, className, ...props }: Props) {
    return (
        <button
            type="button"
            {...props}
            className={
                "border hoverv border-primary text-primary rounded-md px-2 py-2 hover:bg-primary-dark hover:text-white flex justify-center items-center " +
                className
            }
        >
            {children}
        </button>
    );
}
