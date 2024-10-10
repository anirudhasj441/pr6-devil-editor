import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const Loading: React.FC<{ open?: boolean }> = (props: { open?: boolean }) => {
    return (
        <>
            <Backdrop open={props.open ?? true}>
                <CircularProgress />
            </Backdrop>
        </>
    );
};

Loading.defaultProps = {
    open: true,
};

export default Loading;
