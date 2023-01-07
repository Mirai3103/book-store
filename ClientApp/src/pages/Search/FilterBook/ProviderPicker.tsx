import React from "react";
import { ActionType } from "../../../hooks/useSearchBook";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectProviders, setProviders } from "../../../redux/queryPickerSplice";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import Loading from "../../../components/Loading";
import { IProvider } from "../../../types/ServerEntity";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dispatchQuery: React.Dispatch<{ type: ActionType; payload: any }>;
    providerId: undefined | number[];
}

export default function ProviderPicker({ className, dispatchQuery, providerId }: Props) {
    const providers = useAppSelector(selectProviders);
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        if (providers && providers.length > 0) return;
        axios.get("/api/Provider/GetAll").then((res) => {
            dispatch(setProviders(res.data));
        });
    }, []);
    if (!providers)
        return (
            <div className={"flex flex-col " + className ?? ""}>
                <h2 className="font-bold text-base">Lọc theo danh mục sách</h2>
                <Loading />
            </div>
        );
    const handleChange = (e: React.ChangeEvent<{}>, value: IProvider[]) => {
        dispatchQuery({ type: ActionType.SET_PROVIDER_ID, payload: value.map((v) => v.id) });
    };
    return (
        <div className={"flex flex-col border-b border-b-gray-300 pb-3 w-full  font-semibold" + className ?? ""}>
            <h2 className="font-bold text-base mb-4">Lọc nhà cung cấp</h2>
            <Autocomplete
                multiple
                id="tags-standard"
                options={providers}
                getOptionLabel={(option) => option.name}
                // defaultValue={[top100Films[13]]}
                renderInput={(params) => (
                    <TextField {...params} variant="standard" label="Nhà cung cấp" placeholder="Chọn nhà cung cấp" />
                )}
                onChange={handleChange}
                value={providerId ? providerId.map((id) => providers.find((p) => p.id == id)!) : []}
            />
            <div className="mb-4"></div>
        </div>
    );
}
