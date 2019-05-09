import merge from "lodash/merge";
import { denormalize } from "normalizr";
import { NormalizedArtist, DenormalizedArtist } from "../types";
import { EntitiesAction } from "../actions/types";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";
import {
  AlbumActionType,
  ArtistActionType,
  BrowseActionType,
  PlaylistActionType,
  SearchActionType
} from "../actions";
import {
  ArtistAlbumsSuccessAction,
  ArtistRelatedArtistsSuccessAction,
  ArtistTopTracksSuccessAction
} from "../actions/artists";
import { schemas } from "./schemas";

export interface State {
  [id: string]: NormalizedArtist;
}

const initialState: State = {};

function mergeArtists(state: State, action: EntitiesAction<any>): State {
  return merge({}, state, action.payload.artists);
}

export default createReducer(initialState, {
  [ArtistActionType.ArtistSuccess]: mergeArtists,
  [ArtistActionType.ArtistAlbumsSuccess]: (
    state: State,
    action: ArtistAlbumsSuccessAction
  ) => {
    const { artistId, albums } = action.payload;
    const nexState = mergeArtists(state, action);
    return {
      ...nexState,
      [artistId]: {
        ...nexState[artistId],
        albums: Object.keys(albums)
      }
    };
  },
  [ArtistActionType.ArtistRelatedArtistsSuccess]: (
    state: State,
    action: ArtistRelatedArtistsSuccessAction
  ) => {
    const { artistId, artists } = action.payload;
    const nexState = mergeArtists(state, action);
    return {
      ...nexState,
      [artistId]: {
        ...nexState[artistId],
        relatedArtists: Object.keys(artists)
      }
    };
  },
  [ArtistActionType.ArtistTopTracksSuccess]: (
    state: State,
    action: ArtistTopTracksSuccessAction
  ) => {
    const { artistId, tracks } = action.payload;
    const nexState = mergeArtists(state, action);
    return {
      ...nexState,
      [artistId]: {
        ...nexState[artistId],
        topTracks: Object.keys(tracks)
      }
    };
  },
  [AlbumActionType.AlbumSuccess]: mergeArtists,
  [PlaylistActionType.PlaylistSuccess]: mergeArtists,
  [BrowseActionType.NewReleasesSuccess]: mergeArtists,
  [SearchActionType.SearchSuccess]: mergeArtists
});

export function selectArtist(
  state: CombinedState,
  artistId: string
): DenormalizedArtist {
  return denormalize(state.artists[artistId], schemas.artist, state);
}

export function selectArtists(
  state: CombinedState,
  artistIds: string[]
): DenormalizedArtist[] {
  return artistIds ? artistIds.map(id => selectArtist(state, id)) : [];
}
