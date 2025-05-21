import React from "react";
import { Stack } from "@mui/material";
import ThemeModeToggler from "../buttons/ThemeModeToggler";
import AddPlaylistButton from "../buttons/AddPlaylistButton";
import SearchBar from "../search/SearchBar";
import useMobile from "../../hooks/useMobile";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { isMobile } = useMobile();
  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={2}
      width={"100%"}
      justifyContent="space-between"
      alignItems="center"
    >
      <SearchBar />
      <ThemeModeToggler />
      <AddPlaylistButton />
    </Stack>
  );
};

export default Header;
