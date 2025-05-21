import React from "react";
import { Grid, Typography, Tooltip, Box, Stack } from "@mui/material";
import { Track } from "../../containers/playlists/slice";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import MainTrackDetails from "../tracks/MainTrackDetails";

interface TrackCardProps {
  track: Track;
}

const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        borderRadius: 2,
        p: 2,
        width: "100%",
        position: "relative"
      }}
    >
      <Grid container spacing={5} alignItems="center">
        <Grid size={{ xs: 10, sm: 4, md: 5 }}>
          <MainTrackDetails track={track} />
        </Grid>

        {/* Album Name */}
        <Grid size={{ xs: 4, sm: 4, md: 4 }} sx={{ display: { xs: "none", sm: "block" } }}>
          <Tooltip title={track.album} placement="top">
            <Typography
              variant="body2"
              sx={{
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {track.album}
            </Typography>
          </Tooltip>
        </Grid>

        {/* Release Date */}
        <Grid size={{ xs: 1, sm: 2, md: 2 }} sx={{ display: { xs: "none", sm: "block" } }}>
          <Typography variant="body2" style={{ whiteSpace: "nowrap" }}>
            {track.releaseDate}
          </Typography>
        </Grid>
        <Stack style={{ position: "absolute", right: 10 }}>
          <DeleteConfirmationModal type="track" id={track.id} name={track.name} track={track} />
        </Stack>
      </Grid>
    </Box>
  );
};

export default TrackCard;
