import * as React from "react";
import { IBook } from "../../types/ServerEntity";
import { Rating } from "@mui/material";
import { toMoneyStringFormat } from "../../utils/helper";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Button, { ButtonOutline } from "../../components/Button";
import { BsCartPlusFill } from "react-icons/bs";

interface IBookShortDetailProps {
    book: IBook;
    className?: string;
}

export default function BookShortDetail({ book, className }: IBookShortDetailProps) {
    const finalPrice = book.price - book.price * (book.discount / 100);
    const [quantity, setQuantity] = React.useState(1);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numberRegex = /^[0-9]+$/;
        if (!numberRegex.test(value)) {
            return;
        }
        if (value == "") {
            setQuantity(1);
            return;
        }
        const number = parseInt(value);
        if (number < 1) {
            setQuantity(1);
            return;
        }
        setQuantity(number);
    };
    const hanldeIncreaseQuantity = () => {
        setQuantity((oldQuantity) => oldQuantity + 1);
    };
    const handleDecreaseQuantity = () => {
        if (quantity == 1) return;
        setQuantity((oldQuantity) => oldQuantity - 1);
    };
    return (
        <div className="flex flex-col gap-y-3">
            <h1 className="text-2xl font-semibold truncate-two-lines my-2">{book.name}</h1>
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
                <div className="flex">
                    <span
                        className="border border-r-0 cursor-pointer px-2 flex justify-center items-center"
                        onClick={handleDecreaseQuantity}
                    >
                        <AiOutlineMinus />
                    </span>
                    <input
                        type="text"
                        className="w-24 border  outline-none px-2 py-1 text-end"
                        value={quantity}
                        onChange={handleInputChange}
                    />
                    <span
                        className="border border-l-0 px-2 cursor-pointer flex justify-center items-center"
                        onClick={hanldeIncreaseQuantity}
                    >
                        <AiOutlinePlus />
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-x-7 text-lg font-semibold my-2    ">
                <span className="font-semibold text-lg text-[#4c4c4c]">Thành tiền:</span>
                <span className="text-2xl text-primary">{toMoneyStringFormat(finalPrice * quantity) + "đ"}</span>
            </div>
            <div className="flex gap-x-3">
                <ButtonOutline className=" gap-x-3 px-4">
                    <BsCartPlusFill className="font-bold text-lg" />
                    <span className="font-semibold">Thêm vào giỏ hàng</span>
                </ButtonOutline>
                <Button className="w-48">
                    <span className="font-semibold">Mua ngay</span>
                </Button>
            </div>
        </div>
    );
}
