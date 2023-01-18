import { Link, LinkProps } from "react-router-dom";

interface Props extends LinkProps {
    icon: React.FC;
    title: string;
    description: string;
}
export function Item({ icon: Icon, title, description, ...rest }: Props) {
    return (
        <Link {...rest} className="flex gap-x-2  p-3 rounded-md relative hover:bg-gray-100 cursor-pointer">
            <div className="w-11 h-11 flex items-center justify-center bg-gray-50 text-primary text-2xl grow-0 shrink-0">
                <Icon />
            </div>
            <div className="flex flex-col justify-center grow shrink">
                <div className="font-semibold text-base">{title}</div>
                <div className="text-xs text-gray-400">{description}</div>
            </div>
        </Link>
    );
}
