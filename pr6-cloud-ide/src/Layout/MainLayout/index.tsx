import {
    AppBar,
    Toolbar,
    Avatar,
    Link,
    Menu,
    MenuItem,
    IconButton,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, Link as RouterLink, useNavigate } from "react-router-dom";
import User from "../../utils/User";
import { userStore } from "../../stores/user";

const MainLayout: React.FC = () => {
    const mounted = useRef<boolean>(false);

    const { getUser } = userStore();

    const navigate = useNavigate();

    const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(
        null
    );

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const handleLogout = useCallback(() => {
        const user = new User();
        user.logout();
        setIsLoggedIn(false);
        navigate("/");
    }, []);

    useEffect(() => {
        if (mounted.current) return;

        const user = new User();

        const checkUserIsAuthenticated = async () => {
            const isLoggedIn = await user.isUserAuthenticated();
            setIsLoggedIn(isLoggedIn);
        };

        checkUserIsAuthenticated();

        return () => {
            mounted.current = true;
        };
    }, []);

    return (
        <>
            <div className="h-svh w-svw">
                <AppBar position="sticky">
                    <Toolbar variant="dense">
                        <img
                            src="/images/icon_fill_circle.png"
                            className="h-12"
                        />
                        <div className="flex-grow"></div>
                        {isLoggedIn ? (
                            <>
                                <IconButton
                                    onClick={(e) =>
                                        setUserMenuAnchor(e.currentTarget)
                                    }
                                >
                                    {getUser()?.profile_pic ? (
                                        <Avatar src={getUser()?.profile_pic} />
                                    ) : (
                                        <Avatar>{getUser()?.name[0]}</Avatar>
                                    )}
                                </IconButton>
                                <Menu
                                    open={Boolean(userMenuAnchor)}
                                    anchorEl={userMenuAnchor}
                                    onClose={() => setUserMenuAnchor(null)}
                                >
                                    <MenuItem onClick={handleLogout}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Link
                                    component={RouterLink}
                                    to="/login"
                                    underline="none"
                                    color="inherit"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
                <Outlet />
            </div>
        </>
    );
};

export default MainLayout;
