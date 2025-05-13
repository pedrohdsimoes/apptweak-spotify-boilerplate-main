import React from "react";
import { Autocomplete, Stack, TextField } from "@mui/material";
import ThemeModeToggler from "./ThemeModeToggler";
import AddPlaylistButton from "./buttons/AddPlaylistButton";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      width={"100%"}
      justifyContent="space-between"
      alignItems="center"
    >
      <Autocomplete
        disablePortal
        options={["Movie 1", "Movie 2", "Movie 3"]}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
      <ThemeModeToggler />
      <AddPlaylistButton />
    </Stack>
  );
};

export default Header;
