import * as React from "react";
import { IBookPreview } from "../../types/ServerEntity";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper";
import "swiper/css/navigation";
import BookPreview from "../../components/BookPreview";
import axios from "axios";

interface IProps {
    bookId: number;
}

function RelatedBook(props: IProps) {
    const [sameAuthor, setSameAuthor] = React.useState<IBookPreview[] | null>(null);
    const [sameSeries, setSameSeries] = React.useState<IBookPreview[] | null>(null);
    const [currentTab, setCurrentTab] = React.useState<"author" | "series">("author");

    React.useEffect(() => {
        axios.get("/api/Book/GetBooksSameAuthor?bookId=" + props.bookId).then((res) => {
            if (res.data.length == 0) {
                setCurrentTab("series");
                setSameAuthor(null);
            } else setSameAuthor(res.data);
        });
        axios.get("/api/Book/GetBooksSameSeries?bookId=" + props.bookId).then((res) => {
            if (res.data.length == 0) {
                setCurrentTab("author");
                setSameSeries(null);
            } else setSameSeries(res.data);
        });
    }, [props.bookId]);

    const handleSetTab = (tab: "author" | "series") => {
        if (currentTab !== tab) {
            setCurrentTab(tab);
        }
    };

    if (sameAuthor == null && sameSeries == null) return null;
    return (
        <div className=" bg-white shadow-xl rounded-lg m-9 ">
            <div className="p-8 flex flex-col gap-y-2">
                <h2 className="font-bold text-2xl">Sách liên quan</h2>

                <div className="border-b-2 flex gap-x-3 py-0 box-border">
                    {sameAuthor && (
                        <button
                            type="button"
                            onClick={() => handleSetTab("author")}
                            className={`font-semibold py-2 px-5 -mb-1  ${
                                currentTab === "author" ? "border-b-4 border-blue-500 box-border" : ""
                            }`}
                        >
                            Cùng tác giả
                        </button>
                    )}
                    {sameSeries && (
                        <button
                            type="button"
                            onClick={() => handleSetTab("series")}
                            className={`font-semibold py-2 px-5 -mb-1 ${
                                currentTab === "series" ? "border-b-4 border-blue-500 box-border" : ""
                            } `}
                        >
                            Cùng bộ
                        </button>
                    )}
                </div>
                <div className="flex ">
                    {sameAuthor && currentTab === "author" && (
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={sameAuthor.length > 6 ? 6 : sameAuthor.length}
                            {...(sameAuthor.length > 6
                                ? {
                                      autoplay: {
                                          delay: 3000,
                                          disableOnInteraction: false,
                                      },
                                      modules: [Autoplay],
                                      loop: true,
                                  }
                                : {})}
                        >
                            {sameAuthor.map((book) => (
                                <SwiperSlide key={book.id}>
                                    <BookPreview book={book} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                    {sameSeries && currentTab === "series" && (
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={sameSeries.length > 6 ? 6 : sameSeries.length}
                            {...(sameSeries.length > 6
                                ? {
                                      autoplay: {
                                          delay: 3000,
                                          disableOnInteraction: false,
                                      },
                                      modules: [Autoplay],
                                      loop: true,
                                  }
                                : {})}
                        >
                            {sameSeries.map((book) => (
                                <SwiperSlide key={book.id}>
                                    <BookPreview book={book} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </div>
        </div>
    );
}

export default React.memo(RelatedBook);
