import React from "react";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { Box, Typography } from "@mui/material";
import CTACard from "./CTACard";

interface EmptyPlaylistCardProps {
  playlistName: string;
  onSearchClick?: () => void;
}

const EmptyPlaylistCard: React.FC<EmptyPlaylistCardProps> = ({ playlistName, onSearchClick }) => {
  const content = (
    <Box sx={{ py: 2 }}>
      <Typography variant="body1">
        This playlist doesn't have any tracks yet. Start building your collection by:
      </Typography>
      <ul style={{ textAlign: "left" }}>
        <li>
          <b>Search for music</b> using the search bar at the top of the page
        </li>
        <li>
          <b>Click the "Add" button</b> next to any track in the search results
        </li>
        <li>
          <b>Organize your playlist</b> by adding more tracks or removing ones you don't want
        </li>
      </ul>
    </Box>
  );

  const icon = (
    <Box sx={{ fontSize: 60, textAlign: "center" }}>
      <QueueMusicIcon fontSize="inherit" />
    </Box>
  );

  return (
    <CTACard
      title={`${playlistName} is empty`}
      description="Let's add some tracks to your playlist!"
      content={content}
      icon={icon}
    />
  );
};

export default EmptyPlaylistCard;
