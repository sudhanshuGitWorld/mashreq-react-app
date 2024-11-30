import React from 'react';
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Alert from "./Alert";
import { text } from '../constant/textConstants';

const AppSnackbar = ({ open, handleClose, error, isRegister }) => {
    const { errorText, successText, loginFailedMsg, loginSuccessMsg } = text;
    const vertical = "top";
    const horizontal = "right";

    const handleSnackbarClose = () => {
        handleClose();
    }

    const showMessage = () => {
        if (isRegister && error) return error;
        if (!isRegister && error) return loginFailedMsg;
        if (!error) return loginSuccessMsg;
    }

    const TransitionLeft = (props) => {
        return <Slide {...props} direction="left" />;
    };

    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => handleSnackbarClose()}
                TransitionComponent={TransitionLeft}
                anchorOrigin={{ vertical, horizontal }}
            >
                <Alert
                    onClose={() => handleSnackbarClose()}
                    severity={error ? errorText : successText} sx={{ width: "100%" }}
                >
                {showMessage()}
                </Alert>
            </Snackbar>
        </>
    );
}
 
export default AppSnackbar;
