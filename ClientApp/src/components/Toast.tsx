import React from "react";
import { AiFillInfoCircle, AiFillCheckCircle, AiFillWarning, AiOutlineClose } from "react-icons/ai";
import { createRoot } from "react-dom/client";
const portalRoot = document.getElementById("root") as HTMLElement;

const toastTheme = {
    info: {
        bg: "#CAFDF5",
        color: "#003768",
        icon: <AiFillInfoCircle style={{ color: "#CAFDF5" }} />,
    },
    success: {
        bg: "rgb(216, 251, 222)",
        color: "#0A5554",
        icon: <AiFillCheckCircle style={{ color: "#36B37E" }} />,
    },
    warning: {
        bg: "#FFF5CC",
        color: "#844F10",
        icon: <AiFillWarning style={{ color: "#FBFBFC" }} />,
    },
    error: {
        bg: "#FBFBFC",
        color: "#7A0916",
        icon: <AiFillInfoCircle style={{ color: "#FF5630" }} />,
    },
};
export type ToastType = keyof typeof toastTheme;
interface Props {
    title: string;
    message: string;
    type: ToastType;
    onClose: () => void;
}

export default function Toast({ title, message, type, onClose }: Props) {
    const [style, setStyle] = React.useState<React.CSSProperties>({
        transition: "all 0.6s ease-in-out",
        right: "20px",
        transform: "translateX(100%)",
        backgroundColor: toastTheme[type].bg,
    });
    React.useEffect(() => {
        const t = setTimeout(() => {
            setStyle({
                ...style,
                transform: "translateX(0)",
            });
        }, 100);
        return () => clearTimeout(t);
    }, [type]);
    const El = (
        <div className="fixed top-5 max-w-sm gap-x-5 p-4 z-50 flex rounded-md shadow-lg " style={style}>
            <div className="text-3xl">{toastTheme[type].icon}</div>
            <div style={{ color: toastTheme[type].color }}>
                <div className="font-bold">{title}</div>
                <div>{message}</div>
            </div>
            <div className="-mt-3 -mr-3">
                <div className="hover:bg-gray-200 text-lg rounded-full p-1 cursor-pointer" onClick={onClose}>
                    <AiOutlineClose />
                </div>
            </div>
        </div>
    );
    return El;
}

export const createToast = (title: string, message: string, type: ToastType, timeout: number = 3000) => {
    const el = document.createElement("div");
    el.className = "toast";
    portalRoot.appendChild(el);
    const handleClose = () => {
        if (portalRoot.contains(el)) {
            portalRoot.removeChild(el);
        }
    };
    createRoot(el).render(<Toast title={title} message={message} type={type} onClose={handleClose} />);
    setTimeout(() => {
        handleClose();
    }, timeout);
};
