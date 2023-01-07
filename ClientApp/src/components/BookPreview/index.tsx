import React from "react";
import { IBookPreview } from "../../types/ServerEntity";
import Rating from "@mui/material/Rating";
import { toMoneyStringFormat } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
interface IBookPreviewProps {
    book: IBookPreview;
    className?: string;
}

export default function BookPreview({ book, className }: IBookPreviewProps) {
    const finalPrice = book.price - (book.price * book.discount) / 100;
    const navigate = useNavigate();
    const handleBookClick = () => {
        navigate(`/book/${book.alias}`);
    };
    return (
        <div
            className={
                "flex flex-col bg-white grow-0 py-3 group shadow-md my-1 hover:shadow-xl cursor-pointer px-2 " +
                (className ? className : "w-56")
            }
            onClick={handleBookClick}
        >
            <div className="py-1 h-44 flex justify-center items-center relative mb-3">
                <img
                    src={book.imageCover}
                    alt={book.name}
                    className="object-cover h-full w-auto group-hover:scale-110 ease-in-out duration-500 transform"
                    loading="lazy"
                />
                {book.discount > 0 && (
                    <div className="absolute font-bold right-3 top-3 grid place-content-center text-white w-11 h-11 bg-primary rounded-full">
                        -{book.discount}%
                    </div>
                )}
            </div>
            <abbr title={book.title} className=" min-h-[46px] font-semibold text-base truncate-two-lines">
                {book.title}
            </abbr>
            <div className="font-semibold text-base leading-4 text-red-700 py-2 relative">
                <span>{toMoneyStringFormat(finalPrice)} đ</span>
                {book.episode && (
                    <span className="absolute right-0 top-0 bg-gray-500 text-white text-xs px-2 py-1 rounded-md">
                        {book.episode}
                    </span>
                )}
            </div>
            {finalPrice !== book.price ? (
                <div className="text-sm text-[#777D74] font-semibold line-through">
                    <span> {toMoneyStringFormat(book.price)} đ </span>
                </div>
            ) : (
                <div className="text-sm text-[#777D74] font-semibold">{book.author}</div>
            )}
            <div>
                <Rating name="half-rating-read" size="small" defaultValue={3.6} precision={0.1} readOnly />
            </div>
        </div>
    );
}
