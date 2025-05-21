import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { FC, ReactElement } from "react";

import Header from "./components/mainPage/Header";
import Content from "./components/mainPage/Content";
import { Stack, useColorScheme } from "@mui/material";
import { ToastContainer } from "react-toastify";

const App: FC = (): ReactElement => {
  const { mode } = useColorScheme();

  return (
    <div className="App">
      <Stack spacing={10} width={"100%"} height={"100%"}>
        <Header />
        <Content />
      </Stack>
      <ToastContainer position="bottom-left" theme={mode} />
    </div>
  );
};

export default App;
