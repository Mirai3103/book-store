import * as React from "react";
import FilterBook from "./FilterBook";
import ListBooks from "./ListBooks";
import useSearchBook from "../../hooks/useSearchBook";

export default function Search() {
    const { query, dispatchQuery } = useSearchBook();
    return (
        <div className="flex mx-4 pr-10 w-full my-4 gap-x-5 ">
            <FilterBook currentQuery={query} dispatchQuery={dispatchQuery} />
            <ListBooks className="w-full" currentQuery={query} dispatchQuery={dispatchQuery} />
        </div>
    );
}
