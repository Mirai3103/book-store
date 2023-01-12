import React from "react";
import { createPortal } from "react-dom";
const portalRoot = document.getElementById("root") as HTMLElement;
interface Props {
    children: React.ReactNode;
    anchorEl: HTMLElement | null;
    vertical?: "top" | "bottom";
    horizontal?: "left" | "right" | "center";
}

function Popover({ children, anchorEl, vertical = "bottom", horizontal = "center" }: Props) {
    const [style, setStyle] = React.useState<React.CSSProperties>({});

    React.useEffect(() => {
        if (anchorEl) {
            const { top, left, height } = anchorEl.getBoundingClientRect();
            console.log(anchorEl.getBoundingClientRect());
            setStyle({
                top: top + height,
                left: left,
                zIndex: 100,
            });
        }
    }, [anchorEl]);
    const El = (
        <div className="absolute bg-white rounded-sm p-2 border shadow-xl  " style={style}>
            {children}
        </div>
    );
    return createPortal(El, portalRoot);
}

export default Popover;
