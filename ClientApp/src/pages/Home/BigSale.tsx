import React from "react";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import { IBookPreview } from "../../types/ServerEntity";
import axios, { AxiosResponse } from "axios";
import BookPreview from "../../components/BookPreview";
import { ButtonOutline } from "../../components/Button";
import { Link } from "react-router-dom";
import { TrendingCategory } from "pages/TrendingPage";
export default function BigSale() {
    const [books, setBooks] = React.useState<IBookPreview[]>([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        axios.get("/api/Book/GetAll?page=1&limit=100").then((res: AxiosResponse<IBookPreview[], IBookPreview[]>) => {
            const bigSaleBooks = res.data.sort((a, b) => b.discount - a.discount).slice(0, 12);
            setBooks(bigSaleBooks);
            setLoading(false);
        });
    }, []);

    return (
        <div className="w-full bg-white rounded-md shadow-lg mt-3">
            <div className="flex justify-between py-5 px-4 border-b items-center">
                <h2 className="font-semibold text-2xl">Giảm Sốc</h2>
            </div>
            <div
                className={
                    loading
                        ? `min-h-[300px] grid place-items-center`
                        : `flex flex-wrap gap-1 gap-y-2 justify-between pb-2 px-4`
                }
            >
                {loading ? (
                    <Loading />
                ) : (
                    books.map((book) => <BookPreview key={book.id} className="w-[16%]" book={book} />)
                )}
            </div>
            <div className="flex w-full justify-center py-4">
                <Link to={`/trending?category=${TrendingCategory[TrendingCategory.TopDiscount]}`}>
                    <ButtonOutline className="w-40 font-bold text-xl">Xem thêm</ButtonOutline>
                </Link>
            </div>
        </div>
    );
}
//books.map((book) => <BookPreview key={book.id} book={book} />)  navigation={{
//     nextEl: '.next',
// }}
