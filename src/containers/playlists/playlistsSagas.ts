import axios from "axios";
import { call, put, select, takeEvery, takeLatest } from "@redux-saga/core/effects";
import {
  addTrackFailed,
  addTrackSuccess,
  addTrackToPlaylist,
  appendPlaylistTracksSuccess,
  createPlaylist,
  createPlaylistFailed,
  createPlaylistSuccess,
  deletePlaylist,
  deletePlaylistFailed,
  deletePlaylistSuccess,
  editPlaylist,
  editPlaylistFailed,
  editPlaylistSuccess,
  fetchPlaylists,
  fetchPlaylistsFailed,
  fetchPlaylistsSuccess,
  fetchPlaylistTracks,
  fetchPlaylistTracksFailed,
  Playlist,
  removeTrackFailed,
  removeTrackFromPlaylist,
  removeTrackSuccess,
  searchTracks,
  searchTracksFailed,
  searchTracksSuccess,
  Track
} from "./slice";
import { selectAccessToken, selectUser } from "../auth/selectors";
import { toast } from "react-toastify";
import { selectSelectedPlaylist } from "./selectors";

const NUMBER_OF_TRACKS_DISPLAYED = 20;

function* fetchPlaylistsSaga() {
  try {
    const accessToken: string = yield select(selectAccessToken);
    const user: { userId?: string } = yield select(selectUser);

    if (!accessToken) {
      yield put(fetchPlaylistsFailed({ message: "No access token" }));
      return;
    }

    if (!user || !user.userId) {
      yield put(fetchPlaylistsFailed({ message: "User information not available" }));
      return;
    }

    const request = () =>
      axios.get("https://api.spotify.com/v1/me/playlists", {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

    const { data } = yield call(request);

    // Filter playlists to only include those owned by the current user
    const ownedPlaylists = data.items.filter(
      (item: any) => item.owner && item.owner.id === user.userId
    );

    // Transform the data to match our expected format
    const playlists = ownedPlaylists.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description || ""
    }));

    // Dispatch success action
    yield put(fetchPlaylistsSuccess(playlists));
  } catch (error: any) {
    // Dispatch failure action
    yield put(fetchPlaylistsFailed({ message: error.message }));
  }
}

function* fetchPlaylistTracksSaga(action: ReturnType<typeof fetchPlaylistTracks>) {
  try {
    const { playlistId, reset } = action.payload;
    const accessToken: string = yield select(selectAccessToken);

    if (!accessToken) {
      yield put(fetchPlaylistTracksFailed({ message: "No access token" }));
      return;
    }

    // Get current page from state (0 if reset)
    const currentPage: number = reset ? 0 : yield select((state) => state.playlists.tracksPage);
    const limit = NUMBER_OF_TRACKS_DISPLAYED;
    const offset = currentPage * limit;

    // Make API call with pagination params
    const request = () =>
      axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        params: {
          limit,
          offset
        },
        headers: { Authorization: `Bearer ${accessToken}` }
      });

    const { data } = yield call(request);

    // Transform the data to match our Track Card needs
    const tracks = data.items.map((item: any) => ({
      id: item.track.id,
      name: item.track.name,
      artist: item.track.artists.map((artist: any) => artist.name).join(", "),
      album: item.track.album.name,
      releaseDate: item.track.album.release_date,
      cover: item.track.album.images[0]?.url || ""
    }));

    yield put(
      appendPlaylistTracksSuccess({
        playlistId,
        tracks,
        total: data.total
      })
    );
  } catch (error: any) {
    yield put(fetchPlaylistTracksFailed({ message: error.message }));
  }
}

function* createPlaylistSaga(action: ReturnType<typeof createPlaylist>) {
  try {
    const { name, description } = action.payload;
    const accessToken: string = yield select(selectAccessToken);
    const user: { userId?: string } = yield select(selectUser);

    if (!accessToken) {
      yield put(createPlaylistFailed({ message: "No access token" }));
      return;
    }

    if (!user || !user.userId) {
      yield put(createPlaylistFailed({ message: "User information not available" }));
      return;
    }

    const request = () =>
      axios.post(
        `https://api.spotify.com/v1/users/${user.userId}/playlists`,
        {
          name,
          description: description || "",
          public: false
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );

    const { data } = yield call(request);

    const newPlaylist = {
      id: data.id,
      name: data.name,
      description: data.description || "",
      tracks: []
    };

    yield put(createPlaylistSuccess(newPlaylist));

    // Refresh the list of playlists
    yield put(fetchPlaylists());
  } catch (error: any) {
    console.error("Error creating playlist:", error);
    yield put(
      createPlaylistFailed({
        message: error.response?.data?.error?.message || error.message
      })
    );
  }
}

function* removeTrackSaga(action: ReturnType<typeof removeTrackFromPlaylist>) {
  try {
    const { playlistId, trackId } = action.payload;
    const accessToken: string = yield select(selectAccessToken);

    if (!accessToken) {
      yield put(removeTrackFailed({ message: "No access token" }));
      return;
    }

    // Make the API call to remove the track from the playlist
    const request = () =>
      axios.delete(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        data: {
          tracks: [{ uri: `spotify:track:${trackId}` }]
        }
      });

    yield call(request);

    // Dispatch success action
    yield put(removeTrackSuccess({ playlistId, trackId }));
  } catch (error: any) {
    console.error("Error removing track:", error);
    yield put(
      removeTrackFailed({
        message: error.response?.data?.error?.message || error.message
      })
    );
  }
}

function* addTrackToPlaylistSaga(action: ReturnType<typeof addTrackToPlaylist>) {
  try {
    const { playlistId, trackId, trackDetails } = action.payload;
    const accessToken: string = yield select(selectAccessToken);

    if (!accessToken) {
      yield put(addTrackFailed({ message: "No access token" }));
      return;
    }

    const request = () =>
      axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        { uris: [`spotify:track:${trackId}`] },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );

    yield call(request);

    // If we have track details (from undo operation), use them
    // Otherwise, we need to fetch the track details from the API
    let track: Track;

    if (trackDetails) {
      track = trackDetails;
    } else {
      // Fetch track details if not provided
      const trackRequest = () =>
        axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });

      const { data } = yield call(trackRequest);

      track = {
        id: trackId,
        name: data.name,
        artist: data.artists.map((a: any) => a.name).join(", "),
        album: data.album.name,
        releaseDate: data.album.release_date,
        cover: data.album.images[0]?.url || ""
      };
    }

    yield put(addTrackSuccess({ playlistId, trackDetails: track }));
  } catch (error: any) {
    console.error("Error adding track:", error);
    yield put(
      addTrackFailed({
        message: error.response?.data?.error?.message || error.message
      })
    );
  }
}

function* searchTracksSaga(action: ReturnType<typeof searchTracks>) {
  try {
    const query = action.payload;
    if (!query || query.trim() === "") {
      yield put(searchTracksSuccess([]));
      return;
    }

    const accessToken: string = yield select(selectAccessToken);
    if (!accessToken) {
      yield put(searchTracksFailed({ message: "No access token" }));
      return;
    }

    const request = () =>
      axios.get(`https://api.spotify.com/v1/search`, {
        params: {
          q: query,
          type: "track",
          limit: 10
        },
        headers: { Authorization: `Bearer ${accessToken}` }
      });

    const { data } = yield call(request);

    const tracks = data.tracks.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      artist: item.artists.map((artist: any) => artist.name).join(", "),
      album: item.album.name,
      releaseDate: item.album.release_date,
      cover: item.album.images[0]?.url || ""
    }));

    yield put(searchTracksSuccess(tracks));
  } catch (error: any) {
    console.error("Error searching tracks:", error);
    yield put(searchTracksFailed({ message: error.message }));
  }
}
function* editPlaylistSaga(action: ReturnType<typeof editPlaylist>) {
  try {
    const { name, description } = action.payload;
    const accessToken: string = yield select(selectAccessToken);
    const selectedPlaylist: Playlist = yield select(selectSelectedPlaylist);

    const request = () => {
      return axios.put(
        `https://api.spotify.com/v1/playlists/${selectedPlaylist.id}`,
        {
          name: action.payload.name,
          description: action.payload.description
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );
    };

    let { data } = yield call(request);
    data = {
      ...selectedPlaylist,
      name,
      description: description || ""
    };

    yield put(editPlaylistSuccess(data));
    toast.success("Playlist updated successfully!");
  } catch (error: any) {
    yield put(editPlaylistFailed({ message: error.message }));
    toast.error("Failed to update playlist");
  }
}

function* deletePlaylistSaga(action: ReturnType<typeof deletePlaylist>) {
  try {
    const playlistId = action.payload;
    const accessToken: string = yield select(selectAccessToken);

    if (!accessToken) {
      yield put(deletePlaylistFailed({ message: "No access token" }));
      return;
    }

    const request = () =>
      axios.delete(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

    yield call(request);

    yield put(deletePlaylistSuccess(playlistId));
  } catch (error: any) {
    console.error("Error deleting playlist:", error);
    yield put(
      deletePlaylistFailed({
        message: error.response?.data?.error?.message || error.message
      })
    );

    toast.error("Failed to delete playlist");
  }
}

export default function* playlistsSaga() {
  yield takeEvery(fetchPlaylists.type, fetchPlaylistsSaga);
  yield takeLatest(fetchPlaylistTracks.type, fetchPlaylistTracksSaga);
  yield takeLatest(createPlaylist.type, createPlaylistSaga);
  yield takeLatest(removeTrackFromPlaylist.type, removeTrackSaga);
  yield takeLatest(addTrackToPlaylist.type, addTrackToPlaylistSaga);
  yield takeLatest(searchTracks.type, searchTracksSaga);
  yield takeLatest(editPlaylist.type, editPlaylistSaga);
  yield takeLatest(deletePlaylist.type, deletePlaylistSaga);
}
