import * as React from "react";
import { useParams } from "react-router-dom";
import { IBook } from "../../types/ServerEntity";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BookImagePreview from "./BookImagePreview";
import Loading from "../../components/Loading";
import BookShortDetail from "./BookShortDetail";

export default function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = React.useState<IBook | null>(null);
    const navigate = useNavigate();
    React.useEffect(() => {
        axios
            .get("/api/Book/GetDetail?alias=" + id)
            .then((res) => {
                console.log(res.data);
                if (res.data == null) {
                    navigate("/404");
                }
                setBook(res.data);
            })
            .catch((err) => {
                navigate("/404");
            });
    }, [id]);
    if (book == null) return <Loading />;
    return (
        <div className="h-full bg-white p-8 m-9 shadow-xl rounded-lg">
            <div className="flex">
                <BookImagePreview bookId={book!.id} imageCover={book!.imageCover} images={book.images} />
                <BookShortDetail book={book} />
            </div>
        </div>
    );
}
