import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
    CartItem,
    selectCartItems,
    changeAllCartItemCheck,
    clearCartAsync,
    changeCartItemCheck,
    setQuantityAsync,
    removeBookAsync,
} from "redux/cartSplice";
import { useNavigate, Link } from "react-router-dom";
import CheckBox from "components/Form/CheckBox";
import { toMoneyStringFormat } from "utils/helper";
import SelectQuantity from "components/SelectQuantity";
import { BsFillTrashFill } from "react-icons/bs";
interface IProps {}

export default function CartView({}: IProps) {
    // const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const isCheckAll = cartItems.every((item) => item.isCheck);
    const handleCheckAll = () => {
        dispatch(changeAllCartItemCheck(!isCheckAll));
    };
    const handleCheckItem = (id: string) => {
        const item = cartItems.find((item) => item.bookId + "" === id);
        if (item) {
            dispatch(
                changeCartItemCheck({
                    bookId: item.bookId,
                    isCheck: !item.isCheck,
                })
            );
        }
    };
    const handleRemoveItem = (id: string) => {
        dispatch(removeBookAsync(Number(id)));
    };
    const handleChangeQuantity = (id: string, quantity: number): string | void => {
        dispatch(
            setQuantityAsync({
                bookId: Number(id),
                quantity: quantity,
            })
        );
    };
    return (
        <div className="bg-white rounded-md shadow-lg mt-3 w-8/12">
            <div className="flex justify-between font-semibold text-xl py-5 px-4 border-b mb-2 items-center">
                <h1>Giỏ hàng ({cartItems.length} sản phẩm)</h1>
            </div>
            <div className="flex flex-col gap-2 px-4">
                <div className="flex justify-between items-center border-b py-2 font-semibold text-lg">
                    <div>
                        <CheckBox
                            label=""
                            sx={{
                                color: "#02D871",
                                "&.Mui-checked": {
                                    color: "#02D871",
                                },
                                "&:hover": {
                                    backgroundColor: "transparent",
                                },
                            }}
                            checked={isCheckAll}
                            onChange={handleCheckAll}
                        />
                    </div>
                    <div className="grow ">Chọn tất cả ({cartItems.length} sản phẩm)</div>
                    <div className="basis-2/12 text-center">Số lượng</div>
                    <div className="basis-2/12 text-center">Thành tiền</div>
                    <div className="basis-1/12"></div>
                </div>
                {cartItems.map((item) => (
                    <ItemView
                        key={item.bookId}
                        item={item}
                        onCheck={handleCheckItem}
                        onRemove={handleRemoveItem}
                        onQuantityChange={handleChangeQuantity}
                    />
                ))}
            </div>
        </div>
    );
}

interface IItemViewProps {
    onCheck: (id: string) => void;
    onRemove: (id: string) => void;
    onQuantityChange: (id: string, quantity: number) => string | void;
    item: CartItem;
}
function ItemView({ onCheck, onRemove, onQuantityChange, item }: IItemViewProps) {
    const [error, setError] = React.useState<string | null>(null);
    const handleQuantityChange = (newQuantity: number) => {
        const error = onQuantityChange(item.bookId + "", newQuantity);
        if (error) {
            setError(error);
        }
    };
    const handleCheck = () => {
        onCheck(item.bookId + "");
    };
    const handleRemove = () => {
        onRemove(item.bookId + "");
    };
    return (
        <div className="flex justify-between items-center border-b py-2 mb-2">
            <div>
                <CheckBox
                    label=""
                    sx={{
                        color: "#02D871",
                        "&.Mui-checked": {
                            color: "#02D871",
                        },
                        "&:hover": {
                            backgroundColor: "transparent",
                        },
                    }}
                    checked={item.isCheck || false}
                    onChange={handleCheck}
                />
            </div>
            <Link className="grow flex" to={`/book/${item.book.alias}`}>
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
                        <div className="text text-gray-500 line-through">{toMoneyStringFormat(item.book.price)}đ</div>
                    )}
                    <div className="text text-gray-500">
                        {toMoneyStringFormat(item.book.price - (item.book.price * item.book.discount) / 100)}đ
                    </div>
                    {error && <div className=" text-red-500">{error}</div>}
                </div>
            </Link>
            <div className="basis-2/12 flex justify-center">
                <SelectQuantity
                    handleQuantityChange={handleQuantityChange}
                    widthClass="w-10"
                    innitialQuantity={item.quantity}
                />
            </div>
            <div className="basis-2/12 text-red-500 text-2xl font-bold flex justify-center">
                {toMoneyStringFormat(item.quantity * (item.book.price - (item.book.price * item.book.discount) / 100))}đ
            </div>
            <div className="basis-1/12 flex justify-end pr-2">
                <div
                    className=" cursor-pointer hover:bg-slate-100 flex items-center p-2 rounded-full"
                    onClick={handleRemove}
                >
                    <BsFillTrashFill className="text-red-500 font-bold text-xl" />
                </div>
            </div>
        </div>
    );
}
