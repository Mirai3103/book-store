import React from "react";

interface IColor {
    label: string;
    input: string;
}
export const colors = {
    authColor: {
        label: "text-white",
        input: "border-white bg-primary focus-within:bg-white text-white focus-within:text-primary-dark ",
    },
};
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    classColor?: IColor;
}

function Input({ label, classColor = colors.authColor, ...props }: Props) {
    const id = React.useId();
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={id} className={`${classColor.label} font-semibold text-lg`}>
                    {label}
                </label>
            )}
            <div
                className={`flex items-center border   rounded-md p-2 text-base  focus-within:shadow-md ${classColor.input}`}
            >
                <input {...props} id={id} className="outline-none w-full bg-transparent px-1 placeholder-slate-200" />
            </div>
        </div>
    );
}

export default Input;
