import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../utils/User";

interface IProtectedRouteProps {
    children: React.ReactElement;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
    children,
}: IProtectedRouteProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserIsAuthenticated = async () => {
            const user = new User();

            const isAuthenticated = await user.isUserAuthenticated();
            console.log("isAuthenticated: ", isAuthenticated);
            if (!isAuthenticated) {
                navigate("/login");
            }
        };
        checkUserIsAuthenticated();
    }, [children]);

    return <>{children}</>;
};

export default ProtectedRoute;
