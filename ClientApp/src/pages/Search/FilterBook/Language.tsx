import React from "react";
import { ActionType } from "../searchReducer";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectLanguages, setLanguages } from "../../../redux/queryPickerSplice";
import axios from "axios";
import Loading from "../../../components/Loading";
import { Checkbox } from "@mui/material";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dispatchQuery: React.Dispatch<{ type: ActionType; payload: any }>;
    currentLanguage: undefined | string[];
}

export default function Language({ className, dispatchQuery, currentLanguage }: Props) {
    const dispatch = useAppDispatch();
    const languages = useAppSelector(selectLanguages);
    React.useEffect(() => {
        if (languages && languages.length > 0) return;
        axios.get("api/Book/GetListLanguage").then((res) => {
            dispatch(setLanguages(res.data));
        });
    }, []);
    if (!languages)
        return (
            <div className={"flex flex-col " + className ?? ""}>
                <h2 className="font-bold text-base">Lọc theo danh mục sách</h2>
                <Loading />
            </div>
        );
    const handleLanguageClick = (language: string) => {
        if (currentLanguage?.includes(language)) {
            dispatchQuery({ type: ActionType.SET_LANGUAGE, payload: currentLanguage.filter((l) => l != language) });
        } else {
            dispatchQuery({ type: ActionType.SET_LANGUAGE, payload: [...(currentLanguage ?? []), language] });
        }
    };

    return (
        <div className={"flex flex-col border-b border-b-gray-300 pb-3 w-full  font-semibold" + className ?? ""}>
            <h2 className="font-bold text-base mb-2">Lọc theo ngôn ngữ</h2>
            <div className="flex flex-col">
                {languages.map((language) => {
                    return (
                        <div key={language} className="flex items-center cursor-pointer">
                            <Checkbox
                                checked={currentLanguage?.includes(language) || false}
                                onChange={() => handleLanguageClick(language)}
                                id={language}
                            />
                            <label className="cursor-pointer" htmlFor={language}>
                                {language}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
