import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { userStore } from "../stores/user";
import { useNavigate } from "react-router-dom";


const IndexPage: React.FC = () => {
    const {getUser} = userStore();
    const navigate = useNavigate();
    // const
    useEffect(() => {
        if(!getUser()?.isLoggedIn) {
            navigate('/login');
        }
    }, [getUser])

    return <>
        <Typography variant="h1">{getUser()?.isLoggedIn}</Typography>
    </>;
};

export default IndexPage;
