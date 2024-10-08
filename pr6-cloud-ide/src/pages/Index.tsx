import { Button, Typography } from "@mui/material";
import React from "react";
import { userStore } from "../stores/user";
import { useNavigate } from "react-router-dom";

const IndexPage: React.FC = () => {
    const { getUser } = userStore();

    const navigate = useNavigate();

    return (
        <>
            <Typography variant="h1">{getUser()?.name}</Typography>
            <Button onClick={() => navigate("/workspace")}>Launch</Button>
        </>
    );
};

export default IndexPage;
