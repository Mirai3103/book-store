import { useCallback, useEffect, useState, useRef } from "react";

interface Size {
    width: number;
    height: number;
}

function useElementSize<T extends HTMLElement = HTMLDivElement>(): [React.RefObject<T>, Size] {
    const [size, setSize] = useState<Size>({ width: 0, height: 0 });
    const ref = useRef<T>(null);

    const handleResize = useCallback(() => {
        if (ref.current) {
            setSize({
                width: ref.current.offsetWidth,
                height: ref.current.offsetHeight,
            });
        }
    }, [ref.current]);
    useEffect(() => {
        handleResize();
    }, [handleResize]);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize]);

    return [ref, size];
}

export default useElementSize;
