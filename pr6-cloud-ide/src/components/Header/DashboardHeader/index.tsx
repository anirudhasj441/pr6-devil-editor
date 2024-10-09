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

    const ProfileAvatar = getUser()?.profile_pic ? (
        <Avatar src={getUser()?.profile_pic} />
    ) : (
        <Avatar>{getUser()?.name[0]}</Avatar>
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
                        {ProfileAvatar}
                    </IconButton>
                    <Menu
                        open={Boolean(userMenuAnchor)}
                        anchorEl={userMenuAnchor}
                        onClose={() => setUserMenuAnchor(null)}
                    >
                        <MenuList sx={{ minWidth: "200px" }}>
                            <MenuItem className="flex gap-2">
                                <Avatar>{ProfileAvatar}</Avatar>
                                {getUser()?.name}
                                {/* <ListItemText></ListItemText> */}
                            </MenuItem>
                            <Divider />
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
