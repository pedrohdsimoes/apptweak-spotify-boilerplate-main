import React from "react";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import { selectSelectedPlaylist } from "../../containers/playlists/selectors";
import { useSelector } from "react-redux";

interface DeletePlaylistButtonProps {}

const DeletePlaylistButton: React.FC<DeletePlaylistButtonProps> = () => {
  const selectedPlaylist = useSelector(selectSelectedPlaylist);
  return (
    selectedPlaylist && (
      <DeleteConfirmationModal
        type="playlist"
        id={selectedPlaylist.id}
        name={selectedPlaylist.name}
        buttonVariant="outlined"
        buttonText="Delete Playlist"
      />
    )
  );
};

export default DeletePlaylistButton;
