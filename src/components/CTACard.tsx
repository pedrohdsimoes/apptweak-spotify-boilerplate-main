import React, { ReactNode } from "react";
import { Stack, Typography } from "@mui/material";

interface CTACardProps {
  title: string;
  description: string;
  content: ReactNode;
  button?: ReactNode;
  icon?: ReactNode;
}

const CTACard: React.FC<CTACardProps> = ({ title, description, content, button, icon }) => {
  return (
    <Stack
      bgcolor={"primary.main"}
      color={"primary.contrastText"}
      borderRadius={2}
      spacing={3}
      width={"100%"}
      alignItems="center"
      p={4}
    >
      <Stack spacing={3} maxWidth={700} width="100%">
        {icon && <div className="card-icon">{icon}</div>}
        <Typography variant="h4" component="h1" align="center">
          {title}
        </Typography>
        <Typography variant="body1" align="center">
          {description}
        </Typography>

        <div className="card-content">{content}</div>

        {button}
      </Stack>
    </Stack>
  );
};

export default CTACard;
