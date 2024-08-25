import { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const AutoDismissToast = (props) => {
    const { message, showToast, setIsSignUpToast } = props;
    useEffect(() => {
        let timerid = setTimeout(() => {
            setIsSignUpToast(false);
        }, 1000);

        return () => {
            clearTimeout(timerid)
        }
    }, [])
    return (
        <ToastContainer position="top-end" className="p-3">
            <Toast show={showToast} onClose={() => setIsSignUpToast(false)}>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default AutoDismissToast;