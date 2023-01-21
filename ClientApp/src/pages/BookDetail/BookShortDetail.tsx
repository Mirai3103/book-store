import * as React from "react";
import { IBook } from "../../types/ServerEntity";
import { Rating } from "@mui/material";
import { toMoneyStringFormat } from "../../utils/helper";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Button, { ButtonOutline } from "../../components/Button";
import { BsCartPlusFill } from "react-icons/bs";
import { useAppDispatch } from "redux/hooks";
import { addBookAsync, changeAllCartItemCheck, changeCartItemCheck, quickBuyAsync } from "redux/cartSplice";
import { createToast } from "components/Toast";
import SelectQuantity from "../../components/SelectQuantity";
import { useNavigate } from "react-router-dom";

interface IBookShortDetailProps {
    book: IBook;
    className?: string;
}

export default function BookShortDetail({ book, className }: IBookShortDetailProps) {
    const finalPrice = book.price - book.price * (book.discount / 100);
    const [quantity, setQuantity] = React.useState(1);
    const navigate = useNavigate();
    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
    };
    const dispatch = useAppDispatch();

    const handleAddToCart = () => {
        dispatch(addBookAsync({ bookId: book.id, book: book, quantity: quantity }));
        createToast("Thành công!", "Thêm vào giỏ hàng thành công", "success", 3000);
    };
    const handleQuickBuy = () => {
        dispatch(quickBuyAsync({ bookId: book.id, book: book, quantity: quantity }));
        navigate("/cart");
    };
    return (
        <div className="flex flex-col gap-y-3">
            <h1 className="text-2xl font-semibold truncate-two-lines my-2">{book.title}</h1>
            <div className="flex flex-wrap gap-y-1">
                <div className="w-1/2">
                    Nhà cung cấp:{" "}
                    <span className="text-blue-500 cursor-pointer hover:underline">{book.provider.name}</span>
                </div>
                <div className="w-1/2">Tác giả: {book.author}</div>
                <div className="w-1/2">
                    Nhà xuất bản:
                    <span className="text-blue-500 cursor-pointer hover:underline">
                        {" " + book.publisher.name}
                    </span>{" "}
                </div>
                <div className="w-1/2">Hình thức: {book.bookCoverType}</div>
            </div>
            <Rating name="half-rating-read" size="small" defaultValue={3.6} precision={0.1} readOnly />
            <div className="flex gap-x-6 font-bold items-center my-2">
                <span className=" text-3xl text-red-700">{toMoneyStringFormat(finalPrice) + "đ"}</span>
                {book.discount !== 0 && (
                    <>
                        <span className="text-lg text-[#777D74]  line-through">
                            {" " + toMoneyStringFormat(book.price) + "đ"}
                        </span>
                        <span className="bg-primary  px-2 rounded-lg text-white">{book.discount + "%"}</span>
                    </>
                )}
            </div>
            <div className="flex items-center gap-x-7 text-lg font-semibold">
                <span className="font-semibold text-lg text-[#4c4c4c]">Số lượng: </span>
                <SelectQuantity handleQuantityChange={handleQuantityChange} />
            </div>
            <div className="flex items-center gap-x-7 text-lg font-semibold my-2    ">
                <span className="font-semibold text-lg text-[#4c4c4c]">Thành tiền:</span>
                <span className="text-2xl text-primary">{toMoneyStringFormat(finalPrice * quantity) + "đ"}</span>
            </div>
            <div className="flex gap-x-3">
                <ButtonOutline className=" gap-x-3 px-4" onClick={handleAddToCart}>
                    <BsCartPlusFill className="font-bold text-lg" />
                    <span className="font-semibold">Thêm vào giỏ hàng</span>
                </ButtonOutline>
                <Button className="w-48" onClick={handleQuickBuy}>
                    <span className="font-semibold">Mua ngay</span>
                </Button>
            </div>
        </div>
    );
}
