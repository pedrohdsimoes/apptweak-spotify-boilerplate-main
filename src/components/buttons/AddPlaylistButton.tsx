import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { Stack, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

interface AddPlaylistButtonProps {}

const AddPlaylistButton: React.FC<AddPlaylistButtonProps> = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button variant="contained" onClick={handleOpen} endIcon={<AddIcon />}>
        Add New Playlist
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Stack spacing={2} direction="column" justifyContent="space-between">
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Add new playlist
              </Typography>
              <TextField label="Playlist Name" variant="outlined" required fullWidth />
              <TextField label="Playlist Description" multiline minRows={4} maxRows={4} fullWidth />
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleClose}>
                  Create
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AddPlaylistButton;
