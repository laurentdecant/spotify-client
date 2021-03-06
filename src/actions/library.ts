import { State } from "../reducers";
import { selectAlbum } from "../selectors/albums";
import { selectTrack } from "../selectors/tracks";
import { LibraryActionType as ActionType } from ".";
import {
  PayloadAction,
  EntitiesAction,
  FetchDispatch,
  FetchMethod
} from "./types";
import { Schemas } from "./schemas";

export interface SavedAlbumsSuccessAction
  extends EntitiesAction<ActionType.SavedAlbumsSuccess> {}

export function getSavedAlbums() {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.SavedAlbumsRequest,
        ActionType.SavedAlbumsSuccess,
        ActionType.SavedAlbumsFailure
      ],
      path: "me/albums",
      schema: Schemas.SavedAlbums
    });
  };
}

export interface CheckSavedAlbumSuccess
  extends PayloadAction<
    ActionType.CheckSavedAlbumSuccess,
    { albumId: string; [key: number]: boolean }
  > {}

export function checkSavedAlbum(albumId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.CheckSavedAlbumRequest,
        ActionType.CheckSavedAlbumSuccess,
        ActionType.CheckSavedAlbumFailure
      ],
      path: `me/albums/contains?ids=${albumId}`,
      data: { albumId }
    });
  };
}

export interface SaveAlbumSuccessAction
  extends PayloadAction<ActionType.SaveAlbumSuccess, { albumId: string }> {}

function saveAlbum(albumId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.SaveAlbumRequest,
        ActionType.SaveAlbumSuccess,
        ActionType.SaveAlbumFailure
      ],
      path: `me/albums?ids=${albumId}`,
      method: FetchMethod.Put,
      data: { albumId }
    });
  };
}

export interface UnsaveAlbumSuccessAction
  extends PayloadAction<ActionType.UnsaveAlbumSuccess, { albumId: string }> {}

function UnsaveAlbum(albumId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.UnsaveAlbumRequest,
        ActionType.UnsaveAlbumSuccess,
        ActionType.UnsaveAlbumFailure
      ],
      path: `me/albums?ids=${albumId}`,
      method: FetchMethod.Delete,
      data: { albumId }
    });
  };
}

export function toggleSavedAlbum(albumId: string) {
  return (dispatch: FetchDispatch, getState: () => State) => {
    const state = getState();
    const album = selectAlbum(state, albumId);
    if (album.isSaved) {
      UnsaveAlbum(albumId)(dispatch);
    } else {
      saveAlbum(albumId)(dispatch);
    }
  };
}

export interface SavedTracksSuccessAction
  extends EntitiesAction<ActionType.SavedTracksSuccess> {}

export function getSavedTracks() {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.SavedTracksRequest,
        ActionType.SavedTracksSuccess,
        ActionType.SavedTracksFailure
      ],
      path: "me/tracks",
      schema: Schemas.PagedTracks
    }).then(json => {
      const trackIds = json.items.map(({ track }: any) => track && track.id);
      if (trackIds.length) {
        checkSavedTracks(trackIds)(dispatch);
      }
    });
  };
}

export interface CheckSavedTrackSuccess
  extends PayloadAction<
    ActionType.CheckSavedTracksSuccess,
    { trackIds: string[]; [key: number]: boolean }
  > {}

export function checkSavedTracks(trackIds: string[]) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.CheckSavedTracksRequest,
        ActionType.CheckSavedTracksSuccess,
        ActionType.CheckSavedTracksFailure
      ],
      path: `me/tracks/contains?ids=${encodeURIComponent(trackIds.join(","))}`,
      data: { trackIds }
    });
  };
}

export interface SaveTrackSuccessAction
  extends PayloadAction<ActionType.SaveTrackSuccess, { trackId: string }> {}

function saveTrack(trackId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.SaveTrackRequest,
        ActionType.SaveTrackSuccess,
        ActionType.SaveTrackFailure
      ],
      path: `me/tracks?ids=${trackId}`,
      method: FetchMethod.Put,
      data: { trackId }
    });
  };
}

export interface UnsaveTrackSuccessAction
  extends PayloadAction<ActionType.UnsaveTrackSuccess, { trackId: string }> {}

function UnsaveTrack(trackId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.UnsaveTrackRequest,
        ActionType.UnsaveTrackSuccess,
        ActionType.UnsaveTrackFailure
      ],
      path: `me/tracks?ids=${trackId}`,
      method: FetchMethod.Delete,
      data: { trackId }
    });
  };
}

export function toggleSavedTrack(trackId: string) {
  return (dispatch: FetchDispatch, getState: () => State) => {
    const state = getState();
    const track = selectTrack(state, trackId);
    if (track.isSaved) {
      UnsaveTrack(trackId)(dispatch);
    } else {
      saveTrack(trackId)(dispatch);
    }
  };
}
