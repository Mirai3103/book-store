import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface IProps {
    handleQuantityChange: (quantity: number) => void;
    innitialQuantity?: number;
    widthClass?: string;
    editable?: boolean;
}

export default function SelectQuantity({
    handleQuantityChange,
    innitialQuantity = 1,
    widthClass = "w-24",
    editable = true,
}: IProps) {
    const [quantity, setQuantity] = React.useState(innitialQuantity);
    React.useEffect(() => {
        handleQuantityChange(quantity);
    }, [quantity]);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numberRegex = /^[0-9]+$/;
        if (!numberRegex.test(value)) {
            return;
        }
        if (value == "") {
            setQuantity(1);
            return;
        }
        const number = parseInt(value);
        if (number < 1) {
            setQuantity(1);
            return;
        }
        setQuantity(number);
    };
    const hanldeIncreaseQuantity = () => {
        setQuantity((oldQuantity) => oldQuantity + 1);
    };
    const handleDecreaseQuantity = () => {
        if (quantity == 1) return;
        setQuantity((oldQuantity) => oldQuantity - 1);
    };
    return (
        <div className="flex">
            <span
                className="border border-r-0 cursor-pointer px-2 flex justify-center items-center hover:bg-primary hover:text-white"
                onClick={handleDecreaseQuantity}
            >
                <AiOutlineMinus />
            </span>
            <input
                type="text"
                className={`border outline-none px-2 py-1 text-end ${widthClass}`}
                value={quantity}
                onChange={handleInputChange}
                disabled={!editable}
            />
            <span
                className="border border-l-0 px-2 cursor-pointer flex justify-center items-center hover:bg-primary hover:text-white"
                onClick={hanldeIncreaseQuantity}
            >
                <AiOutlinePlus />
            </span>
        </div>
    );
}
