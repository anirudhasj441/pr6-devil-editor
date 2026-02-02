import { Avatar, IconButton } from "@mui/material";
import React, { memo, useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import User from "../../utils/User";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../AlertMessage";
import Loading from "../Loading";

const GoogleAuthButton = () => {
    return (
        <>
            <GoogleOAuthProvider
                clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
            >
                <GoogleAuth></GoogleAuth>
            </GoogleOAuthProvider>
        </>
    );
};

const GoogleAuth: React.FC = memo(() => {
    const navigate = useNavigate();

    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const handleGoogleAuthResponse = async (response: any): Promise<void> => {
        try {
            setLoading(true);
            const user: User = new User();

            const json_res = await user.googleLogin(response.code);

            console.log(json_res);
            setLoading(false);

            navigate("/dashboard");
        } catch (err) {
            console.error("auth failed: ", err);
            setError(true);
            setTimeout(() => setError(false), 3000);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: handleGoogleAuthResponse,
        onError: handleGoogleAuthResponse,
        flow: "auth-code",
    });
    googleLogin;

    return (
        <>
            <div className="w-full text-center">
                <Loading open={loading} />
                <AlertMessage
                    show={error}
                    severity="error"
                    message="Login Failed!!"
                ></AlertMessage>
                <IconButton onClick={googleLogin}>
                    <Avatar src="/images/google-g-2015.svg"></Avatar>
                </IconButton>
            </div>
        </>
    );
});

export default memo(GoogleAuthButton);
