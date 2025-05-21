import * as React from "react";
import PlaylistFormModal from "../modals/PlaylistFormModal";

interface AddPlaylistButtonProps {
  buttonColor?: "primary" | "secondary" | "inherit";
}

const AddPlaylistButton: React.FC<AddPlaylistButtonProps> = ({ buttonColor = "primary" }) => {
  return <PlaylistFormModal mode="create" buttonVariant="contained" buttonColor={buttonColor} />;
};

export default AddPlaylistButton;
