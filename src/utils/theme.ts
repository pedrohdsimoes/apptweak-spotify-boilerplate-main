import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000"
    },
    secondary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff"
    }
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#1db954",
      main: "#1ed760",
      dark: "#1db954",
      contrastText: "#000"
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000"
    }
  }
});
