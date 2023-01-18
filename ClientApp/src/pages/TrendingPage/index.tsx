import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { instance } from "utils/axiosInstance";
import { IBookPreview } from "../../types/ServerEntity";
import LoadingScreen from "../../components/LoadingScreen";
import BookPreview from "components/BookPreview";
import SeriesPreview from "../../components/SeriesPreview";
import Loading from "components/Loading";

const categories = [
    {
        value: 0,
        label: "Bán chạy",
    },
    {
        value: 1,
        label: "Mới nhất",
    },
    {
        value: 2,
        label: "Giảm giá sốc",
    },
    {
        value: 3,
        label: "Bộ sách nổi bật",
    },
    { value: 4, label: "Đánh giá cao" },
    {
        value: 5,
        label: "Được yêu thích",
    },
    {
        value: 6,
        label: "Được đề xuất",
    },
    {
        value: 7,
        label: "Flash Sale",
    },
];

enum TrendingCategory {
    TopSelling = 0,
    TopNew = 1,
    TopDiscount = 2,
    TopSeries = 3,
    TopRate = 4,
    TopFavourite = 5,
    TopRecommend = 6,
    FlashSale = 7,
}

function TrendingPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [books, setBooks] = useState<IBookPreview[] | null>(null);
    const [currentTab, setCurrentTab] = useState<TrendingCategory>(TrendingCategory.TopSelling);
    const [isLoadingNewTab, setIsLoadingNewTab] = useState(false);
    useEffect(() => {
        const category = searchParams.get("category");
        if (category) {
            if (TrendingCategory[category as any]) {
                setCurrentTab((TrendingCategory as any)[category]);
            } else {
                setCurrentTab(TrendingCategory.TopSelling);
            }
        } else {
            setCurrentTab(TrendingCategory.TopSelling);
        }
    }, [searchParams.get("category")]);
    useEffect(() => {
        instance.get(`/api/Book/GetTrendingBook?category=${currentTab}&limit=28&page=1`).then((res) => {
            setBooks(res.data);
            setIsLoadingNewTab(false);
        });
    }, [currentTab]);
    if (!books) {
        return <LoadingScreen />;
    }

    const handleChangeTab = (tab: TrendingCategory) => {
        setSearchParams({ category: TrendingCategory[tab] });
        setIsLoadingNewTab(true);
    };
    const RenderPrewviewComponent = (books[0] as any).isSeries ? SeriesPreview : BookPreview;

    return (
        <div className="w-full h-full ">
            <div className=" bg-white rounded-md shadow-lg m-3">
                <div className="bg-primary rounded-t-md px-3 font-semibold text-2xl text-white py-3">
                    <h1>Xu hướng mua sắm</h1>
                </div>
                <div className="p-3">
                    <div className="w-full overflow-x-scroll scrollbar-hide flex gap-x-4">
                        {categories.map((category) => (
                            <div
                                key={category.value}
                                className={`${
                                    currentTab === category.value
                                        ? "bg-primary text-white"
                                        : "bg-gray-100 text-gray-600"
                                } px-3 py-2 rounded-md cursor-pointer hover:bg-gray-200 `}
                                onClick={handleChangeTab.bind(null, category.value)}
                            >
                                {category.label}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-1 gap-y-2 justify-between pb-2 px-4 min-h-screen">
                        {isLoadingNewTab ? (
                            <div className="w-full h-full mt-16 flex justify-center items-center">
                                <Loading />
                            </div>
                        ) : (
                            books.map((book) => (
                                <RenderPrewviewComponent
                                    key={book.id}
                                    book={book}
                                    series={book as any}
                                    type={"short"}
                                    className={(book as any).isSeries ? "w-[450px]" : ""}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrendingPage;
