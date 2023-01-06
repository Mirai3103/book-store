import * as React from "react";
import { useParams } from "react-router-dom";
import { IBook } from "../../types/ServerEntity";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BookImagePreview from "./BookImagePreview";
import BookShortDetail from "./BookShortDetail";
import BookFullDetail from "./BookFullDetail";
import LoadingScreen from "../../components/LoadingScreen";
import RelatedBook from "./RelatedBook";
import { useAppDispatch } from "../../redux/hooks";
import { BreadCrumb, changeBreadCrumbs, changeTitle } from "../../redux/pageStateSplice";

function createBreadcrumb(book: IBook | null) {
    if (!book) {
        return {
            breadcrumb: [
                { name: "Home", path: "/" },
                { name: "BookDetail", path: "/" },
            ],
            title: "Thông tin sách",
        };
    }
    const breadcrumb: BreadCrumb[] = [
        {
            name: "Home",
            path: "/",
        },
    ];
    if (book.category.parent) {
        breadcrumb.push({
            name: book.category.parent.name,
            path: "/category/" + book.category.parent.id,
        });
    }
    breadcrumb.push({
        name: book.category.name,
        path: "/category/" + book.category.id,
    });
    breadcrumb.push({
        name: book.title.length > 30 ? book.title.substring(0, 30) + "..." : book.title,
        path: "/book/" + book.alias,
        fullName: book.title,
    });
    const title = book.title;
    return { breadcrumb, title };
}

export default function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = React.useState<IBook | null>(null);
    const navigate = useNavigate();
    const pageState = React.useMemo(() => createBreadcrumb(book), [book]);
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(changeBreadCrumbs(pageState.breadcrumb));
        dispatch(changeTitle(pageState.title));
    }, [pageState]);
    React.useEffect(() => {
        axios
            .get("/api/Book/GetDetail?alias=" + id)
            .then((res) => {
                if (res.data == null) {
                    navigate("/404");
                }

                setBook(res.data);
            })
            .catch((err) => {
                navigate("/404");
            });
        return () => {
            setBook(null);
        };
    }, [id]);
    if (book == null) {
        return (
            <div className="absolute w-screen bg-white top-0 left-0 z-20 h-screen">
                <LoadingScreen />
            </div>
        );
    }
    return (
        <div className="h-full ">
            <div className="flex bg-white shadow-lg p-8 px-20 justify-evenly m-9 rounded-lg">
                <BookImagePreview bookId={book!.id} imageCover={book!.imageCover} images={book.images} />
                <BookShortDetail book={book} />
            </div>
            <RelatedBook bookId={book.id} />

            <BookFullDetail book={book} />
        </div>
    );
}
