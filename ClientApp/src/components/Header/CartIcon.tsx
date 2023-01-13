import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAppSelector } from "redux/hooks";
import { selectCartItems } from "redux/cartSplice";
import Popover from "components/Popover";
import useToggle from "../../hooks/useToggle";
import CartItemShortPreview from "components/Cart/CartItemShortPreview";

function CartIcon() {
    const cartItems = useAppSelector(selectCartItems);
    const anchorRef = React.useRef<HTMLSpanElement>(null);
    const [open, toggle, setTrue, setFalse] = useToggle(false);

    return (
        <span
            className="text-hover-primary hover:bg-slate-100 p-2 rounded-md relative"
            ref={anchorRef}
            onClick={setTrue}
        >
            {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center translate-x-2/3 -translate-y-2/3 border-dashed shadow-2xl">
                    {cartItems.length}
                </span>
            )}
            <AiOutlineShoppingCart />
            <Popover open={open} onClose={setFalse} anchorEl={anchorRef.current}>
                <div className="flex justify-between rounded-t-md items-center bg-primary p-2 py-4 w-full">
                    <div className="text-white font-bold text-2xl ">Giỏ hàng</div>
                    <div className="text-black font-bold bg-white w-8 h-8 text-center rounded-md p-1 cursor-pointer">
                        {cartItems.length}
                    </div>
                </div>
                {cartItems.length > 0 ? (
                    <div className="flex flex-col w-96 gap-y-2 py-4 max-h-[80vh] overflow-y-auto">
                        {cartItems.map((item) => (
                            <CartItemShortPreview key={item.bookId} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center w-96 py-2">Giỏ hàng trống</div>
                )}
            </Popover>
        </span>
    );
}

export default CartIcon;
