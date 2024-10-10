import React, { memo, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../utils/User";
import { Backdrop, CircularProgress } from "@mui/material";

interface IProtectedRouteProps {
    children: React.ReactElement;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
    children,
}: IProtectedRouteProps) => {
    const navigate = useNavigate();

    const mounted = useRef(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (mounted.current) return;
        const checkUserIsAuthenticated = async () => {
            const user = new User();

            const isAuthenticated = await user.isUserAuthenticated();
            console.log("isAuthenticated: ", isAuthenticated);
            setLoading(false);
            if (!isAuthenticated) {
                navigate("/login");
            }
        };
        checkUserIsAuthenticated();
        return () => {
            mounted.current = true;
        };
    }, [children]);

    return (
        <>
            {loading ? (
                <>
                    <Backdrop open={loading}>
                        <CircularProgress />
                    </Backdrop>
                </>
            ) : (
                children
            )}
        </>
    );
};

export default memo(ProtectedRoute);
