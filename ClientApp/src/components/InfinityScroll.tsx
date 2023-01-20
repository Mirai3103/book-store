import React from "react";
import useIsInViewPort from "hooks/useIsInViewport";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    onIntersect: () => void;
    threshold?: number;
}

const InfinityScroll: React.FC<IProps> = ({ onIntersect, threshold = 3, children, ...props }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const isInView = useIsInViewPort(ref, threshold);

    React.useEffect(() => {
        if (isInView) {
            onIntersect();
        }
    }, [isInView, onIntersect]);

    return (
        <div {...props}>
            {children}
            <div ref={ref} />
        </div>
    );
};

export default InfinityScroll;
