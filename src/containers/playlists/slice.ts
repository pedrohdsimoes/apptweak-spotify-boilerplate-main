import { createAction, createSlice } from "@reduxjs/toolkit";
import { ErrorPayload, RequestStatus } from "../../types/requests";
export interface Track {
  id: string;
  cover: string;
  name: string;
  artist: string;
  album: string;
  releaseDate: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: Track[];
}

export interface PlaylistsState {
  playlists: Playlist[];
  status: RequestStatus;
  tracksStatus: RequestStatus;
  createStatus: RequestStatus;
  searchStatus: RequestStatus;
  deleteStatus: RequestStatus;
  searchResults: Track[];
  editStatus: RequestStatus;
  error?: string;
  selectedPlaylistId?: string;
  tracksPage: number;
  tracksHasMore: boolean;
  tracksTotal: number;
}

// Update the initial state
const initialState: PlaylistsState = {
  playlists: [],
  status: RequestStatus.IDLE,
  tracksStatus: RequestStatus.IDLE,
  createStatus: RequestStatus.IDLE,
  searchStatus: RequestStatus.IDLE,
  editStatus: RequestStatus.IDLE,
  deleteStatus: RequestStatus.IDLE,
  searchResults: [],
  tracksPage: 0,
  tracksHasMore: true,
  tracksTotal: 0
};

// Actions

// Fetch playlists
export const fetchPlaylists = createAction("playlists/fetch");
export const fetchPlaylistsSuccess = createAction<Playlist[]>("playlists/fetchSuccess");
export const fetchPlaylistsFailed = createAction<ErrorPayload>("playlists/fetchFailed");

// Set selected playlist
export const setSelectedPlaylist = createAction<string>("playlists/setSelected");

// Fetch playlist tracks
export const fetchPlaylistTracks = createAction<{ playlistId: string; reset?: boolean }>(
  "playlists/fetchTracks"
);
export const appendPlaylistTracksSuccess = createAction<{
  playlistId: string;
  tracks: Track[];
  total: number;
}>("playlists/appendTracksSuccess");
export const fetchPlaylistTracksFailed = createAction<ErrorPayload>("playlists/fetchTracksFailed");

// Create playlist
export const createPlaylist = createAction<{ name: string; description?: string }>(
  "playlists/create"
);
export const createPlaylistSuccess = createAction<Playlist>("playlists/createSuccess");
export const createPlaylistFailed = createAction<ErrorPayload>("playlists/createFailed");

// Delete playlist
export const deletePlaylist = createAction<string>("playlists/delete");
export const deletePlaylistSuccess = createAction<string>("playlists/deleteSuccess");
export const deletePlaylistFailed = createAction<ErrorPayload>("playlists/deleteFailed");

// Remove track from playlist
export const removeTrackFromPlaylist = createAction<{ playlistId: string; trackId: string }>(
  "playlists/removeTrack"
);
export const removeTrackSuccess = createAction<{ playlistId: string; trackId: string }>(
  "playlists/removeTrackSuccess"
);
export const removeTrackFailed = createAction<ErrorPayload>("playlists/removeTrackFailed");

// Add track to playlist
export const addTrackToPlaylist = createAction<{
  playlistId: string;
  trackId: string;
  trackDetails?: Track;
}>("playlists/addTrack");

export const addTrackSuccess = createAction<{
  playlistId: string;
  trackDetails: Track;
}>("playlists/addTrackSuccess");

export const addTrackFailed = createAction<ErrorPayload>("playlists/addTrackFailed");

// Search tracks
export const searchTracks = createAction<string>("playlists/searchTracks");
export const searchTracksSuccess = createAction<Track[]>("playlists/searchTracksSuccess");
export const searchTracksFailed = createAction<ErrorPayload>("playlists/searchTracksFailed");

// Edit playlist
export const editPlaylist = createAction<{
  playlistId: string;
  name: string;
  description?: string;
}>("playlists/edit");
export const editPlaylistSuccess = createAction<Playlist>("playlists/editSuccess");
export const editPlaylistFailed = createAction<ErrorPayload>("playlists/editFailed");

const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists, (state) => {
        state.status = RequestStatus.PENDING;
      })
      .addCase(fetchPlaylistsSuccess, (state, action) => {
        state.status = RequestStatus.SUCCESS;
        state.playlists = action.payload;
      })
      .addCase(fetchPlaylistsFailed, (state, action) => {
        state.status = RequestStatus.ERROR;
        state.error = action.payload.message;
      })
      .addCase(setSelectedPlaylist, (state, action) => {
        state.selectedPlaylistId = action.payload;
      })
      .addCase(fetchPlaylistTracks, (state, action) => {
        state.tracksStatus = RequestStatus.PENDING;
        // Reset pagination when explicitly requested or changing playlists
        if (action.payload.reset || state.selectedPlaylistId !== action.payload.playlistId) {
          state.tracksPage = 0;
          state.selectedPlaylistId = action.payload.playlistId;
        }
      })
      .addCase(appendPlaylistTracksSuccess, (state, action) => {
        state.tracksStatus = RequestStatus.SUCCESS;
        const { playlistId, tracks, total } = action.payload;

        // Find the playlist
        const playlist = state.playlists.find((p) => p.id === playlistId);
        if (playlist) {
          // If it's the first page, replace tracks; otherwise, append
          if (state.tracksPage === 0) {
            playlist.tracks = tracks;
          } else {
            // Filter out any duplicates before appending
            const newTracks = tracks.filter(
              (newTrack) =>
                !playlist.tracks.some((existingTrack) => existingTrack.id === newTrack.id)
            );
            playlist.tracks = [...playlist.tracks, ...newTracks];
          }
        }

        // Update pagination state
        state.tracksTotal = total;
        state.tracksPage = state.tracksPage + 1;
        state.tracksHasMore = playlist ? playlist.tracks.length < total : false;
      })
      .addCase(fetchPlaylistTracksFailed, (state, action) => {
        state.tracksStatus = RequestStatus.ERROR;
        state.error = action.payload.message;
      })
      // Handle create playlist actions
      .addCase(createPlaylist, (state) => {
        state.createStatus = RequestStatus.PENDING;
      })
      .addCase(createPlaylistSuccess, (state) => {
        state.createStatus = RequestStatus.SUCCESS;
      })
      .addCase(createPlaylistFailed, (state, action) => {
        state.createStatus = RequestStatus.ERROR;
        state.error = action.payload.message;
      })
      // Handle delete playlist actions
      .addCase(deletePlaylist, (state) => {
        state.status = RequestStatus.PENDING;
      })
      .addCase(deletePlaylistSuccess, (state, action) => {
        state.status = RequestStatus.SUCCESS;
        // Remove the playlist from the state
        state.playlists = state.playlists.filter((playlist) => playlist.id !== action.payload);
      })
      .addCase(deletePlaylistFailed, (state, action) => {
        state.status = RequestStatus.ERROR;
        state.error = action.payload.message;
      })
      // Handle remove track from playlist actions
      .addCase(removeTrackFromPlaylist, (state) => {
        state.tracksStatus = RequestStatus.PENDING;
      })
      .addCase(removeTrackSuccess, (state, action) => {
        state.tracksStatus = RequestStatus.SUCCESS;
        // Find the playlist and remove the track
        const playlist = state.playlists.find((p) => p.id === action.payload.playlistId);
        if (playlist) {
          playlist.tracks = playlist.tracks.filter(
            (track) => track.id.toString() !== action.payload.trackId
          );
        }
      })
      .addCase(removeTrackFailed, (state, action) => {
        state.tracksStatus = RequestStatus.ERROR;
        state.error = action.payload.message;
      })
      .addCase(addTrackToPlaylist, (state) => {
        // Set status to pending when adding a track
        state.tracksStatus = RequestStatus.PENDING;
      })
      .addCase(addTrackSuccess, (state, action) => {
        state.tracksStatus = RequestStatus.SUCCESS;
        const { playlistId, trackDetails } = action.payload;

        // Find the playlist and add the track
        const playlist = state.playlists.find((p) => p.id === playlistId);
        if (playlist) {
          // Add track to playlist if not already there
          if (!playlist.tracks.some((track) => track.id === trackDetails.id)) {
            playlist.tracks.push(trackDetails);
          }
        }
      })
      .addCase(addTrackFailed, (state, action) => {
        state.tracksStatus = RequestStatus.ERROR;
        state.error = action.payload.message;
      })
      // Search Tracks
      .addCase(searchTracks, (state) => {
        state.searchStatus = RequestStatus.PENDING;
      })
      .addCase(searchTracksSuccess, (state, action) => {
        state.searchStatus = RequestStatus.SUCCESS;
        state.searchResults = action.payload;
      })
      .addCase(searchTracksFailed, (state, action) => {
        state.searchStatus = RequestStatus.ERROR;
        state.error = action.payload.message;
      })
      .addCase(editPlaylist, (state) => {
        state.editStatus = RequestStatus.PENDING;
      })
      .addCase(editPlaylistSuccess, (state, action) => {
        state.editStatus = RequestStatus.SUCCESS;

        // Find and update the edited playlist in the array
        const index = state.playlists.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.playlists[index] = {
            ...state.playlists[index],
            name: action.payload.name,
            description: action.payload.description
          };
        }
      })
      .addCase(editPlaylistFailed, (state, action) => {
        state.editStatus = RequestStatus.ERROR;
        state.error = action.payload.message;
      });
  }
});

export default playlistsSlice.reducer;
