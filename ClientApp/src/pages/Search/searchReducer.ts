export enum SortOrder {
    WeekBestSeller = 1,
    MonthBestSeller = 2,
    YearBestSeller = 3,
    PriceLowToHigh = 4,
    PriceHighToLow = 5,
    Newest = 6,
    Oldest = 7,
}
export interface IQuery {
    page: number;
    limit: number;
    search?: string | undefined;
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
    search: undefined,
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
}

export const reducer = (state: IQuery, action: { type: ActionType; payload: any }) => {
    switch (action.type) {
        case ActionType.SET_PAGE:
            return { ...state, page: action.payload };
        case ActionType.SET_LIMIT:
            return { ...state, limit: action.payload };
        case ActionType.SET_SEARCH:
            return { ...state, search: action.payload };
        case ActionType.SET_CATEGORY_ID:
            return { ...state, categoryId: action.payload };
        case ActionType.SET_PRICE:
            return { ...state, price: action.payload };
        case ActionType.SET_PROVIDER_ID:
            return { ...state, providerId: action.payload };
        case ActionType.SET_SORT_BY:
            return { ...state, sortBy: action.payload };
        case ActionType.SET_AGE_GROUP:
            return { ...state, ageGroup: action.payload };
        case ActionType.SET_LEVEL:
            return { ...state, level: action.payload };
        case ActionType.SET_GRADE:
            return { ...state, grade: action.payload };
        case ActionType.SET_LANGUAGE:
            return { ...state, language: action.payload };
        case ActionType.SET_BOOK_COVER_TYPE:
            return { ...state, bookCoverType: action.payload };
        default:
            return state;
    }
};
