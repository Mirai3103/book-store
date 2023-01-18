import { RefObject, useEffect, useMemo, useState } from "react";
export function useIsInViewPort<T extends HTMLElement = HTMLDivElement>(ref: RefObject<T>) {
    const [isInView, setIsInView] = useState<boolean>(false);
    const observer = useMemo(() => {
        function callback(entries: IntersectionObserverEntry[]) {
            const entry = entries[0];
            setIsInView(entry.isIntersecting);
        }
        return new IntersectionObserver(callback);
    }, []);

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
