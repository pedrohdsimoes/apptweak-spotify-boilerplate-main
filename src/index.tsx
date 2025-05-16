import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import AuthProvider from "./containers/auth";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme, lightTheme } from "./utils/theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const theme = createTheme({
  colorSchemes: {
    dark: darkTheme,
    light: lightTheme
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 16
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 16
        }
      }
    }
  }
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme} defaultMode="dark">
          <CssBaseline />
          <App />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
