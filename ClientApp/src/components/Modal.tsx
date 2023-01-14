import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Md from "react-modal";

interface Props {
    isOpen: boolean;
    onRequestClose: () => void;
    children: React.ReactNode;
}
const customStyles: Md.Styles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",

        width: "500px",
        padding: "0",
        border: "none",
    },
    overlay: {
        backgroundColor: "rgba(0,0,0,0.85)",
        zIndex: 100,
    },
};
Md.setAppElement("#root");
export default function Modal({ isOpen, onRequestClose, children }: Props) {
    return (
        <Md isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} shouldCloseOnOverlayClick={true}>
            <div
                className="hover:bg-primary-dark text-xl text-white rounded-full absolute right-0 p-1 cursor-pointer"
                onClick={onRequestClose}
            >
                <AiOutlineClose />
            </div>
            {children}
        </Md>
    );
}
