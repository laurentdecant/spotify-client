import {
  AlbumActionType,
  ArtistActionType,
  BrowseActionType,
  PlaylistActionType,
  SearchActionType
} from "../actions";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";

export interface State {
  count: number;
}

const initialState: State = {
  count: 0
};

function increment(state: State): State {
  return {
    ...state,
    count: state.count + 1
  };
}

function decrement(state: State): State {
  return {
    ...state,
    count: state.count - 1
  };
}

export default createReducer(initialState, {
  [AlbumActionType.AlbumRequest]: increment,
  [AlbumActionType.AlbumSuccess]: decrement,
  [AlbumActionType.AlbumFailure]: decrement,
  [ArtistActionType.ArtistRequest]: increment,
  [ArtistActionType.ArtistSuccess]: decrement,
  [ArtistActionType.ArtistFailure]: decrement,
  [ArtistActionType.ArtistAlbumsRequest]: increment,
  [ArtistActionType.ArtistAlbumsSuccess]: decrement,
  [ArtistActionType.ArtistAlbumsFailure]: decrement,
  [ArtistActionType.ArtistRelatedArtistsRequest]: increment,
  [ArtistActionType.ArtistRelatedArtistsSuccess]: decrement,
  [ArtistActionType.ArtistRelatedArtistsFailure]: decrement,
  [ArtistActionType.ArtistAlbumsRequest]: increment,
  [ArtistActionType.ArtistAlbumsSuccess]: decrement,
  [ArtistActionType.ArtistAlbumsFailure]: decrement,
  [ArtistActionType.FullArtistRequest]: increment,
  [ArtistActionType.FullArtistSuccess]: decrement,
  [ArtistActionType.FullArtistFailure]: decrement,
  [BrowseActionType.CategoriesRequest]: increment,
  [BrowseActionType.CategoriesSuccess]: decrement,
  [BrowseActionType.CategoriesFailure]: decrement,
  [BrowseActionType.CategoryRequest]: increment,
  [BrowseActionType.CategorySuccess]: decrement,
  [BrowseActionType.CategoryFailure]: decrement,
  [BrowseActionType.CategoryPlaylistsRequest]: increment,
  [BrowseActionType.CategoryPlaylistsSuccess]: decrement,
  [BrowseActionType.CategoryPlaylistsFailure]: decrement,
  [BrowseActionType.FeaturedPlaylistsRequest]: increment,
  [BrowseActionType.FeaturedPlaylistsSuccess]: decrement,
  [BrowseActionType.FeaturedPlaylistsFailure]: decrement,
  [BrowseActionType.NewReleasesRequest]: increment,
  [BrowseActionType.NewReleasesSuccess]: decrement,
  [BrowseActionType.NewReleasesFailure]: decrement,
  [PlaylistActionType.PlaylistRequest]: increment,
  [PlaylistActionType.PlaylistSuccess]: decrement,
  [PlaylistActionType.PlaylistFailure]: decrement,
  [SearchActionType.SearchRequest]: increment,
  [SearchActionType.SearchSuccess]: decrement,
  [SearchActionType.SearchFailure]: decrement
});

export function selectIsLoading(state: CombinedState): boolean {
  return !!state.loading.count;
}