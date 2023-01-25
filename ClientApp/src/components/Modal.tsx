import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Md from "react-modal";

interface Props {
    isOpen: boolean;
    onRequestClose: () => void;
    children: React.ReactNode;
    maxWidth?: string;
}
const customStyles: Md.Styles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "0",
        border: "none",
        width: "100%",
    },
    overlay: {
        backgroundColor: "rgba(0,0,0,0.85)",
        zIndex: 100,
    },
};
Md.setAppElement("#root");
export default function Modal({ isOpen, onRequestClose, children, maxWidth }: Props) {
    const style = {
        ...customStyles,
        content: {
            ...customStyles.content,
            maxWidth: maxWidth,
        },
    };
    return (
        <Md isOpen={isOpen} onRequestClose={onRequestClose} style={style} shouldCloseOnOverlayClick={true}>
            <div
                className="hover:bg-primary-dark maxw text-xl text-white rounded-full absolute right-0 p-1 cursor-pointer"
                onClick={onRequestClose}
            >
                <AiOutlineClose />
            </div>
            {children}
        </Md>
    );
}
