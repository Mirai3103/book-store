import React from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { BiSearch, BiUser } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { selectBreadCrumbs, selectTitle } from "../../redux/pageStateSplice";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "../Logo";

export default function Header() {
    const breadCrumbs = useAppSelector(selectBreadCrumbs);
    const title = useAppSelector(selectTitle);
    document.title = title;
    return (
        <header className="w-full flex justify-between items-center py-6 px-3 border-b pl-7 ">
            <div className="flex flex-col basis-1/3 justify-start">
                <Logo />
                <div className="text-sm leading-6 text-[#777D74] ml-6">
                    {breadCrumbs.map((crumb, index) => (
                        <abbr title={crumb.fullName ?? crumb.name} key={index}>
                            <Link
                                className={
                                    "cursor-pointer hover:underline " +
                                    (index === breadCrumbs.length - 1 ? "text-primary font-semibold" : "")
                                }
                                to={crumb.path}
                            >
                                {crumb.name}
                            </Link>
                            {index !== breadCrumbs.length - 1 && <MdNavigateNext className="inline-block mx-1" />}
                        </abbr>
                    ))}
                </div>
            </div>
            <div className="basis-1/3 flex justify-center">
                <div className="w-96 flex bg-white text-[#8E938B]  rounded-md shadow-md items-center py-2 px-1">
                    <span className="cursor-pointer grow-0">
                        <BiSearch />
                    </span>
                    <input type="text" name="" id="" className="outline-none w-full bg-transparent grow " />
                </div>
            </div>
            <div className="text-2xl font-semibold leading-9 flex text-[#8E938B] gap-x-6 basis-1/3 justify-end">
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
