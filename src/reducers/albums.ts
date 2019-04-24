import merge from "lodash/merge";
import createReducer from "../helpers/reducer";
import { Album } from "../types";
import { EntitiesAction } from "../actions/types";
import { ActionType, AlbumSuccessAction } from "../actions/albums";
import { ActionType as BrowseActionType } from "../actions/browse";
import { ActionType as PlaylistActionType } from "../actions/playlists";
import { State as CombinedState } from ".";
import {
  FetchableState,
  startFetching,
  endFetching,
  isFetching
} from "./fetching";
import { selectArtists } from "./artists";
import { selectTracks } from "./tracks";

export interface State extends FetchableState {
  byId: { [id: string]: Album };
}

const initialState: State = {
  isFetching: false,
  byId: {}
};

function mergeAlbums(state: State, action: EntitiesAction<any>): State {
  return merge({}, state, { byId: action.payload.albums });
}

export default createReducer(initialState, {
  [ActionType.AlbumRequest]: startFetching,
  [ActionType.AlbumSuccess]: (
    state: State,
    action: AlbumSuccessAction
  ): State => endFetching(mergeAlbums(state, action)),
  [ActionType.AlbumFailure]: endFetching,

  [BrowseActionType.NewReleasesSuccess]: mergeAlbums,
  [PlaylistActionType.PlaylistSuccess]: mergeAlbums
});

export function selectIsFetching(state: CombinedState): boolean {
  return isFetching(state.albums);
}

export function selectAlbum(state: CombinedState, albumId: string): Album {
  let album = state.albums.byId[albumId];

  if (album) {
    album = {
      ...album,
      artists: selectArtists(state, album.artistIds),
      tracks: selectTracks(state, album.trackIds, album)
    };
  }

  return album;
}

export function selectAlbums(
  state: CombinedState,
  albumIds: string[]
): Album[] {
  return albumIds ? albumIds.map(id => selectAlbum(state, id)) : [];
}
