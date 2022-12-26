import * as React from "react";
import { IBook } from "../../types/ServerEntity";

interface IBookShortDetailProps {
    book: IBook;
    className?: string;
}

export default function BookShortDetail({ book, className }: IBookShortDetailProps) {
    return (
        <div className="flex flex-col gap-y-3">
            <h1 className="text-2xl font-semibold truncate-two-lines">{book.name}</h1>
            <div className="flex flex-wrap">
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
        </div>
    );
}
