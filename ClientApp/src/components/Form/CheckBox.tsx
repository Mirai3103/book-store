import { Checkbox as MUICheckBox, CheckboxProps } from "@mui/material";
import React from "react";

interface Props extends CheckboxProps {
    label: string;
}

function CheckBox({ label, ...props }: Props) {
    const id = React.useId();
    return (
        <div>
            <MUICheckBox
                {...props}
                id={id}
                sx={{
                    color: "#fff",
                    "&.Mui-checked": {
                        color: "#fff",
                        bgcolor: "#02D871",
                    },
                }}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

export default CheckBox;
