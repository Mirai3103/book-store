import React from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className, ...props }: Props) {
    return (
        <button
            type="button"
            {...props}
            className={"bg-primary text-white rounded-md px-2 py-2 hover:bg-primary-dark " + className}
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
                "border-2 hoverv border-primary text-primary rounded-md px-2 py-2 hover:bg-primary-dark hover:text-white " +
                className
            }
        >
            {children}
        </button>
    );
}
