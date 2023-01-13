import { RefObject, useEffect } from "react";

type Handler = (event: MouseEvent) => void;

function useOnClickOutside(
    refs: RefObject<HTMLElement> | RefObject<HTMLElement>[],
    handler: Handler,
    mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            const elements = Array.isArray(refs) ? refs : [refs];
            if (
                !elements.some((ref) => {
                    return ref.current && ref.current.contains(event.target as Node);
                })
            ) {
                handler(event);
            }
        };
        document.addEventListener(mouseEvent, listener);
        return () => {
            document.removeEventListener(mouseEvent, listener);
        };
    }, [refs, handler, mouseEvent]);
}

export default useOnClickOutside;
