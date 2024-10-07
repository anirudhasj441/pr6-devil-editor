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
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import GoogleAuthButton from "../components/GoogleAuthButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import User from "../utils/User";

const LoginPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    const handleLogin = async() => {
        const user = new User();
        const result = await user.login(email, password);
        if(result) {
            navigate('/');
        }
    }

    return (
        <>
            <div className="h-svh w-svw flex justify-center items-center">
                <Paper
                    elevation={3}
                    className="p-3 m-3"
                    sx={{ width: "100%", maxWidth: "500px" }}
                >
                    <Typography variant="h5" align="center" padding={1}>
                        Login
                    </Typography>
                    <form className="flex flex-col gap-4 mt-4" onSubmit={handleLogin}>
                        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                        >
                            Login
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

export default LoginPage;
