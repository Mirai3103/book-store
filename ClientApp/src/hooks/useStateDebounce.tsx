import { useState } from "react";
import useDebounce from "./useDebounce";
export default function useStateDebounce<T>(
    initialValue: T,
    delay: number = 500
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(initialValue);
    const debouncedValue = useDebounce(value, delay);
    return [debouncedValue, setValue];
}
