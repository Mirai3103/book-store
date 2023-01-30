import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectHadTryToLogin, selectIsAuthenticated, selectUser } from "../redux/authSplice";
import LoadingScreen from "../components/LoadingScreen";
import { Role } from "types/ServerEntity";

export default function withAuth<T extends {}>(WrappedComponent: React.FC<T>, isNeedAdmin: boolean = false) {
    return function WithAuth(props: T) {
        const navigate = useNavigate();
        const user = useAppSelector(selectUser);
        const hadTryToLogin = useAppSelector(selectHadTryToLogin);
        React.useEffect(() => {
            if (hadTryToLogin && !user) {
                navigate("/login");
            }
            if (isNeedAdmin && user && user.role !== Role.ADMIN) {
                navigate("/not-found");
            }
        }, [hadTryToLogin, user]);

        if (!user) return <LoadingScreen />;
        return <WrappedComponent {...props} />;
    };
}
