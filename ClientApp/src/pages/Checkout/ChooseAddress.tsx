import React from "react";
import { selectIsAuthenticated, setDeliveryAddresses, selectDeliveryAddresses } from "../../redux/authSplice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { authInstance } from "../../utils/axiosInstance";
import AddNewDeliveryAddressForm from "../../components/AddNewDeliveryAddressForm";
import { MdAddCircleOutline } from "react-icons/md";
import useToggle from "hooks/useToggle";
import Modal from "components/Modal";
interface IProps {}

export default function ChooseAddress({}: IProps) {
    //todo: get address list from server
    const addressList = useAppSelector(selectDeliveryAddresses);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const [selectedAddress, setSelectedAddress] = React.useState<number | null>(null);
    const dispatch = useAppDispatch();
    const isDontNeedAddNewAddress = !isAuthenticated && addressList && addressList.length > 0;
    React.useEffect(() => {
        if (isAuthenticated && addressList === null) {
            authInstance.get("/api/DeliveryAddress/GetMyAddress").then((res) => {
                dispatch(setDeliveryAddresses(res.data));
            });
        }
    }, [isAuthenticated, addressList, dispatch]);
    React.useEffect(() => {
        const primaryAddress = addressList?.find((address: any) => address.isPrimary);
        if (primaryAddress) {
            setSelectedAddress(primaryAddress.id);
        } else {
            setSelectedAddress(addressList?.[0]?.id || null);
        }
    }, [addressList]);
    const [isOpen, toggle, setTrue, setFalse] = useToggle(false);
    return (
        <div className="w-full bg-white rounded-md shadow-lg mt-3 mx-3 px-3 ">
            <div className="text-2xl p-4 border-b w-full font-bold mb-2 text-primary">Chọn địa chỉ giao hàng</div>
            {addressList &&
                addressList.map((address) => (
                    <div className="flex items-center p-2 border-b gap-x-2" key={address.id}>
                        <input
                            type="radio"
                            name="address"
                            className="mr-2 h-4 w-4"
                            checked={selectedAddress === address.id}
                            onChange={() => setSelectedAddress(address.id)}
                        />

                        <div className="flex flex-col gap-y-2">
                            <div className=" font-semibold">{address.fullName}</div>
                            <div className="text text-gray-500">{address.address}</div>
                            <div className="text-sm text-gray-500">{address.phone}</div>
                        </div>
                    </div>
                ))}
            {!isDontNeedAddNewAddress && (
                <div className="flex items-center gap-x-2 p-2 border-b cursor-pointer" onClick={toggle}>
                    <MdAddCircleOutline className="text-2xl text-primary" />
                    <span className="hover:text-primary hover:underline">Thêm địa chỉ mới</span>
                </div>
            )}
            <Modal maxWidth="38rem" isOpen={isOpen} onRequestClose={toggle}>
                <div className="m-4 flex flex-col w-full max-w-xl">
                    <span className=" text-2xl border-b font-semibold mb-3 p-2">Thêm địa chỉ mới</span>
                    <AddNewDeliveryAddressForm onClosed={setFalse} />
                </div>
            </Modal>
        </div>
    );
}
