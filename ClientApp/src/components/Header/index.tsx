import React from "react";
// BiSearch
import { BiSearch, BiUser } from "react-icons/bi";
//IoNotificationsOutline
import { IoNotificationsOutline } from "react-icons/io5";
//AiOutlineShoppingCart
import { AiOutlineShoppingCart } from "react-icons/ai";
interface HeaderProps {
    title: string;
}

export default function Header({ title }: HeaderProps) {
    return (
        <header className="w-full flex justify-between items-center py-6 px-3 border-b pl-7 ">
            <div className="flex flex-col">
                <div className="font-semibold text-lg leading-7">{title}</div>
                <div className="text-sm leading-6 text-[#777D74]">
                    <span className="text-primary">Home</span> <span>{`>`}</span>
                    <span className="text-hover-primary"> {title}</span>
                </div>
            </div>
            <div>
                <div className="w-96 flex bg-white text-[#8E938B]  rounded-md shadow-md items-center py-2 px-1">
                    <span className="cursor-pointer grow-0">
                        <BiSearch />
                    </span>
                    <input type="text" name="" id="" className="outline-none w-full bg-transparent grow " />
                </div>
            </div>
            <div className="text-2xl font-semibold leading-9 flex text-[#8E938B] gap-x-6">
                <span className="text-hover-primary">
                    <IoNotificationsOutline />
                </span>
                <span className="text-hover-primary">
                    <AiOutlineShoppingCart />
                </span>
                <span className="text-hover-primary">
                    <BiUser />
                </span>
            </div>
        </header>
    );
}
