import * as React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CartItem } from "redux/cartSplice";

interface Props {
    item: CartItem;
}

function CartItemShortPreview({ item }: Props) {
    return (
        <div className="flex items-start group w-full gap-x-1 px-3 cursor-pointer">
            <div className="flex justify-center items-end w-20 grow-0 shrink-0">
                <img
                    src={item.book.imageCover}
                    alt="imgae-preview"
                    className="object-cover h-auto w-full group-hover:scale-105 ease-in-out duration-500 transform"
                />
            </div>
            <div className="grow max-w-full flex flex-col gap-y-1">
                <div className="truncate-two-lines font-semibold text-sm">{item.book.title}</div>
                <div className="text-xs">
                    <span>Số lượng: </span> {item.quantity}
                </div>
            </div>
            <div className="-mt-3 grow-0 -mr-3 shrink-0 self-center">
                <div className="hover:bg-gray-200 text-lg rounded-full p-1 cursor-pointer">
                    <AiOutlineClose className="text-red-500" />
                </div>
            </div>
        </div>
    );
}

export default CartItemShortPreview;
