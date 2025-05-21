import { Stack, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface LoadingProps {
  text?: string;
  size?: number;
}

const Loading: React.FC<LoadingProps> = ({ text = "", size = 30 }) => {
  return (
    <Stack alignItems="center" padding={4}>
      <CircularProgress size={size} />
      {text && (
        <Typography variant="subtitle1" textAlign={"center"} fontWeight="bold">
          {text}
        </Typography>
      )}
    </Stack>
  );
};

export default Loading;
