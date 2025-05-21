import React from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { Box } from "@mui/material";
import CTACard from "./CTACard";
import AddPlaylistButton from "../buttons/AddPlaylistButton";

interface WelcomeCardProps {
  onCreatePlaylistClick?: () => void;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ onCreatePlaylistClick }) => {
  const steps = (
    <ol style={{ textAlign: "left" }}>
      <li>
        <b>Create a new playlist</b> by clicking the "Add New Playlist" button.
      </li>
      <li>
        <b>Select a playlist</b> from the dropdown.
      </li>
      <li>
        <b>Search</b> for your favorite <b>tracks</b>.
      </li>
      <li>
        <b>Add tracks</b> to your <b>selected playlist</b>.
      </li>
      <li>Enjoy your personalized music experience!</li>
    </ol>
  );

  const icon = (
    <Box sx={{ fontSize: 60, textAlign: "center" }}>
      <MusicNoteIcon fontSize="inherit" />
    </Box>
  );

  return (
    <CTACard
      title="Welcome to Tweakify"
      description="Discover and manage your favorite playlists & tracks."
      content={steps}
      button={<AddPlaylistButton buttonColor="inherit" />}
      icon={icon}
    />
  );
};

export default WelcomeCard;
