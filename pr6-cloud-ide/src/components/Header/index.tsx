import React, { useState, useEffect, memo } from "react";
import {
    AppBar,
    Toolbar,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    useTheme,
    ListItemButton,
    Box,
    Divider,
    SwipeableDrawer,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Spacer from "../Spacer";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
        if (isMobile) {
            handleDrawerToggle();
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && mobileOpen) {
                handleDrawerToggle();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [mobileOpen]);

    const menuItems = [
        { text: "Home", id: "home" },
        { text: "About", id: "about" },
        { text: "Pricing", id: "pricing" },
    ];

    return (
        <>
            <AppBar position="sticky">
                <Toolbar className="gap-3">
                    <img src="/images/icon_fill_circle.png" className="h-12" />
                    {!isMobile ? (
                        <Box className="flex flex-grow">
                            {menuItems.map(
                                (item: { text: string; id: string }) => (
                                    <Button
                                        key={item.id}
                                        sx={{
                                            color: theme.palette.text.primary,
                                        }}
                                        onClick={() => scrollToSection(item.id)}
                                    >
                                        {item.text}
                                    </Button>
                                )
                            )}
                            <Spacer />
                            <Button
                                variant="contained"
                                endIcon={<ArrowForwardIosIcon />}
                                onClick={() => navigate("/login")}
                                sx={{
                                    backgroundColor: theme.palette.primary.main,
                                    color: "#ffffff",
                                    borderRadius: "50px",
                                    padding: "8px 20px",
                                    "&:hover": {
                                        backgroundColor:
                                            theme.palette.primary.dark,
                                    },
                                }}
                            >
                                Get Started
                            </Button>
                        </Box>
                    ) : (
                        <></>
                    )}
                    {isMobile ? <Spacer /> : <></>}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            display: "none",
                            [theme.breakpoints.down("md")]: {
                                display: "block",
                            },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                onOpen={() => setMobileOpen(true)}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <Box sx={{ width: "100vw", paddingX: "1rem" }}>
                    <List sx={{ width: "100%" }}>
                        {menuItems.map((item: { text: string; id: string }) => (
                            <ListItem sx={{ paddingX: 0 }} key={item.id}>
                                <ListItemButton
                                    onClick={() => scrollToSection(item.id)}
                                >
                                    <ListItemText>{item.text}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <Divider />
                        <Button
                            variant="contained"
                            endIcon={<ArrowForwardIosIcon />}
                            fullWidth
                            onClick={() => navigate("/login")}
                            sx={{
                                marginY: "1rem",
                                backgroundColor: theme.palette.primary.main,
                                color: "#ffffff",
                                borderRadius: "50px",
                                padding: "8px 20px",
                                "&:hover": {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                            }}
                        >
                            Get Started
                        </Button>
                    </List>
                </Box>
            </SwipeableDrawer>
        </>
    );
};

export default memo(Header);
