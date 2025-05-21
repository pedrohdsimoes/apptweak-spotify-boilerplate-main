import { Stack, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import React from "react";
import DeletePlaylistButton from "../buttons/DeletePlaylistButton";
import EditPlaylistButton from "../buttons/EditPlaylistButton";
import { selectPlaylists, selectSelectedPlaylist } from "../../containers/playlists/selectors";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPlaylist, fetchPlaylistTracks } from "../../containers/playlists/slice";
import useMobile from "../../hooks/useMobile";

interface PlaylistActionsProps {}

const PlaylistActions: React.FC<PlaylistActionsProps> = () => {
  const { isMobile } = useMobile();
  const dispatch = useDispatch();
  const playlists = useSelector(selectPlaylists);
  const selectedPlaylist = useSelector(selectSelectedPlaylist);

  const handlePlaylistClick = (event: SelectChangeEvent) => {
    const value = event.target.value;
    dispatch(setSelectedPlaylist(value));
    // Reset and fetch tracks for this playlist
    dispatch(fetchPlaylistTracks({ playlistId: value, reset: true }));
  };

  return (
    <Stack alignItems={"flex-start"}>
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={2}
        width="100%"
        alignItems="center"
        justifyContent={"space-between"}
      >
        <FormControl>
          <InputLabel>Playlist</InputLabel>
          <Select
            value={selectedPlaylist ? selectedPlaylist.id : ""}
            label="Select Playlist"
            onChange={handlePlaylistClick}
            style={{ minWidth: 200 }}
          >
            {playlists.map((playlist) => (
              <MenuItem key={playlist.id} value={playlist.id}>
                {playlist.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedPlaylist && (
          <Stack direction={"row"} spacing={2} alignItems="center">
            <EditPlaylistButton />
            <DeletePlaylistButton />
          </Stack>
        )}
      </Stack>
      <p>{selectedPlaylist?.description}</p>
    </Stack>
  );
};

export default PlaylistActions;
