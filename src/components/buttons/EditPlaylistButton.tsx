import React from "react";
import PlaylistFormModal from "../modals/PlaylistFormModal";
import { useSelector } from "react-redux";
import { selectSelectedPlaylist } from "../../containers/playlists/selectors";

interface EditPlaylistButtonProps {}

const EditPlaylistButton: React.FC<EditPlaylistButtonProps> = () => {
  const selectedPlaylist = useSelector(selectSelectedPlaylist);

  return (
    selectedPlaylist && (
      <PlaylistFormModal mode="edit" playlist={selectedPlaylist} buttonVariant="outlined" />
    )
  );
};

export default EditPlaylistButton;
