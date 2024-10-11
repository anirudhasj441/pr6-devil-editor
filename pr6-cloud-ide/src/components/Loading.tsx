import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const Loading: React.FC<{ open?: boolean }> = (props: { open?: boolean }) => {
    return (
        <>
            <Backdrop
                open={props.open ?? true}
                sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
            >
                <CircularProgress />
            </Backdrop>
        </>
    );
};

Loading.defaultProps = {
    open: true,
};

export default Loading;
