import React from "react";
import { BiUser } from "react-icons/bi";
import useToggle from "../../hooks/useToggle";
import Modal from "../Modal";
import SigninForm from "components/Auth/SigninForm";
import { AiOutlineClose } from "react-icons/ai";
import { useAppSelector } from "redux/hooks";
import { selectUser } from "redux/authSplice";
import { IUser } from "../../types/ServerEntity";
import Popover from "components/Popover";

function AuthIcon() {
    const [isOpen, toggle, setTrue, setFalse] = useToggle(false);
    const user = useAppSelector(selectUser);
    if (user) {
        return <LogedInAuthIcon user={user} />;
    }
    return (
        <>
            <span className="text-hover-primary hover:bg-slate-100 p-2 rounded-md relative " onClick={toggle}>
                <BiUser />
            </span>
            <Modal isOpen={isOpen} onRequestClose={toggle}>
                <SigninForm />
            </Modal>
        </>
    );
}
function LogedInAuthIcon({ user }: { user: IUser }) {
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [open, toggle, setTrue, setFalse] = useToggle(false);
    return (
        <>
            <div
                className="flex items-center gap-x-2 mx-1 px-1 py-1 rounded-md relative hover:bg-gray-100 cursor-pointer"
                onClick={toggle}
                ref={anchorRef}
            >
                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                    <img src={user.avatar} alt="avatar" className="object-cover h-full w-auto" />
                </div>
                <div className="font-semibold text-base my-2 text-black">{user.fullName}</div>
            </div>
            <Popover open={open} onClose={setFalse} anchorEl={anchorRef.current}>
                <div className="flex justify-between rounded-t-md items-center bg-primary p-2 py-4 w-80">
                    <div className="text-white font-bold text-lg ">{user.fullName}</div>
                </div>
            </Popover>
        </>
    );
}

export default AuthIcon;
