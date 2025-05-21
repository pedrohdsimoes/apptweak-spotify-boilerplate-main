import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  removeTrackFromPlaylist,
  addTrackToPlaylist,
  deletePlaylist,
  Track
} from "../../containers/playlists/slice";
import { selectSelectedPlaylist } from "../../containers/playlists/selectors";
import { toast } from "react-toastify";
import Loading from "../Loading";
import MainModal from "./MainModal";
import { Stack, Typography } from "@mui/material";

interface DeleteConfirmationModalProps {
  type: "track" | "playlist";
  id: string;
  name: string;
  track?: Track;
  buttonVariant?: "icon" | "text" | "outlined" | "contained";
  buttonText?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  type,
  id,
  name,
  track,
  buttonVariant = "icon",
  buttonText
}) => {
  const dispatch = useDispatch();
  const selectedPlaylist = useSelector(selectSelectedPlaylist);

  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsDeleting(false);
  };

  const handleDelete = () => {
    setIsDeleting(true);

    // Close modal immediately
    handleClose();

    if (type === "track") {
      // Track deletion
      const currentPlaylistId = selectedPlaylist ? selectedPlaylist.id : "";

      if (!currentPlaylistId) {
        toast.error("Playlist ID not available");
        return;
      }

      // Keep a local copy of the track for undo
      const trackToRestore = track;

      // Dispatch action to remove track
      dispatch(
        removeTrackFromPlaylist({
          playlistId: currentPlaylistId,
          trackId: id
        })
      );

      // Show toast notification with undo button for tracks
      const toastId = toast.success(
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography>Removed "{name}" from playlist</Typography>
          {trackToRestore && (
            <Button
              onClick={() => {
                dispatch(
                  addTrackToPlaylist({
                    playlistId: currentPlaylistId,
                    trackId: id,
                    trackDetails: trackToRestore
                  })
                );
                toast.dismiss(toastId);
                toast.success(`Restored "${name}" to playlist`);
              }}
              color="primary"
              size="small"
              sx={{ ml: 2 }}
            >
              UNDO
            </Button>
          )}
        </Stack>
      );
    } else if (type === "playlist") {
      // Playlist deletion
      dispatch(deletePlaylist(id));

      toast.success(`Playlist "${name}" deleted successfully`);
    }
  };

  // Determine confirmation message based on type
  const confirmationMessage =
    type === "track"
      ? `Are you sure you want to remove "${name}" from this playlist?`
      : `Are you sure you want to delete the playlist "${name}"?`;

  const renderButton = () => {
    if (buttonVariant === "icon") {
      return (
        <IconButton onClick={handleOpen}>
          <DeleteIcon />
        </IconButton>
      );
    }

    return (
      <Button variant={buttonVariant} onClick={handleOpen} color="error" endIcon={<DeleteIcon />}>
        {buttonText || (type === "track" ? "Remove" : "Delete Playlist")}
      </Button>
    );
  };

  // Define modal actions for MainModal
  const modalActions = [
    {
      text: "Cancel",
      onClick: handleClose,
      variant: "outlined" as const,
      disabled: isDeleting
    },
    {
      text: isDeleting ? "Deleting..." : "Yes, delete",
      onClick: handleDelete,
      variant: "contained" as const,
      color: "error" as const,
      disabled: isDeleting,
      loading: isDeleting,
      loadingIndicator: <Loading size={20} />
    }
  ];

  return (
    <>
      {renderButton()}
      <MainModal
        open={open}
        onClose={handleClose}
        title={confirmationMessage}
        actions={modalActions}
        maxWidth="380px"
      />
    </>
  );
};

export default DeleteConfirmationModal;
