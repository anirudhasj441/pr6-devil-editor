import { Avatar, IconButton } from "@mui/material";
import React from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { googleSignInApi } from "../../utils/api";

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

const GoogleAuth: React.FC = () => {
    const handleGoogleAuthResponse = async (response: any): Promise<void> => {
        try {
            const json_res = await googleSignInApi(response.code);

            console.log(json_res);
        } catch (err) {
            console.error("auth failed: ", err);
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
                <IconButton onClick={googleLogin}>
                    <Avatar src="/images/google-g-2015.svg"></Avatar>
                </IconButton>
            </div>
        </>
    );
};

export default GoogleAuthButton;
