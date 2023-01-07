import React from "react";
import { ActionType } from "../../../hooks/useSearchBook";
import { Slider, styled } from "@mui/material";
import Button from "../../../components/Button";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    currentPriceRange:
        | {
              min: number;
              max: number;
          }
        | undefined;
    dispatchQuery: React.Dispatch<{ type: ActionType; payload: any }>;
}

const PrettoSlider = styled(Slider)({
    color: "#52af77",
    height: 8,
    "& .MuiSlider-track": {
        border: "none",
    },
    "& .MuiSlider-thumb": {
        height: 24,
        width: 24,
        backgroundColor: "#fff",
        border: "2px solid currentColor",
        "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
            boxShadow: "inherit",
        },
        "&:before": {
            display: "none",
        },
    },
    "& .MuiSlider-valueLabel": {
        lineHeight: 1.2,
        fontSize: 16,
    },
});
export default function PricePicker({ className, currentPriceRange, dispatchQuery }: Props) {
    const [value, setValue] = React.useState<number[]>([0, 500]);
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    React.useEffect(() => {
        if (currentPriceRange) {
            setValue([currentPriceRange.min, currentPriceRange.max]);
        }
    }, [currentPriceRange]);
    const handleApply = () => {
        dispatchQuery({ type: ActionType.SET_PRICE, payload: { min: value[0], max: value[1] } });
    };
    return (
        <div className={"flex flex-col border-b border-b-gray-300 pb-3 w-full gap-y-1 font-semibold" + className ?? ""}>
            <h2 className="font-bold text-base mb-2 ">Lọc theo khoảng giá</h2>

            <PrettoSlider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}.000đ`}
                disableSwap
                className="mt-5 mb-0"
                min={0}
                max={500}
            />
            <div className="flex justify-between -mt-3 mb-3">
                <div className="text-gray-600">0.000đ</div>
                <div className="text-gray-600">500.000đ</div>
            </div>
            <div className="flex justify-end ">
                {/* <div className="flex items-center border-2 border-primary w-10 rounded-sm">
                    <input type="text" value={value[0]} className="outline-none w-full" disabled />
                </div>
                <span className="mr-3">.000vnđ &nbsp;&nbsp;- </span>
                <div className="flex items-center border-2 border-primary rounded-sm w-10">
                    <input type="text" value={value[1]} className="outline-none w-full" disabled />
                </div>
                <span>.000vnđ</span> */}
                <span className="font-semibold text-lg">{value[0] + ".000đ - " + value[1] + ".000đ"}</span>
            </div>
            <div className="flex justify-center">
                <Button onClick={handleApply} className="px-6">
                    Apply
                </Button>
            </div>
        </div>
    );
}
