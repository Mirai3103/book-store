import React from "react";
import Button from "../../components/Button";
import { RiCoupon2Fill } from "react-icons/ri";
import { useAppSelector } from "../../redux/hooks";
import { selectCartItems } from "redux/cartSplice";
import { toMoneyStringFormat } from "../../utils/helper";
import { Link } from "react-router-dom";
interface IProps {}

export default function BillView({}: IProps) {
    const cartItems = useAppSelector(selectCartItems);
    const checkedItems = cartItems.filter((item) => item.isCheck);
    const total = checkedItems.reduce(
        (acc, item) => acc + item.quantity * (item.book.price - (item.book.discount * item.book.price) / 100),
        0
    );
    return (
        <div className="flex flex-col mt-3 w-3/12 bg-[#FBFCFF] gap-y-6 text-lg">
            <div className="flex flex-col w-full border-b pb-4 bg-white rounded-md shadow-sm  p-2">
                <h2 className="font-semibold text-xl flex items-center gap-x-3 mb-3 text-primary">
                    <RiCoupon2Fill className=" text-2xl" />
                    <span>Khuyến mãi</span>
                </h2>
                <div className="flex-col flex gap-y-2 mt-2 w-full">
                    <div className="flex items-center">
                        <span className="text-gray-500">Mã giảm giá:</span>
                        <input type="text" className="border outline-none rounded-md px-2 py-1 ml-2 grow" />
                    </div>
                    <div className="flex justify-end mr-2">
                        <Button className=" text-sm p-1 ">Áp dụng</Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full border-b pb-4 pr-3 bg-white rounded-md shadow-lg p-2 gap-y-1">
                <h2 className="font-semibold text-xl flex items-center gap-x-3 text-primary mb-3">Chi tiết đơn hàng</h2>
                <div className="ml-4 flex justify-between">
                    <div>Thành tiền: </div>
                    <div>{toMoneyStringFormat(total)}đ </div>
                </div>
                <div className="ml-4 flex justify-between">
                    <div>Giảm giá: </div>
                    <div>0đ </div>
                </div>
                <div className="ml-4 flex justify-between border-t pt-1">
                    <div>Tổng tiền: </div>
                    <div className="font-bold text-red-500">{toMoneyStringFormat(total)}đ</div>
                </div>
                <div className="px-4">
                    <Link to="/checkout">
                        <Button className="w-full mt-2">Đặt hàng</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
