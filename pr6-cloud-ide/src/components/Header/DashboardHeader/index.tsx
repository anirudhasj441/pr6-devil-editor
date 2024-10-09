import {
    AppBar,
    Toolbar,
    Avatar,
    Menu,
    MenuItem,
    IconButton,
    MenuList,
    ListItemText,
    Divider,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../../utils/User";
import { userStore } from "../../../stores/user";

const DashboardLayout: React.FC = () => {
    const { getUser } = userStore();

    const navigate = useNavigate();

    const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(
        null
    );

    const handleLogout = useCallback(() => {
        const user = new User();
        user.logout();
        navigate("/");
    }, []);

    return (
        <>
            <AppBar position="sticky">
                <Toolbar variant="dense">
                    <img src="/images/icon_fill_circle.png" className="h-12" />
                    <div className="flex-grow"></div>
                    <IconButton
                        onClick={(e) => setUserMenuAnchor(e.currentTarget)}
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
                        sx={{ width: 320, maxWidth: "100%" }}
                    >
                        <MenuList>
                            <MenuItem>
                                <ListItemText>{getUser()?.name}</ListItemText>
                            </MenuItem>
                            <Divider/>
                            <MenuItem onClick={handleLogout}>
                                <ListItemText>Logout</ListItemText>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default DashboardLayout;
