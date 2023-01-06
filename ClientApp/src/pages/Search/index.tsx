import * as React from "react";
import { defaultQuery, reducer, ActionType, IQuery } from "./searchReducer";
import FilterBook from "./FilterBook";
import { useParams, useSearchParams } from "react-router-dom";
import ListBooks from "./ListBooks";

export default function Search() {
    const [query, dispatchQuery] = React.useReducer(reducer, defaultQuery);
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") ?? undefined;
    React.useEffect(() => {
        dispatchQuery({ type: ActionType.SET_SEARCH, payload: keyword });
    }, [keyword]);
    return (
        <div className="flex mx-4 pr-10 w-full my-4 gap-x-5 ">
            <FilterBook currentQuery={query} dispatchQuery={dispatchQuery} />
            <ListBooks className="w-full" currentQuery={query} dispatchQuery={dispatchQuery} />
        </div>
    );
}
