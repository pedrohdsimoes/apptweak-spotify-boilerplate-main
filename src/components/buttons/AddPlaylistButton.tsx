import * as React from "react";
import PlaylistFormModal from "../modals/PlaylistFormModal";

interface AddPlaylistButtonProps {}

const AddPlaylistButton: React.FC<AddPlaylistButtonProps> = () => {
  return <PlaylistFormModal mode="create" buttonVariant="contained" />;
};

export default AddPlaylistButton;
