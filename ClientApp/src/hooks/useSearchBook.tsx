import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export enum SortOrder {
    WeekBestSeller = 1,
    MonthBestSeller = 2,
    YearBestSeller = 3,
    PriceLowToHigh = 4,
    PriceHighToLow = 5,
    Newest = 6,
    Oldest = 7,
}

export const sortOrderDisplay = [
    { value: SortOrder.WeekBestSeller, label: "Bán chạy tuần" },
    { value: SortOrder.MonthBestSeller, label: "Bán chạy tháng" },
    { value: SortOrder.YearBestSeller, label: "Bán chạy năm" },
    { value: SortOrder.PriceLowToHigh, label: "Giá thấp đến cao" },
    { value: SortOrder.PriceHighToLow, label: "Giá cao đến thấp" },
    { value: SortOrder.Newest, label: "Mới nhất" },
    { value: SortOrder.Oldest, label: "Cũ nhất" },
];

export const limitOptions = [12, 24, 36, 48];
export interface IQuery {
    page: number;
    limit: number;
    keyword?: string | undefined;
    categoryId?: number | undefined;
    price?:
        | {
              min: number;
              max: number;
          }
        | undefined;
    providerId?: number[] | undefined;
    sortBy: SortOrder;
    ageGroup?: string[] | undefined;
    level?: string[] | undefined;
    grade?: string[] | undefined;
    language?: string[] | undefined;
    bookCoverType?: ("Bìa Cứng" | "Bìa Mềm" | "Ebook")[] | undefined;
}
export const defaultQuery: IQuery = {
    page: 1,
    limit: 24,
    keyword: undefined,
    categoryId: undefined,
    price: undefined,
    providerId: undefined,
    sortBy: SortOrder.WeekBestSeller,
    ageGroup: undefined,
    level: undefined,
    grade: undefined,
    language: undefined,
    bookCoverType: undefined,
};

export enum ActionType {
    SET_PAGE,
    SET_LIMIT,
    SET_SEARCH,
    SET_CATEGORY_ID,
    SET_PRICE,
    SET_PROVIDER_ID,
    SET_SORT_BY,
    SET_AGE_GROUP,
    SET_LEVEL,
    SET_GRADE,
    SET_LANGUAGE,
    SET_BOOK_COVER_TYPE,
    CLEAR_ALL,
}

export const reducer = (state: IQuery, action: { type: ActionType; payload: any }) => {
    switch (action.type) {
        case ActionType.SET_PAGE:
            return { ...state, page: action.payload };
        case ActionType.SET_LIMIT:
            return { ...state, limit: action.payload, page: 1 };
        case ActionType.SET_SEARCH:
            return { ...state, keyword: action.payload, page: 1 };
        case ActionType.SET_CATEGORY_ID:
            return { ...state, categoryId: action.payload, page: 1 };
        case ActionType.SET_PRICE:
            return { ...state, price: action.payload, page: 1 };
        case ActionType.SET_PROVIDER_ID:
            const providerId = action.payload.length === 0 ? undefined : action.payload;
            return { ...state, providerId, page: 1 };
        case ActionType.SET_SORT_BY:
            return { ...state, sortBy: action.payload, page: 1 };
        case ActionType.SET_AGE_GROUP:
            return { ...state, ageGroup: action.payload, page: 1 };
        case ActionType.SET_LEVEL:
            return { ...state, level: action.payload, page: 1 };
        case ActionType.SET_GRADE:
            return { ...state, grade: action.payload, page: 1 };
        case ActionType.SET_LANGUAGE:
            const data = action.payload.length === 0 ? undefined : action.payload;
            return { ...state, language: data, page: 1 };
        case ActionType.SET_BOOK_COVER_TYPE:
            return { ...state, bookCoverType: action.payload, page: 1 };
        case ActionType.CLEAR_ALL:
            return { ...defaultQuery };
        default:
            return state;
    }
};

const searchParamsHandlers = {
    keyword: {
        actionType: ActionType.SET_SEARCH,
        parseValue: (value: string) => value,
        toString: (value: string) => value,
        getOldValue: (query: IQuery) => query.keyword,
    },
    page: {
        actionType: ActionType.SET_PAGE,
        parseValue: (value: string) => (Number.isNaN(parseInt(value)) ? 1 : parseInt(value)),
        toString: (value: number) => value.toString(),
        getOldValue: (query: IQuery) => query.page.toString(),
    },
    limit: {
        actionType: ActionType.SET_LIMIT,
        parseValue: (value: string) => (Number.isNaN(parseInt(value)) ? 24 : parseInt(value)),
        toString: (value: number) => value.toString(),
        getOldValue: (query: IQuery) => query.limit.toString(),
    },
    categoryId: {
        actionType: ActionType.SET_CATEGORY_ID,
        parseValue: (value: string) => (Number.isNaN(parseInt(value)) ? undefined : parseInt(value)),
        toString: (value: number) => value.toString(),
        getOldValue: (query: IQuery) => query.categoryId?.toString(),
    },
    minPrice: {
        actionType: ActionType.SET_PRICE,
        parseValue: (value: string) => {
            const min = Number.isNaN(parseInt(value)) ? undefined : parseInt(value) / 1000;
            return { min, max: 500 };
        },
        toString: (value: { min: number; max: number }) => `${value.min * 1000},${value.max * 1000}`,
        getOldValue: (query: IQuery) => query.price?.min.toString(),
    },
    maxPrice: {
        actionType: ActionType.SET_PRICE,
        parseValue: (value: string) => {
            const max = Number.isNaN(parseInt(value)) ? undefined : parseInt(value) / 1000;
            return { min: 0, max };
        },
        toString: (value: { min: number; max: number }) => `${value.min * 1000},${value.max * 1000}`,
        getOldValue: (query: IQuery) => query.price?.max.toString(),
    },
    providerId: {
        actionType: ActionType.SET_PROVIDER_ID,
        parseValue: (value: string) => {
            const providerId = value.split(",").map((id) => (Number.isNaN(parseInt(id)) ? undefined : parseInt(id)));
            return providerId.filter((id) => id !== undefined);
        },
        toString: (value: number[]) => value.join(","),
        getOldValue: (query: IQuery) => query.providerId?.join(","),
    },
    sortBy: {
        actionType: ActionType.SET_SORT_BY,
        parseValue: (value: string) => {
            const sortOrder = SortOrder[value as keyof typeof SortOrder];
            return sortOrder === undefined ? SortOrder.WeekBestSeller : sortOrder;
        },
        toString: (value: SortOrder) => SortOrder[value],
        getOldValue: (query: IQuery) => query.sortBy,
    },
};
export default function useSearchBook() {
    const [query, dispatchQuery] = React.useReducer(reducer, defaultQuery);
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        for (const [key, value] of searchParams) {
            const handler = (searchParamsHandlers as any)[key];
            const isChange = handler && handler.getOldValue(query) !== value;
            if (handler && isChange) {
                dispatchQuery({ type: handler.actionType, payload: handler.parseValue(value) });
            }
        }
        // ...
    }, [searchParams]);
    useEffect(() => {
        if (searchParams.get("clear") === "true") {
            dispatchQuery({ type: ActionType.CLEAR_ALL, payload: undefined });
        }
    }, [searchParams.get("clear")]);
    React.useEffect(() => {
        for (const key in query) {
            if ((query as any)[key]) {
                if (key === "price") continue;
                const handler = (searchParamsHandlers as any)[key];
                if (handler) {
                    const value = handler.toString((query as any)[key]);
                    searchParams.set(key, value);
                }
            }
        }
        if (query.price) {
            const min = query.price.min * 1000;
            const max = query.price.max * 1000;
            searchParams.set("minPrice", min.toString());
            searchParams.set("maxPrice", max.toString());
        }
        setSearchParams(searchParams, { replace: true });
    }, [JSON.stringify(query)]);
    return { query, dispatchQuery };
}
function useDebounce(searchParams: URLSearchParams, arg1: number) {
    throw new Error("Function not implemented.");
}
