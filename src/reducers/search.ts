import { ActionType, SearchSuccessAction } from "../actions/search";
import { Album, Artist, Playlist } from "../types";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";
import {
  FetchableState,
  startFetching,
  endFetching,
  isFetching
} from "./fetching";
import { selectAlbums as selectAlbumsById } from "./albums";
import { selectArtists as selectArtistsById } from "./artists";
import { selectPlaylists as selectPlaylistsById } from "./playlists";

export interface State extends FetchableState {
  albumIds: string[];
  artistIds: string[];
  playlistIds: string[];
  trackIds: string[];
}

const initialState: State = {
  isFetching: false,
  albumIds: [],
  artistIds: [],
  playlistIds: [],
  trackIds: []
};

export default createReducer(initialState, {
  [ActionType.SearchRequest]: startFetching,
  [ActionType.SearchSuccess]: (state: State, action: SearchSuccessAction) => {
    const { results } = action.payload;
    const { albums, artists, playlists, tracks } = results[
      Object.keys(results)[0]
    ];
    return endFetching({
      ...state,
      albumIds: albums,
      artistIds: artists,
      playlistIds: playlists,
      trackIds: tracks
    });
  },
  [ActionType.SearchFailure]: endFetching
});

export function selectIsFetching(state: CombinedState): boolean {
  return isFetching(state.search);
}

export function selectAlbums(state: CombinedState): Album[] {
  return selectAlbumsById(state, state.search.albumIds);
}

export function selectArtists(state: CombinedState): Artist[] {
  return selectArtistsById(state, state.search.artistIds).sort(
    (x, y) => y.popularity - x.popularity
  );
}

export function selectPlaylists(state: CombinedState): Playlist[] {
  return selectPlaylistsById(state, state.search.playlistIds);
}
