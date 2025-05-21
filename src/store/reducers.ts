import { combineReducers } from "redux";

import authentication from "../containers/auth/slice";
import playlists from "../containers/playlists/slice";

const rootReducer = combineReducers({
  authentication,
  playlists
});

export default rootReducer;
