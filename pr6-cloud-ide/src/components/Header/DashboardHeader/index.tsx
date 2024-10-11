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
    ListItemIcon,
    ListItem,
} from "@mui/material";
import React, { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../../utils/User";
import { userStore } from "../../../stores/user";
import { Logout } from "@mui/icons-material";

const stringToColor = (string: string | undefined): string => {
    let hash = 0;
    let i;
    if (!string) return "#111111";
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
};

const ProfilePic = memo(
    (props: { profile_pic: string | undefined; name: string | undefined }) => {
        return (
            <>
                {props.profile_pic ? (
                    <Avatar src={props.profile_pic} />
                ) : (
                    <Avatar sx={{ bgcolor: stringToColor(props.name) }}>
                        {props.name?.[0]}
                    </Avatar>
                )}
            </>
        );
    }
);

const DashboardLayout: React.FC = () => {
    const { getUser } = userStore();

    const navigate = useNavigate();
    const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(
        null
    );

    const handleLogout = useCallback(() => {
        const user = new User();
        user.logout();
        navigate("/login");
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
                        {
                            <ProfilePic
                                profile_pic={getUser()?.profile_pic}
                                name={getUser()?.name}
                            />
                        }
                    </IconButton>
                    <Menu
                        open={Boolean(userMenuAnchor)}
                        anchorEl={userMenuAnchor}
                        onClose={() => setUserMenuAnchor(null)}
                    >
                        <MenuList sx={{ minWidth: "200px" }}>
                            <ListItem className="flex gap-2 py-1">
                                <ProfilePic
                                    profile_pic={getUser()?.profile_pic}
                                    name={getUser()?.name}
                                />
                                <ListItemText
                                    primary={getUser()?.name}
                                    secondary={getUser()?.email}
                                />
                                {/* <ListItemText></ListItemText> */}
                            </ListItem>
                            <Divider sx={{ marginY: "0.5rem" }} />
                            <MenuItem onClick={handleLogout}>
                                <ListItemText>Logout</ListItemText>
                                <ListItemIcon>
                                    <Logout />
                                </ListItemIcon>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default memo(DashboardLayout);
