import { Button } from "@mui/material";
import React, { memo } from "react";
import User from "../utils/User";
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const user = new User();

        user.logout();

        navigate("/login");
    };

    return (
        <>
            <Button onClick={handleLogout}>Logout</Button>
        </>
    );
};

export default memo(LogoutButton);
