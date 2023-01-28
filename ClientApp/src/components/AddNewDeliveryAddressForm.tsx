import React from "react";
import Input, { colors } from "./Form/Input";
import Button, { ButtonOutline } from "./Button";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
    selectIsAuthenticated,
    addDeliveryAddressAsync,
    fetchDeliveryAddressesAsync,
    setDeliveryAddresses,
} from "redux/authSplice";
import { authInstance } from "../utils/axiosInstance";

interface IProps {
    onClosed: () => void;
}

export default function AddNewDeliveryAddressForm({ onClosed }: IProps) {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const nameRef = React.useRef<HTMLInputElement>(null);
    const phoneRef = React.useRef<HTMLInputElement>(null);
    const addressRef = React.useRef<HTMLInputElement>(null);
    const onSubmit = () => {
        if (isAuthenticated) {
            const address = {
                address: addressRef.current?.value!,
                fullName: nameRef.current?.value!,
                phone: phoneRef.current?.value!,
            };
            dispatch(addDeliveryAddressAsync(address as any));
        } else {
            console.log(addressRef.current);
            dispatch(
                setDeliveryAddresses([
                    {
                        address: addressRef.current?.value!,
                        fullName: nameRef.current?.value!,
                        id: -1,
                        phone: phoneRef.current?.value!,
                        deletedAt: null,
                        isPrimary: true,
                        userId: -1,
                    },
                ])
            );
        }
        onClosed();
    };
    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-2 w-full">
                <Input classColor={colors.defaultColor} label="Tên người nhận hàng" ref={nameRef} />
                <Input classColor={colors.defaultColor} label="Số điện thoại nhận hàng" ref={phoneRef} />
            </div>
            <Input classColor={colors.defaultColor} label="Địa chỉ nhận hàng" ref={addressRef} />
            <div className="flex gap-x-2 w-full justify-end mt-4">
                <ButtonOutline className="w-24" onClick={onClosed}>
                    Huỷ
                </ButtonOutline>
                <Button className="w-24" onClick={onSubmit}>
                    Thêm{" "}
                </Button>
            </div>
        </div>
    );
}
