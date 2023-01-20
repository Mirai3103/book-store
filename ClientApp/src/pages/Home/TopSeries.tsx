import * as React from "react";
import { ISeries } from "../../types/ServerEntity";
import axios, { AxiosResponse } from "axios";
import Loading from "../../components/Loading";
import { ButtonOutline } from "../../components/Button";
import SeriesPreview from "../../components/SeriesPreview";
import { Link } from "react-router-dom";
import { TrendingCategory } from "pages/TrendingPage";
import { selectIsAuthenticated } from "../../redux/authSplice";
import { useAppSelector } from "redux/hooks";
import { authInstance } from "utils/axiosInstance";
const TopSeries = () => {
    const [series, setSeries] = React.useState<ISeries[]>([]);
    const [loading, setLoading] = React.useState(true);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    React.useEffect(() => {
        const instance = isAuthenticated ? authInstance : axios;
        instance.get<ISeries[]>("/api/Series/GetTopSeries?page=1&limit=6").then((res) => {
            setSeries(res.data);
            setLoading(false);
        });
    }, [isAuthenticated]);

    return (
        <div className="w-full bg-white rounded-md shadow-lg mt-3">
            <div className="flex justify-between py-5 px-4 border-b items-center">
                <h2 className="font-semibold text-2xl">Top bộ sách </h2>
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
                    series.map((seri) => (
                        <SeriesPreview
                            key={seri.id}
                            className="w-[33%] @lg:w-[48%] @sm:w-[98%]"
                            series={seri}
                            type="short"
                        />
                    ))
                )}
            </div>
            <div className="flex w-full justify-center py-4">
                <Link to={`/trending?category=${TrendingCategory[TrendingCategory.TopSeries]}`}>
                    <ButtonOutline className="w-40 font-bold text-xl">Xem thêm</ButtonOutline>
                </Link>
            </div>
        </div>
    );
};

export default TopSeries;
