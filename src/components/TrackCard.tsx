import React from "react";
import { Stack } from "@mui/material";
import DeleteButton from "./buttons/DeleteButton";

interface TrackCardProps {
  track: {
    id: number;
    cover: string;
    name: string;
    artist: string;
    album: string;
    releaseDate: string;
  };
}

const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  return (
    <Stack
      key={track.id}
      direction="row"
      bgcolor={"primary.main"}
      borderRadius={2}
      spacing={2}
      width={"100%"}
      alignItems="center"
      p={2}
    >
      <img src={track.cover} alt={track.name} width={50} height={50} />
      <Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
        <Stack spacing={0.2}>
          <h3>{track.name}</h3>
          <p>{track.artist}</p>
        </Stack>
        <p>{track.album}</p>
        <p>{track.releaseDate}</p>
        <DeleteButton />
      </Stack>
    </Stack>
  );
};

export default TrackCard;
