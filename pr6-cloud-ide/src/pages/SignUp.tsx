import {
    Button,
    Divider,
    InputAdornment,
    Link,
    Paper,
    TextField,
    Typography,
    IconButton,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import GoogleAuthButton from "../components/GoogleAuthButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import User from "../utils/User";
import AlertMessage from "../components/AlertMessage";

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();

    const mounted = useRef(false);

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = new User();

            await user.signUp(email, name, password);

            navigate("/dashboard");
        } catch (err) {
            console.error("Create user failed!");
            setError(true);
            setTimeout(() => setError(false), 3000);
        }
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
                    severity="error"
                    show={error}
                    message="Sign up failed!"
                />
                <Paper
                    elevation={3}
                    className="p-3 m-3"
                    sx={{ width: "100%", maxWidth: "500px" }}
                >
                    <Typography variant="h5" align="center" padding={1}>
                        Create a account
                    </Typography>
                    <form
                        className="flex flex-col gap-4 mt-4"
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        >
                            Create Account
                        </Button>
                    </form>
                    <div className="flex gap-2 justify-center my-2">
                        <Typography>Already have account?</Typography>
                        <Link component={RouterLink} to="/login">
                            Login
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

export default SignUpPage;
