import React from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import TrackCard from "./TrackCard";
interface ContentProps {}

const mockPlaylists = [
  {
    id: 1,
    name: "Playlist 1",
    description: "Description 1",
    tracks: [
      {
        id: 1,
        cover: "https://placehold.co/600x400.png",
        name: "Music 1",
        artist: "Artist 1",
        album: "Album 1",
        releaseDate: "2023-01-01"
      },
      {
        id: 2,
        cover: "https://placehold.co/600x400.png",
        name: "Music 2",
        artist: "Artist 2",
        album: "Album 2",
        releaseDate: "2023-01-02"
      }
    ]
  },
  {
    id: 2,
    name: "Playlist 2",
    description: "Description 2",
    tracks: [
      {
        id: 3,
        cover: "https://placehold.co/600x400.png",
        name: "Music 3",
        artist: "Artist 3",
        album: "Album 3",
        releaseDate: "2023-01-03"
      },
      {
        id: 4,
        cover: "https://placehold.co/600x400.png",
        name: "Music 4",
        artist: "Artist 4",
        album: "Album 4",
        releaseDate: "2023-01-04"
      }
    ]
  }
];

const Content: React.FC<ContentProps> = () => {
  const [selectedPlaylist, setSelectedPlaylist] = React.useState<(typeof mockPlaylists)[0]>(
    mockPlaylists[0]
  );

  const handlePlaylistClick = (event: SelectChangeEvent) => {
    const value = event.target.value;
    const playlist = mockPlaylists.find((playlist) => playlist.id.toString() === value);
    setSelectedPlaylist(playlist || mockPlaylists[0]);
  };

  return (
    <Stack spacing={2} width="100%">
      <Stack direction={"row"} spacing={2} width="100%" alignItems="center">
        <FormControl>
          <InputLabel>Playlist</InputLabel>
          <Select
            value={selectedPlaylist ? selectedPlaylist.id.toString() : ""}
            label="Select Playlist"
            onChange={handlePlaylistClick}
          >
            {mockPlaylists.map((playlist) => (
              <MenuItem key={playlist.id} value={playlist.id.toString()}>
                {playlist.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <p>{selectedPlaylist?.description}</p>
      </Stack>

      {selectedPlaylist?.tracks.map((track) => <TrackCard key={track.id} track={track} />)}
    </Stack>
  );
};

export default Content;
