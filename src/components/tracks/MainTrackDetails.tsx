import { Stack, Tooltip, Typography, Box } from "@mui/material";
import React from "react";
import { Track } from "../../containers/playlists/slice";

interface MainTrackDetailsProps {
  track: Track;
}

const MainTrackDetails: React.FC<MainTrackDetailsProps> = ({ track }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5} width="100%">
      <Box sx={{ flexShrink: 0 }}>
        <img
          src={track.cover}
          alt={track.name}
          width={50}
          height={50}
          style={{ borderRadius: 8 }}
        />
      </Box>

      <Stack spacing={0.2} alignItems="flex-start" sx={{ minWidth: 0, flex: 1 }}>
        <Tooltip title={track.name} placement="top">
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{
              width: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {track.name}
          </Typography>
        </Tooltip>
        <Tooltip title={track.artist} placement="bottom">
          <Typography
            variant="body2"
            sx={{
              width: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {track.artist}
          </Typography>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default MainTrackDetails;
