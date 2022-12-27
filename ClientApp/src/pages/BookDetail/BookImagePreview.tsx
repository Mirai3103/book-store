import * as React from "react";
import { IBook, IImage } from "../../types/ServerEntity";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper";
import "swiper/css/navigation";
import { FcNext, FcPrevious } from "react-icons/fc";
interface IBookImagePreviewProps {
    images: IImage[];
    className?: string;
    imageCover: string;
    bookId: number;
}

export default function BookImagePreview({ images, className, imageCover }: IBookImagePreviewProps) {
    return (
        <div className={"flex h-[400px] gap-x-6 " + className}>
            <div className="flex flex-col h-[400px] w-16 overflow-hidden gap-y-3">
                {images.map((image) => (
                    <div key={image.id} className="py-1 w-full flex justify-center items-center relative border">
                        <img src={image.url} alt={`book.name`} className="object-cover w-full h-auto " />
                    </div>
                ))}
            </div>
            <div className="w-96 h-96 flex justify-center items-center ">
                <img className="object-cover max-h-full max-w-full " src={imageCover} alt={`preview`} />
            </div>
        </div>
    );
}
