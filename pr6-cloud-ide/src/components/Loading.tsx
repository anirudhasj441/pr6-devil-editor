import { Backdrop, Typography } from "@mui/material";
import React from "react";

const Loading: React.FC<{ open?: boolean }> = (props: { open?: boolean }) => {
    return (
        <>
            <Backdrop
                open={props.open ?? true}
                sx={(theme) => ({
                    zIndex: theme.zIndex.drawer + 1,
                    background: theme.palette.background.default,
                })}
            >
                <div>
                    <div className="text-start relative">
                        <Typography
                            variant="h4"
                            color={"red"}
                            fontWeight={"bolder"}
                            sx={{
                                transform: "translateX(-50%)",
                                width: "max-content",
                            }}
                        >
                            {"<Devil>"}
                        </Typography>
                    </div>
                    <div className="text-center relative">
                        <Typography variant="h4" fontWeight={"bolder"}>
                            LOADING...
                        </Typography>
                    </div>
                    <div className="text-end relative bg-red-500">
                        <Typography
                            variant="h4"
                            fontWeight={"bolder"}
                            color={"red"}
                            sx={{
                                position: "absolute",
                                right: "0",
                                top: "0",
                                transform: "translateX(50%)",
                                width: "max-content",
                            }}
                        >
                            {"</Devil>"}
                        </Typography>
                    </div>
                </div>
            </Backdrop>
        </>
    );
};

Loading.defaultProps = {
    open: true,
};

export default Loading;
