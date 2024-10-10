import {
    Button,
    Divider,
    InputAdornment,
    Link,
    Paper,
    TextField,
    Typography,
    IconButton,
    CircularProgress,
} from "@mui/material";
import React, { useRef, useState, useEffect, memo } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import GoogleAuthButton from "../components/GoogleAuthButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import User from "../utils/User";
import { IUser } from "../types";
import AlertMessage from "../components/AlertMessage";

const LoginPage: React.FC = () => {
    const mounted = useRef(false);

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = new User();
            const result: IUser = await user.login(email, password);
            result;

            navigate("/dashboard");
        } catch (err) {
            console.error("Login Failed!", err);
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (mounted.current) return;

        const user = new User();

        const checkUserAuthenticated = async () => {
            const result = await user.isUserAuthenticated();

            if (result) {
                navigate("/dashboard");
            }
        };

        checkUserAuthenticated();
        return () => {
            mounted.current = true;
        };
    }, []);

    return (
        <>
            <div className="h-svh w-svw flex justify-center items-center">
                <AlertMessage
                    show={error}
                    severity="error"
                    message="Invalid Credentials"
                ></AlertMessage>
                <Paper
                    elevation={3}
                    className="p-3 m-3"
                    sx={{ width: "100%", maxWidth: "500px" }}
                >
                    <Typography variant="h5" align="center" padding={1}>
                        Login
                    </Typography>
                    <form
                        className="flex flex-col gap-4 mt-4"
                        onSubmit={handleLogin}
                    >
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            name="email"
                            autoComplete="username"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            variant="contained"
                            sx={{ paddingY: "0.85rem" }}
                            type="submit"
                            disabled={loading}
                        >
                            {!loading ? (
                                "Login"
                            ) : (
                                <CircularProgress size={"1.5rem"} />
                            )}
                        </Button>
                    </form>
                    <div className="flex gap-2 justify-center my-2">
                        <Typography>Not have account?</Typography>
                        <Link component={RouterLink} to="/signup">
                            Create account
                        </Link>
                    </div>
                    <Divider>
                        <Typography align="center" padding={1}>
                            OR
                        </Typography>
                    </Divider>
                    <GoogleAuthButton></GoogleAuthButton>
                </Paper>
            </div>
        </>
    );
};

export default memo(LoginPage);
