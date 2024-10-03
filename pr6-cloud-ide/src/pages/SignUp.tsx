import { Button, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const SignUpPage: React.FC = () => {
    return (
        <>
            <div className="h-svh w-svw flex justify-center items-center">
                <div className="w-0 md:w-[60%] invisible md:visible flex justify-center items-center">
                    <img src="/images/main_logo6.png" alt="" />
                </div>
                <div className=" h-full flex flex-grow justify-center items-center bg-[#000000] relative">
                    <img
                        src="/images/icon_fill_circle.png"
                        className="md:invisible visible absolute top-0 left-0 m-5 w-20"
                        alt=""
                    />
                    <div className="form-container w-[300px] max-w-full flex flex-col gap-8">
                        <div className="text-4xl text-center">
                            Create an account
                        </div>
                        <div className="w-full">
                            <TextField
                                id="email"
                                label="Email address*"
                                variant="outlined"
                                type="email"
                                className="w-full"
                            />
                        </div>
                        <div className="w-full">
                            <Button
                                variant="contained"
                                className="w-full"
                                sx={{
                                    paddingY: 1.5,
                                    backgroundColor: "#272822",
                                    color: "white",
                                    ":hover": {
                                        backgroundColor: "#75715e",
                                    },
                                }}
                            >
                                Continue
                            </Button>
                        </div>
                        <div className="text-center">
                            Already have an account?{" "}
                            <Link to={"/"} className="text-purple-900 ms-2">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUpPage;
