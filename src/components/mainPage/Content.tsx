import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPlaylists,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetchPlaylistTracks,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSelectedPlaylist
} from "../../containers/playlists/slice";
import {
  selectPlaylists,
  selectSelectedPlaylist,
  selectTracksStatus
} from "../../containers/playlists/selectors";
import { RequestStatus } from "../../types/requests";
import { selectPlaylistsStatus } from "../../containers/playlists/selectors";
import WelcomeCard from "../cards/WelcomeCard";
import EmptyPlaylistCard from "../cards/EmptyPlaylistCard";
import PlaylistActions from "../playlists/PlaylistActions";
import TrackList from "../tracks/TrackList";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";

const Content: React.FC = () => {
  const dispatch = useDispatch();
  const playlists = useSelector(selectPlaylists);
  const selectedPlaylist = useSelector(selectSelectedPlaylist);
  const status = useSelector(selectPlaylistsStatus);
  const tracksStatus = useSelector(selectTracksStatus);

  useEffect(() => {
    // Fetch playlists when component mounts
    dispatch(fetchPlaylists());
  }, [dispatch]);

  // Auto-select first playlist when playlists load
  useEffect(() => {
    // !NOTE: uncoment to enable always select first playlist from the list
    // ! this is disabled to showcase how it looks when user does not have playlists or not one selected
    // if (playlists.length > 0 && !selectedPlaylist && status === RequestStatus.SUCCESS) {
    //   const firstPlaylistId = playlists[0].id;
    //   dispatch(setSelectedPlaylist(firstPlaylistId));
    //   dispatch(fetchPlaylistTracks({ playlistId: firstPlaylistId, reset: true }));
    // }
  }, [playlists, selectedPlaylist, status, dispatch]);

  return (
    <>
      {status === RequestStatus.PENDING && <Loading text="Loading playlists..." />}
      {status === RequestStatus.ERROR && <ErrorMessage message="Error loading playlists" />}
      {status === RequestStatus.SUCCESS && (
        <Stack spacing={2} width="100%">
          <PlaylistActions />
          <TrackList />

          {/* Show empty playlist message */}
          {selectedPlaylist &&
            selectedPlaylist.tracks &&
            selectedPlaylist.tracks.length === 0 &&
            tracksStatus === RequestStatus.SUCCESS && (
              <EmptyPlaylistCard playlistName={selectedPlaylist.name} />
            )}

          {/* Show welcome card if no playlist is selected */}
          {!selectedPlaylist && <WelcomeCard />}
        </Stack>
      )}
    </>
  );
};

export default Content;
