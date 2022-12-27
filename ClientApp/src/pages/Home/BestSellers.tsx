import React from "react";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import { IBookPreview } from "../../types/ServerEntity";
import axios from "axios";
import BookPreview from "../../components/BookPreview";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper";
import "swiper/css/navigation";
export default function BestSellers({ setIsLoaded }: { setIsLoaded: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [books, setBooks] = React.useState<IBookPreview[]>([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        axios.get("/api/Book/GetAll?page=1&limit=12").then((res) => {
            setBooks(res.data);
            setLoading(false);
            setIsLoaded(true);
        });
    }, []);
    const swiperRef = React.useRef<SwiperRef>(null);
    const handleMouseEnter = () => {
        swiperRef.current?.swiper.autoplay.stop();
    };
    const handleMouseLeave = () => {
        swiperRef.current?.swiper.autoplay.start();
    };
    return (
        <div className="w-full bg-white rounded-md shadow-lg mt-3">
            <div className="flex justify-between py-5 px-4 border-b items-center">
                <h2 className="font-semibold text-2xl">Bán chạy nhất</h2>
                <Button>Xem thêm</Button>
            </div>
            <div className={loading ? `min-h-[300px] grid place-items-center` : ` flex justify-between pb-2 px-4`}>
                {loading ? (
                    <Loading />
                ) : (
                    <Swiper
                        ref={swiperRef}
                        spaceBetween={10}
                        slidesPerView={6}
                        // onSlideChange={() => console.log("slide change")}
                        // onSwiper={(swiper) => console.log(swiper)}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        loop={true}
                    >
                        {books.map((book) => (
                            <SwiperSlide key={book.id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <BookPreview book={book} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    );
}
//books.map((book) => <BookPreview key={book.id} book={book} />)  navigation={{
//     nextEl: '.next',
// }}
