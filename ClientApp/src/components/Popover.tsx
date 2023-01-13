import useElementSize from "hooks/useElementSize";
import useOnClickOutside from "hooks/useOnClickOutside";
import React from "react";
import { createPortal } from "react-dom";
const portalRoot = document.getElementById("root") as HTMLElement;
interface Props {
    children: React.ReactNode;
    anchorEl: HTMLElement | null;
    onClose: () => void;
    open: boolean;
}
const clip_pathStyle: React.CSSProperties = {
    clipPath: "polygon(50% 50%, 0 100%, 100% 100%)",
    zIndex: 60,
};
function Popover({ children, anchorEl, onClose, open }: Props) {
    if (!open) return null;

    return createPortal(<PopoverRoot children={children} anchorEl={anchorEl} onClose={onClose} />, portalRoot);
}

function PopoverRoot({
    children,
    anchorEl,
    onClose,
}: {
    children: React.ReactNode;
    anchorEl: HTMLElement | null;
    onClose: () => void;
}) {
    const [style, setStyle] = React.useState<React.CSSProperties>({});
    const [clipPathStyle, setClipPathStyle] = React.useState<React.CSSProperties>(clip_pathStyle);
    const [ref, size] = useElementSize<HTMLDivElement>();
    useOnClickOutside(ref, onClose, "mousedown");
    const { top, left, height, right } = anchorEl?.getBoundingClientRect() || { top: 0, left: 0, height: 0, right: 0 };
    React.useEffect(() => {
        if (anchorEl) {
            const newStyle = {
                top: top + height + 3,
                left: left,
                zIndex: 60,
            };
            setClipPathStyle({
                ...clip_pathStyle,
                top: top + height + 3,
                left: left + 4,
            });
            if (left + size.width > window.innerWidth) {
                newStyle.left = window.innerWidth - size.width - 40;
            }
            setStyle(newStyle);
        }
    }, [anchorEl, top, left, height, right, size.width, size.height]);
    //toDo: optimize this
    return (
        <>
            <div
                className="absolute bg-slate-200 bg-opacity-80 border top-0 left-0 w-4 h-4 translate-x-1/2 -translate-y-full "
                style={clipPathStyle}
            ></div>
            <div className="absolute bg-white rounded-md p-0 border shadow-xl " style={style} ref={ref}>
                {children}
            </div>
        </>
    );
}

export default Popover;
