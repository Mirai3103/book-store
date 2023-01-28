import Button from "components/Button";
import React from "react";
import { checkOutAsync, selectCartItems } from "redux/cartSplice";
import { useAppSelector } from "redux/hooks";
import Bill from "./Bill";
import ChooseAddress from "./ChooseAddress";
import { toMoneyStringFormat } from "../../utils/helper";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";

interface IProps {}

export default function CheckoutPage({}: IProps) {
    const cartItems = useAppSelector(selectCartItems);

    const dispath = useAppDispatch();
    const inBillItems = cartItems.filter((item) => item.isCheck);
    const navigate = useNavigate();
    React.useEffect(() => {
        if (inBillItems.length === 0) {
            navigate("/cart");
        }
    }, [inBillItems]);
    const total = inBillItems.reduce(
        (acc, item) => acc + item.quantity * (item.book.price - (item.book.price * Number(item.book.discount)) / 100),
        0
    );
    const handleCheckout = () => {
        dispath(checkOutAsync());
        navigate("/", { state: { message: "Đặt hàng thành công", type: "success" } });
    };
    return (
        <div className="w-full px-5 h-full flex flex-col gap-y-3 relative">
            <ChooseAddress />
            <Bill />
            <div className="h-32"></div>
            <div
                className="fixed flex flex-col bg-white bottom-0 left-0 w-full px-24 gap-y-2 py-4"
                style={{
                    boxShadow: "0 -5px 5px -5px #333",
                }}
            >
                <div className="flex justify-end items-center  ">
                    <div>Thành tiền:</div>
                    <div className="min-w-[150px] text-end">{toMoneyStringFormat(total)}đ</div>
                </div>
                <div className="flex justify-end items-center border-b py-1 font-semibold text-lg">
                    <div>Tổng tiền phải trả:</div>
                    <div className="min-w-[150px] text-end">{toMoneyStringFormat(total)}đ</div>
                </div>
                <div className="flex justify-end items-center mt-2  font-semibold text-lg">
                    <Button onClick={handleCheckout}>Xác nhận thanh toán</Button>
                </div>
            </div>
        </div>
    );
}
