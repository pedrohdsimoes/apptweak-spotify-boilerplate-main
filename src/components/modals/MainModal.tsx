import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

const defaultStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "380px",
  bgcolor: "background.paper",
  border: "2px solid primary.main",
  boxShadow: 24,
  p: 4,
  borderRadius: 8
};

export interface ModalAction {
  text: string;
  onClick: () => void;
  variant?: "text" | "contained" | "outlined";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  disabled?: boolean;
  loading?: boolean;
  loadingIndicator?: React.ReactNode;
}

interface MainModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content?: React.ReactNode;
  actions: ModalAction[];
  maxWidth?: string;
  sx?: Record<string, any>;
}

const MainModal: React.FC<MainModalProps> = ({
  open,
  onClose,
  title,
  content,
  actions,
  maxWidth = "380px",
  sx = {}
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Fade in={open}>
        <Box sx={{ ...defaultStyle, width: maxWidth, ...sx }}>
          <Stack spacing={2} direction="column" justifyContent="space-between">
            <Typography variant="h6" component="h2">
              {title}
            </Typography>

            {content && <Box sx={{ my: 2 }}>{content}</Box>}

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || "outlined"}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  color={action.color || "primary"}
                  startIcon={action.loading && action.loadingIndicator}
                >
                  {action.text}
                </Button>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default MainModal;
