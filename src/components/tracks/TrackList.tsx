import { Typography, Stack } from "@mui/material";
import React, { useCallback } from "react";
import TrackCard from "../cards/TrackCard";
import InfiniteLoader from "../infiniteScroll/InfiniteLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedPlaylist,
  selectTracksHasMore,
  selectTracksStatus,
  selectTracksTotal
} from "../../containers/playlists/selectors";
import { fetchPlaylistTracks } from "../../containers/playlists/slice";
import { RequestStatus } from "../../types/requests";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";

interface TrackListProps {}

const TrackList: React.FC<TrackListProps> = () => {
  const dispatch = useDispatch();
  const selectedPlaylist = useSelector(selectSelectedPlaylist);
  const tracksStatus = useSelector(selectTracksStatus);
  const hasMoreTracks = useSelector(selectTracksHasMore);
  const tracksTotal = useSelector(selectTracksTotal);

  const loadMoreTracks = useCallback(() => {
    if (selectedPlaylist && hasMoreTracks && tracksStatus !== RequestStatus.PENDING) {
      dispatch(fetchPlaylistTracks({ playlistId: selectedPlaylist.id }));
    }
  }, [dispatch, selectedPlaylist, hasMoreTracks, tracksStatus]);

  const isLoadingInitially =
    tracksStatus === RequestStatus.PENDING &&
    (!selectedPlaylist?.tracks || selectedPlaylist.tracks.length === 0);

  const isLoadingMore =
    tracksStatus === RequestStatus.PENDING &&
    selectedPlaylist?.tracks &&
    selectedPlaylist.tracks.length > 0;

  return (
    <>
      {isLoadingInitially && <Loading />}
      {tracksStatus === RequestStatus.ERROR && <ErrorMessage message="Error loading tracks" />}
      {selectedPlaylist && selectedPlaylist.tracks && selectedPlaylist.tracks.length > 0 && (
        <>
          <Typography variant="subtitle1" textAlign={"left"} fontWeight="bold">
            Showing {selectedPlaylist.tracks.length} of {tracksTotal} tracks
          </Typography>
          <Stack spacing={1} width="100%">
            {selectedPlaylist.tracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
            <InfiniteLoader
              onVisible={loadMoreTracks}
              isLoading={isLoadingMore as boolean}
              hasMore={hasMoreTracks}
            />
          </Stack>
        </>
      )}
    </>
  );
};

export default TrackList;
