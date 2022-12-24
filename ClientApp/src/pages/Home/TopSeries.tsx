import * as React from "react";
import { ISeries } from "../../types/ServerEntity";
import axios, { AxiosResponse } from "axios";
import Loading from "../../components/Loading";
import { ButtonOutline } from "../../components/Button";
import SeriesPreview from "../../components/SeriesPreview";

const TopSeries = () => {
    const [series, setSeries] = React.useState<ISeries[]>([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        axios.get<ISeries[]>("/api/Series/GetTopSeries").then((res) => {
            setSeries(res.data);
            setLoading(false);
        });
    }, []);

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
                <ButtonOutline className="w-40 font-bold text-xl">Xem thêm</ButtonOutline>
            </div>
        </div>
    );
};

export default TopSeries;
