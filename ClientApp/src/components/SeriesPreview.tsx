import * as React from "react";
import { ISeries } from "../types/ServerEntity";
import Button from "./Button";
import { MdOutlineAdd } from "react-icons/md";
import { ButtonOutline } from "./Button";
import { AiOutlineCheck } from "react-icons/ai";
import { selectIsAuthenticated } from "../redux/authSplice";
import { useAppSelector } from "../redux/hooks";
import { createToast } from "./Toast";
import { authInstance } from "../utils/axiosInstance";
export interface SeriesPreviewProps {
    series: ISeries;
    type: "full" | "short";
    className?: string;
}

export default function SeriesPreview(props: SeriesPreviewProps) {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const [isFollowed, setIsFollowed] = React.useState(props.series.isFollowed);
    const handleFollow = () => {
        if (!isAuthenticated) {
            createToast("error", "Bạn cần đăng nhập để theo dõi", "error");
            return;
        }
        authInstance
            .post(`/api/Series/ToggleFollow`, props.series.id)
            .then((res) => {
                setIsFollowed((prev) => !prev);
                createToast("success", "Đã theo dõi!", "success");
            })
            .catch((err) => {
                createToast("error", "Đã có lỗi xảy ra", "error");
            });
    };
    return (
        <div className={"flex bg-white py-3 group shadow-md my-1 hover:shadow-xl px-2 " + props.className}>
            <div className="flex gap-x-3 md:gap-x-1 w-full">
                <div className="shrink-0 flex items-center">
                    <img
                        src={props.series.lastestBook.image}
                        alt={props.series.name}
                        className="object-cover h-44 w-full @xl:h-36"
                    />
                </div>
                <div className={`flex flex-col gap-y-[2px] grow min-w-0 `}>
                    <h5 className="font-semibold text-lg min-h-[50px] truncate-two-lines flex gap-x-2">
                        <span className="text-white text-sm bg-primary px-3 rounded-lg">Bộ</span>
                        <span>{props.series.name}</span>
                    </h5>
                    <div className="text-sm truncate">Tác giả: {props.series.author}</div>
                    <div className="text-sm truncate">Nhà xuất bản: {props.series.publisher.name}</div>
                    <div className="text-sm truncate">Tập mới nhất: {props.series.lastestBook.episode}</div>
                    <div className="text-blue-600 text-sm">{props.series.numberOfFollowers} lượt theo dõi</div>
                    {props.type == "short" && (
                        <div className="w-full flex justify-end">
                            {isFollowed ? (
                                <Button className="w-40 text-base" onClick={handleFollow}>
                                    <div className="flex justify-center items-center content-center">
                                        <AiOutlineCheck className="font-bold text-2xl " />
                                        <span>Bỏ theo dõi</span>
                                    </div>
                                </Button>
                            ) : (
                                <ButtonOutline className="w-40 group " onClick={handleFollow}>
                                    <div className="flex justify-center items-center content-center">
                                        <MdOutlineAdd className="font-bold text-2xl " /> <span>Theo dõi</span>
                                    </div>
                                </ButtonOutline>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {props.type == "full" && (
                <div className="flex flex-col gap-y-2 items-center justify-end">
                    {isFollowed ? (
                        <Button className="w-9 text-base" onClick={handleFollow}>
                            <div className="flex justify-center items-center content-center">
                                <AiOutlineCheck className="font-bold text-2xl " /> <span>Bỏ theo dõi</span>
                            </div>
                        </Button>
                    ) : (
                        <ButtonOutline className="w-9 group " onClick={handleFollow}>
                            <div className="flex justify-center items-center content-center ">
                                <MdOutlineAdd className="font-bold text-2xl " />
                                <span>Theo dõi</span>
                            </div>
                        </ButtonOutline>
                    )}
                </div>
            )}
        </div>
    );
}
