import React from "react";
import { ActionType, IQuery, SortOrder } from "../../hooks/useSearchBook";
import { InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, styled } from "@mui/material";
import { sortOrderDisplay, limitOptions } from "../../hooks/useSearchBook";
import { IBookPreview } from "../../types/ServerEntity";
import Loading from "../../components/Loading";
import axios from "axios";
import BookPreview from "../../components/BookPreview";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dispatchQuery: React.Dispatch<{ type: ActionType; payload: any }>;
    currentQuery: IQuery;
}

const SmallerSelect = styled(Select)({
    fontSize: 14,
    "& .MuiSelect-select": {
        padding: "0.5rem 1rem",
    },
    "& .Muilist-root": {
        fontSize: 14,
    },
});

export default function FilterBook({ dispatchQuery, currentQuery, ...props }: Props) {
    const handleChangeOrderBy = (event: SelectChangeEvent<unknown>) => {
        dispatchQuery({ type: ActionType.SET_SORT_BY, payload: event.target.value });
    };
    const handleChangeLimit = (event: SelectChangeEvent<unknown>) => {
        dispatchQuery({ type: ActionType.SET_LIMIT, payload: event.target.value });
    };
    const [books, setBooks] = React.useState<IBookPreview[] | null>(null);
    const [pageCount, setPageCount] = React.useState(2);
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatchQuery({ type: ActionType.SET_PAGE, payload: value });
    };
    React.useEffect(() => {
        const data: IQuery = {
            ...currentQuery,
        };
        if (currentQuery.price) {
            data.price = {
                min: currentQuery.price.min * 1000,
                max: currentQuery.price.max * 1000,
            };
        }
        axios.post("/api/Book/AdvancedSearch", data).then((res) => {
            setBooks(res.data.books);
            setPageCount(Math.ceil(res.data.count / currentQuery.limit));
        });
        return () => {
            setBooks(null);
        };
    }, [currentQuery]);

    return (
        <div
            {...props}
            className={"flex  flex-col px-5 py-4 gap-y-4 bg-white border shadow-lg rounded-sm  " + props.className}
        >
            <div className="flex  justify-between">
                <div className="flex gap-x-4 items-center">
                    <span>S???p x???p theo</span>
                    <div>
                        <SmallerSelect value={currentQuery.sortBy} onChange={handleChangeOrderBy}>
                            {sortOrderDisplay.map((orderType, i) => (
                                <MenuItem key={orderType.value} value={orderType.value}>
                                    {orderType.label}
                                </MenuItem>
                            ))}
                        </SmallerSelect>
                    </div>
                </div>
                <div className="flex gap-x-4 items-center">
                    <span>S??? l?????ng hi???n th???</span>
                    <div>
                        <SmallerSelect value={currentQuery.limit} onChange={handleChangeLimit}>
                            {limitOptions.map((v, i) => (
                                <MenuItem key={i} value={v}>
                                    {v + " s???n ph???m"}
                                </MenuItem>
                            ))}
                        </SmallerSelect>
                    </div>
                </div>
            </div>

            <div
                className={`flex w-full gap-x-1 justify-evenly flex-wrap ${
                    books ? "" : "items-center justify-center"
                } `}
            >
                {books ? (
                    books.length == 0 ? (
                        <div className="bg-yellow-100 text-green-600 mt-10 p-2 text-xl font-semibold border-red-300 border">
                            Kh??ng c?? s???n ph???m ph?? h???p v???i t??? kh??a t??m ki???m c???a b???n.
                        </div>
                    ) : (
                        books.map((book) => <BookPreview key={book.id} book={book} />)
                    )
                ) : (
                    <Loading />
                )}
            </div>
            <div className="flex justify-center mt-6 items-center">
                <Pagination count={pageCount} color="primary" page={currentQuery.page} onChange={handleChangePage} />
            </div>
        </div>
    );
}
