import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { addTrackToPlaylist, Track } from "../../containers/playlists/slice";
import { selectSelectedPlaylist } from "../../containers/playlists/selectors";
import { toast } from "react-toastify";

interface SearchResultCardProps {
  track: Track;
  onClick: () => void;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ track, onClick }) => {
  const dispatch = useDispatch();
  const selectedPlaylist = useSelector(selectSelectedPlaylist);

  const handleAddToPlaylist = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (!selectedPlaylist) {
      toast.warning("Please select a playlist first");
      return;
    }

    dispatch(
      addTrackToPlaylist({
        playlistId: selectedPlaylist.id,
        trackId: track.id
      })
    );

    toast.success(`Added "${track.name}" to playlist "${selectedPlaylist.name}"`);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      width="100%"
      onClick={onClick}
      sx={{ cursor: "pointer" }}
    >
      <Box sx={{ width: 40, height: 40, flexShrink: 0 }}>
        <img
          src={track.cover}
          alt={track.name}
          width="100%"
          height="100%"
          style={{ borderRadius: 4, objectFit: "cover" }}
        />
      </Box>
      <Stack direction="column" sx={{ flex: 1, minWidth: 0 }}>
        <Typography noWrap variant="body1">
          {track.name}
        </Typography>
        <Typography noWrap variant="body2" color="text.secondary">
          {track.artist}
        </Typography>
      </Stack>
      <Button
        size="small"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleAddToPlaylist}
        sx={{ flexShrink: 0 }}
      >
        Add
      </Button>
    </Stack>
  );
};

export default SearchResultCard;
