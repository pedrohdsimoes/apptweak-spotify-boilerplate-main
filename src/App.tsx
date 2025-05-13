import "./App.css";

import { FC, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectUser } from "./containers/auth/selectors";
import Header from "./components/Header";
import Content from "./components/Content";
import { Stack } from "@mui/material";

const App: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // TODO: You can access user data and now fetch user's playlists
  console.log(user);

  return (
    <div className="App">
      <Stack spacing={10} width={"100%"} height={"100%"}>
        <Header />
        <Content />
      </Stack>
    </div>
  );
};

export default App;
