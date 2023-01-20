import { RefObject, useEffect, useMemo, useState } from "react";
import useDebounce from "./useDebounce";
export default function useIsInViewPort<T extends HTMLElement = HTMLDivElement>(ref: RefObject<T>, threshold = 0.5) {
    const [isInView, setIsInView] = useState<boolean>(false);

    const observer = useMemo(
        () =>
            new IntersectionObserver(
                ([entry]) => {
                    setIsInView(entry.isIntersecting);
                },
                {
                    threshold: 0.5,
                }
            ),
        [threshold]
    );

    useEffect(() => {
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            observer.disconnect();
        };
    }, [ref, observer]);

    return isInView;
}
