import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const selectSelf = (state: RootState) => state.playlists;
// Playlists
export const selectPlaylists = createSelector(selectSelf, (playlists) => playlists.playlists);
// Playlist Status
export const selectPlaylistsStatus = createSelector(selectSelf, (playlists) => playlists.status);
// Selected Playlist ID
export const selectSelectedPlaylistId = createSelector(
  selectSelf,
  (playlists) => playlists.selectedPlaylistId
);
// Selected playlist
export const selectSelectedPlaylist = createSelector(
  [selectPlaylists, selectSelectedPlaylistId],
  (playlists, id) => playlists.find((playlist) => playlist.id === id)
);
// Tracks Status
export const selectTracksStatus = createSelector(selectSelf, (playlists) => playlists.tracksStatus);
// Create Playlist Status
export const selectCreateStatus = createSelector(selectSelf, (playlists) => playlists.createStatus);
// Search Results
export const selectSearchResults = createSelector(
  selectSelf,
  (playlists) => playlists.searchResults
);
// Search Status
export const selectSearchStatus = createSelector(selectSelf, (playlists) => playlists.searchStatus);
// Edit Playlist Status
export const selectEditStatus = createSelector(selectSelf, (playlists) => playlists.editStatus);
// Delete Playlist Status
export const selectDeleteStatus = createSelector(selectSelf, (playlists) => playlists.deleteStatus);
// Track infininite scroll
export const selectTracksHasMore = createSelector(
  selectSelf,
  (playlists) => playlists.tracksHasMore
);
export const selectTracksTotal = createSelector(selectSelf, (playlists) => playlists.tracksTotal);
export const selectTracksPage = createSelector(selectSelf, (playlists) => playlists.tracksPage);
