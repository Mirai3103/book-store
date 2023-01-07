import React from "react";
import { ActionType, IQuery } from "../../../hooks/useSearchBook";
import CategoryPicker from "./CategoryPicker";
import PricePicker from "./PricePicker";
import Language from "./Language";
import ProviderPicker from "./ProviderPicker";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    currentQuery: IQuery;
    dispatchQuery: React.Dispatch<{ type: ActionType; payload: any }>;
}
export default function FilterBook({ className, currentQuery, dispatchQuery }: Props) {
    return (
        <div
            className={"flex flex-col px-5 py-4 gap-y-4 bg-white border shadow-lg rounded-sm w-80 " + (className ?? "")}
        >
            <CategoryPicker dispatchQuery={dispatchQuery} currentCategoryId={currentQuery.categoryId} />
            <PricePicker currentPriceRange={currentQuery.price} dispatchQuery={dispatchQuery} />
            <ProviderPicker dispatchQuery={dispatchQuery} providerId={currentQuery.providerId} />
            <Language dispatchQuery={dispatchQuery} currentLanguage={currentQuery.language} />
        </div>
    );
}
