import { Typography } from "@mui/material";
import React from "react";
import { userStore } from "../stores/user";

const Dashboard: React.FC = () => {
    const { getUser } = userStore();

    return (
        <>
            <Typography variant="h5">Dashboard</Typography>
            <Typography variant="h5">{getUser()?.name}</Typography>
        </>
    );
};

export default Dashboard;
