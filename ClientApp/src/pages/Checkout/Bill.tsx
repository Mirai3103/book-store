import React from "react";
import {
    CartItem,
    selectCartItems,
    changeAllCartItemCheck,
    clearCartAsync,
    changeCartItemCheck,
    setQuantityAsync,
    removeBookAsync,
} from "redux/cartSplice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { toMoneyStringFormat } from "utils/helper";
interface IProps {}

export default function Bill({}: IProps) {
    const cartItems = useAppSelector(selectCartItems);
    const inBillItems = cartItems.filter((item) => item.isCheck);
    const total = inBillItems.reduce(
        (acc, item) => acc + item.quantity * (item.book.price - (item.book.price * Number(item.book.discount)) / 100),
        0
    );
    return (
        <div className="w-full bg-white rounded-md shadow-lg mt-3 mx-3 px-3 ">
            <div className="text-2xl p-4 border-b w-full font-bold mb-2 text-primary">Đơn hàng</div>
            <div className="flex justify-between items-center border-b py-2 font-semibold text-lg">
                <div className="grow "> sản phẩm</div>
                <div className="basis-2/12 text-center">Số lượng</div>
                <div className="basis-2/12 text-center">Thành tiền</div>
            </div>
            {inBillItems.map((item) => (
                <div className="flex justify-between items-center border-b py-2 mb-2" key={item.book.id}>
                    <div className="grow flex">
                        <div className="shrink-0 flex items-center">
                            <img
                                src={item.book.imageCover}
                                alt={item.book.name}
                                className="object-fill h-36 w-full @xl:h-28 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col gap-y-2 ml-4">
                            <div className="text-lg font-semibold">{item.book.name}</div>
                            {item.book.discount > 0 && (
                                <div className="text text-gray-500 line-through">
                                    {toMoneyStringFormat(item.book.price)}đ
                                </div>
                            )}
                            <div className="text text-gray-500">
                                {toMoneyStringFormat(item.book.price - (item.book.price * item.book.discount) / 100)}đ
                            </div>
                        </div>
                    </div>
                    <div className="basis-2/12 flex justify-center">{item.quantity}</div>
                    <div className="basis-2/12 text-red-500 text-2xl font-bold flex justify-center">
                        {toMoneyStringFormat(
                            item.quantity * (item.book.price - (item.book.price * item.book.discount) / 100)
                        )}
                        đ
                    </div>
                </div>
            ))}
        </div>
    );
}
