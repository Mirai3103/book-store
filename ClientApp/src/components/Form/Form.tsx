import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLFormElement> {}

function Form({ children, ...props }: Props) {
    return (
        <form {...props} className="bg-primary p-6 w-full rounded-md text-white gap-y-3 flex flex-col">
            {children}
        </form>
    );
}

export default Form;
