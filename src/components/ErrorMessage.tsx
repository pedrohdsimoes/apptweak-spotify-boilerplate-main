import { Alert } from "@mui/material";
import React from "react";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message = "" }) => {
  return (
    <Alert severity="error" sx={{ mb: 2 }}>
      {message || "An error occurred. Please try again."}
    </Alert>
  );
};

export default ErrorMessage;
