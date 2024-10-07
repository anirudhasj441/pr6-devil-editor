import { Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { userStore } from "../stores/user";
import { useNavigate } from "react-router-dom";

const IndexPage: React.FC = () => {
    const { getUser } = userStore();

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Index mount");
        console.log("IS LOGGEDIN: ", getUser());
    }, []);

    return (
        <>
            <Typography variant="h1">{getUser()?.name}</Typography>
            <Button onClick={() => navigate("/workspace")}>Launch</Button>
        </>
    );
};

export default IndexPage;
