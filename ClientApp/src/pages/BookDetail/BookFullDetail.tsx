import * as React from "react";
import { IBook } from "../../types/ServerEntity";
import { Link } from "react-router-dom";
const getInvertKey = {
    provider: "Tên Nhà Cung Cấp",
    publisher: "NXB",
    author: "Tác giả",
    publishYear: "Năm XB",
    weight: "Trọng lượng (gr)",
    size: "Kích Thước Bao Bì",
    numberOfPages: "Số trang",
    bookCoverType: "Hình thức",
    ageGroup: "Độ Tuổi",
    translatorName: "Người Dịch",
    language: "Ngôn Ngữ",
    level: "Cấp Độ/ Lớp",
    grade: "Cấp Học",
    category: "Nhóm Sách",
};

interface IInfo {
    key: string;
    value: string;
    url?: string | undefined;
}

export default function BookFullDetail({ book }: { book: IBook }) {
    const info: IInfo[] = [];

    for (const key in book) {
        const VIKey = (getInvertKey as any)[key] as string | undefined;
        if (VIKey) {
            let value = (book as any)[key];
            let url: string | undefined = undefined;
            switch (key) {
                case "provider":
                    value = book.provider.name;
                    url = "/provider/" + book.provider.id;
                    break;
                case "publisher":
                    value = book.publisher.name;
                    url = "/publisher/" + book.publisher.id;
                    break;
                case "category":
                    value = book.category.name;
                    url = "/category/" + book.category.id;
                    break;
            }

            info.push({
                key: VIKey,
                value: value,
                url: url,
            });
        }
    }

    return (
        <div className=" bg-white shadow-xl rounded-lg m-9 ">
            <div className="p-8 flex flex-col gap-y-2">
                <h2 className="font-bold text-2xl">Thông tin sản phẩm</h2>
                {info.map((item) => (
                    <div key={item.key} className="flex w-full text-base ">
                        <span className="w-1/4 text-gray-600">{item.key + ": "}</span>
                        {item.url ? (
                            <Link to={item.url} className="text-blue-500 hover:text-blue-700 hover:underline">
                                {item.value}
                            </Link>
                        ) : (
                            <span className="grow">{item.value}</span>
                        )}
                    </div>
                ))}
                <div className="italic ">
                    {` Giá sản phẩm trên BookSto.com  đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm,
                    hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận
                    chuyển, phụ phí hàng cồng kềnh,...`}
                </div>
            </div>
            <div className="border-t mx-3 p-5 text-sm leading-6">
                <div>
                    {book.description.split("\n").map((item, index) => (
                        <div className="my-2" key={index}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
