import { Typography } from "@mui/material";
import React from "react";
import { userStore } from "../stores/user";
import LogoutButton from "../components/LogoutButton";

const IndexPage: React.FC = () => {
    const { getUser } = userStore();

    return (
        <>
            <Typography variant="h1">{getUser()?.name}</Typography>
            <LogoutButton />
        </>
    );
};

export default IndexPage;
