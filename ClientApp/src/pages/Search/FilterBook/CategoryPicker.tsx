import React from "react";
import { ActionType, IQuery } from "../searchReducer";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { selectCategories, setCategories } from "../../../redux/queryPickerSplice";
import axios from "axios";
import Loading from "../../../components/Loading";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dispatchQuery: React.Dispatch<{ type: ActionType; payload: any }>;
    currentCategoryId: number | undefined | string;
}

export default function CategoryPicker({ className, dispatchQuery, currentCategoryId }: Props) {
    const categories = useAppSelector(selectCategories);
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        if (categories && categories.length > 0) return;
        axios.get("/api/Category/GetAllGroupByParent").then((res) => {
            dispatch(setCategories(res.data));
        });
    }, []);
    const handleCategoryClick = (categoryId: number | undefined = undefined) => {
        dispatchQuery({ type: ActionType.SET_CATEGORY_ID, payload: categoryId });
    };
    const listRender = React.useMemo(() => {
        if (!categories) return categories;
        return categories.map((category) => {
            let isChoosen =
                category.childCategories.some((childCategory) => childCategory.id == currentCategoryId) ||
                category.id == currentCategoryId;
            return {
                ...category,
                isChoosen,
                childCategories: category.childCategories.map((childCategory) => {
                    return {
                        ...childCategory,
                        isChoosen: childCategory.id == currentCategoryId,
                    };
                }),
            };
        });
    }, [categories, currentCategoryId]);
    if (!categories)
        return (
            <div className={"flex flex-col " + className ?? ""}>
                <h2 className="font-bold text-base">Lọc theo danh mục sách</h2>
                <Loading />
            </div>
        );
    return (
        <div className={"flex flex-col border-b border-b-gray-300 pb-3 w-full  font-semibold" + className ?? ""}>
            <h2 className="font-bold text-base mb-2">Lọc theo danh mục sách</h2>
            <div
                className={`flex hover:underline cursor-pointer flex-col ml-8 font-semibold  ${
                    !currentCategoryId ? "text-primary-dark" : "text-gray-600"
                }`}
                onClick={() => handleCategoryClick()}
            >
                Tất cả sách
            </div>
            <div className="flex flex-col ml-8">
                {listRender!.map((category) => {
                    return (
                        <div key={category.id}>
                            <div
                                className={
                                    "flex cursor-pointer hover:underline font-semibold " +
                                    (category.isChoosen ? "text-primary-dark" : "text-gray-600")
                                }
                                onClick={() => handleCategoryClick(category.id)}
                            >
                                {category.name}
                            </div>
                            {category.isChoosen && (
                                <div className="flex flex-col  ml-8">
                                    {category.childCategories.map((childCategory) => {
                                        return (
                                            <div
                                                key={childCategory.id}
                                                className={
                                                    "flex cursor-pointer font-normal text-sm hover:underline truncate " +
                                                    (childCategory.isChoosen ? "text-primary-dark" : "text-gray-600")
                                                }
                                                onClick={() => handleCategoryClick(childCategory.id)}
                                            >
                                                {childCategory.name}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
