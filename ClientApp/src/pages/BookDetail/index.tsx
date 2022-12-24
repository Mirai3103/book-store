import * as React from "react";
import { useParams } from "react-router-dom";
import { IBook } from "../../types/ServerEntity";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

    return (
        <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-4xl font-bold">Book detail page {id}</h1>
        </div>
    );
}
