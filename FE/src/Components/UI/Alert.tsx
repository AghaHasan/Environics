import React from "react";
import Alert from "@mui/material/Alert";

interface AlertBarProps {
  severity: "success" | "info" | "warning" | "error";
  message: string;
}

export default function AlertBar({ severity, message }: AlertBarProps) {
  return (
    <div style={{ margin: "10px" }}>
      <Alert severity={severity}>{message}</Alert>
    </div>
  );
}
