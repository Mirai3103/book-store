import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAppSelector } from "redux/hooks";
import { selectCartItems } from "redux/cartSplice";
import Popover from "components/Popover";
function CartIcon() {
    const appState = useAppSelector(selectCartItems);
    const anchorRef = React.useRef<HTMLSpanElement>(null);
    return (
        <span className="text-hover-primary" ref={anchorRef}>
            <AiOutlineShoppingCart />
            <Popover anchorEl={anchorRef.current}>Hello</Popover>
        </span>
    );
}

export default CartIcon;
