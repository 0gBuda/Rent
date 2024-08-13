import React from "react";

const ErrorMessage = ({ message }) => {
    return (
        <p className="has-text-weight-bold has-text-danger">{typeof message === 'string' ? message : null}</p>
    );
}
export default ErrorMessage;
