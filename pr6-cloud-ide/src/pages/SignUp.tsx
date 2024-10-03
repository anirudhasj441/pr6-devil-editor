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
import { Link as RouterLink } from "react-router-dom";
import GoogleAuthButton from "../components/GoogleAuthButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignUpPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <>
            <div className="h-svh w-svw flex justify-center items-center">
                <Paper
                    elevation={3}
                    className="p-3 m-3"
                    sx={{ width: "100%", maxWidth: "500px" }}
                >
                    <Typography variant="h5" align="center" padding={1}>
                        Create a account
                    </Typography>
                    <form className="flex flex-col gap-4 mt-4">
                        <TextField label="Email" type="email" />
                        <TextField label="Name" />
                        <TextField
                            label="Password"
                            type={showPassword ? "text" : "password"}
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
                            Create Account
                        </Button>
                    </form>
                    <div className="flex gap-2 justify-center my-2">
                        <Typography>Already have account?</Typography>
                        <Link component={RouterLink} to="/">
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
