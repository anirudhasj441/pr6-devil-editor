import React from "react";
import {
    Zoom,
    Alert,
    AlertColor,
    AlertPropsColorOverrides,
} from "@mui/material";

import { OverridableStringUnion } from "@mui/types";

interface IAlertMessageProps {
    show: boolean;
    message: string;
    severity:
        | OverridableStringUnion<AlertColor, AlertPropsColorOverrides>
        | undefined;
}

const AlertMessage: React.FC<IAlertMessageProps> = (
    props: IAlertMessageProps
) => {
    return (
        <>
            <Zoom in={props.show} className="w-full fixed top-5">
                <Alert
                    severity={props.severity}
                    variant="filled"
                    sx={{
                        width: "500px",
                        maxWidth: "100%",
                    }}
                >
                    {props.message}
                </Alert>
            </Zoom>
        </>
    );
};

export default AlertMessage;
