import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Alert, Box, CircularProgress, Stack, TextField } from "@mui/material";
import { createPlaylist, editPlaylist } from "../../containers/playlists/slice";
import { selectCreateStatus, selectEditStatus } from "../../containers/playlists/selectors";
import { RequestStatus } from "../../types/requests";
import MainModal, { ModalAction } from "./MainModal";
import ErrorMessage from "../ErrorMessage";

interface PlaylistFormModalProps {
  mode: "create" | "edit";
  playlist?: {
    id: string;
    name: string;
    description: string;
  };
  buttonVariant?: "text" | "outlined" | "contained";
  buttonColor?: "primary" | "secondary" | "inherit";
  buttonText?: string;
}

const PlaylistFormModal: React.FC<PlaylistFormModalProps> = ({
  mode,
  playlist,
  buttonVariant,
  buttonColor = "primary",
  buttonText
}) => {
  const dispatch = useDispatch();
  const createStatus = useSelector(selectCreateStatus);
  const editStatus = useSelector(selectEditStatus);

  const status = mode === "create" ? createStatus : editStatus;

  const [open, setOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // Set initial values when editing
  useEffect(() => {
    if (mode === "edit" && playlist && open) {
      setPlaylistName(playlist.name);
      setDescription(playlist.description || "");
    }
  }, [mode, playlist, open]);

  // Close the modal when operation is successful
  useEffect(() => {
    if (status === RequestStatus.SUCCESS) {
      handleClose();
    }
  }, [status]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    // Reset form
    setPlaylistName("");
    setDescription("");
    setError("");
  };

  const handleSubmit = () => {
    // Validate playlist name
    if (!playlistName.trim()) {
      setError("Playlist name is required");
      return;
    }

    if (mode === "create") {
      // Dispatch create playlist action
      dispatch(
        createPlaylist({
          name: playlistName.trim(),
          description: description.trim()
        })
      );
    } else if (mode === "edit" && playlist) {
      // Dispatch edit playlist action
      dispatch(
        editPlaylist({
          playlistId: playlist.id,
          name: playlistName.trim(),
          description: description.trim()
        })
      );
    }
  };

  const isLoading = status === RequestStatus.PENDING;
  const hasError = status === RequestStatus.ERROR;

  // Determine button text and icon based on mode
  const defaultButtonText = mode === "create" ? "Add New Playlist" : "Edit Playlist";
  const defaultTextVariant = mode === "create" ? "contained" : "outlined";
  const ButtonIcon = mode === "create" ? AddIcon : EditIcon;

  // Modal actions
  const modalActions: ModalAction[] = [
    {
      text: "Cancel",
      onClick: handleClose,
      disabled: isLoading,
      variant: "outlined"
    },
    {
      text: isLoading
        ? mode === "create"
          ? "Creating..."
          : "Updating..."
        : mode === "create"
          ? "Create"
          : "Update",
      onClick: handleSubmit,
      disabled: isLoading,
      color: "primary",
      variant: "contained",
      loading: isLoading,
      loadingIndicator: <CircularProgress size={20} />
    }
  ];

  // Modal content - the form fields
  const modalContent = (
    <Box>
      {hasError && <ErrorMessage />}
      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={2}>
        <TextField
          label="Playlist Name"
          variant="outlined"
          required
          fullWidth
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          error={!!error}
          disabled={isLoading}
        />

        <TextField
          label="Playlist Description"
          multiline
          minRows={4}
          maxRows={4}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          disabled={isLoading}
        />
      </Stack>
    </Box>
  );

  return (
    <>
      <Button
        color={buttonColor}
        variant={buttonVariant || defaultTextVariant}
        onClick={handleOpen}
        endIcon={<ButtonIcon />}
      >
        {buttonText || defaultButtonText}
      </Button>

      <MainModal
        open={open}
        onClose={handleClose}
        title={mode === "create" ? "Add new playlist" : "Edit playlist"}
        content={modalContent}
        actions={modalActions}
        maxWidth="70%"
      />
    </>
  );
};

export default PlaylistFormModal;
