import merge from "lodash/merge";
import { denormalize } from "normalizr";
import { NormalizedAlbum, DenormalizedAlbum } from "../types";
import { EntitiesAction } from "../actions/types";
import { ActionType } from "../actions/albums";
import {
  ArtistActionType,
  BrowseActionType,
  PlaylistActionType,
  SearchActionType
} from "../actions";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";

import { schemas } from "./schemas";

export interface State {
  [id: string]: NormalizedAlbum;
}

const initialState: State = {};

function mergeAlbums(state: State, action: EntitiesAction<any>): State {
  return merge({}, state, action.payload.albums);
}

export default createReducer(initialState, {
  [ActionType.AlbumSuccess]: mergeAlbums,
  [PlaylistActionType.PlaylistSuccess]: mergeAlbums,
  [ArtistActionType.ArtistAlbumsSuccess]: mergeAlbums,
  [BrowseActionType.NewReleasesSuccess]: mergeAlbums,
  [SearchActionType.SearchSuccess]: mergeAlbums
});

export function selectHasAlbum(state: CombinedState, albumId: string): boolean {
  return !!state.albums[albumId];
}

export function selectAlbum(
  state: CombinedState,
  albumId: string
): DenormalizedAlbum {
  return denormalize(state.albums[albumId], schemas.album, state);
}

export function selectAlbums(
  state: CombinedState,
  albumIds: string[]
): DenormalizedAlbum[] {
  return albumIds ? albumIds.map(id => selectAlbum(state, id)) : [];
}

export function selectPlayableTrackIds(
  state: CombinedState,
  albumId: string
): string[] {
  const album = selectAlbum(state, albumId);
  return album.tracks.filter(track => track.preview_url).map(track => track.id);
}
