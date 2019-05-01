import createReducer from "../helpers/reducer";
import { Track } from "../types";
import {
  ActionType,
  LoadTrackAction,
  TrackLoadedAction,
  UpdateAction,
  SeekAction,
  ChangeVolumeAction,
  LoadCollectionAction
} from "../actions/player";
import { State as CombinedState } from ".";
import { selectTrack } from "./tracks";

enum PlayerState {
  None,
  isLoaded,
  isPlaying,
  isPaused
}

export enum Command {
  None,
  Play,
  Pause,
  Seek,
  ChangeVolume
}

export interface State {
  collectionId: string | null;
  trackIds: string[];
  trackIndex: number;
  playerState: PlayerState;
  duration: number;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  command: Command;
}

const initialState: State = {
  collectionId: null,
  trackIds: [],
  trackIndex: 0,
  playerState: PlayerState.None,
  duration: 0,
  currentTime: 0,
  volume: 1,
  isMuted: false,
  command: Command.None
};

export default createReducer(initialState, {
  [ActionType.LoadTrack]: (state: State, action: LoadTrackAction): State => ({
    ...state,
    collectionId: null,
    trackIds: [action.payload],
    trackIndex: 0,
    playerState: PlayerState.isLoaded,
    command: Command.Play
  }),
  [ActionType.TrackLoaded]: (
    state: State,
    action: TrackLoadedAction
  ): State => ({
    ...state,
    duration: action.payload
  }),
  [ActionType.Playing]: (state: State): State => ({
    ...state,
    playerState: PlayerState.isPlaying,
    command: Command.None
  }),
  [ActionType.Update]: (state: State, action: UpdateAction): State => ({
    ...state,
    currentTime: action.payload,
    command: Command.None
  }),
  [ActionType.Play]: (state: State): State => ({
    ...state,
    command: Command.Play
  }),
  [ActionType.Pause]: (state: State): State => ({
    ...state,
    command: Command.Pause
  }),
  [ActionType.Paused]: (state: State): State => ({
    ...state,
    playerState: PlayerState.isPaused,
    command: Command.None
  }),
  [ActionType.Seek]: (state: State, action: SeekAction): State => ({
    ...state,
    currentTime: action.payload,
    command: Command.Seek
  }),
  [ActionType.Seeked]: (state: State): State => ({
    ...state,
    command: Command.None
  }),
  [ActionType.ChangeVolume]: (
    state: State,
    action: ChangeVolumeAction
  ): State => ({
    ...state,
    ...action.payload,
    command: Command.ChangeVolume
  }),
  [ActionType.VolumeChanged]: (state: State): State => ({
    ...state,
    command: Command.None
  }),
  [ActionType.LoadCollection]: (
    state: State,
    action: LoadCollectionAction
  ): State => ({
    ...state,
    collectionId: action.payload.collectionId,
    trackIds: action.payload.trackIds,
    trackIndex: 0,
    playerState: PlayerState.isLoaded,
    command: Command.Play
  }),
  [ActionType.Ended]: (state: State): State => ({ ...state })
});

export function selectLoadedTrack(state: CombinedState): Track | undefined {
  const { trackIds, trackIndex } = state.player;

  if (trackIds) {
    return selectTrack(state, trackIds[trackIndex]);
  }
}

export function selectIsLoaded(state: CombinedState) {
  const { collectionId, trackIds, trackIndex } = state.player;
  return (id: string) =>
    collectionId === id || (!!trackIds.length && trackIds[trackIndex] === id);
}

export function selectIsPlaying(state: CombinedState) {
  const { playerState } = state.player;
  return (id?: string) =>
    (!id || selectIsLoaded(state)(id)) && playerState === PlayerState.isPlaying;
}

export function selectCanToggle(state: CombinedState) {
  return state.player.playerState !== PlayerState.None;
}

export function selectCanSeek(state: CombinedState) {
  return state.player.playerState !== PlayerState.None;
}

export interface Times {
  duration: number;
  currentTime: number;
}

export function selectTimes(state: CombinedState): Times {
  const { player } = state;

  return {
    duration: player.duration,
    currentTime: player.currentTime
  };
}

export interface VolumeLevels {
  volume: number;
  isMuted: boolean;
}

export function selectVolumeLevels(state: CombinedState): VolumeLevels {
  const {
    player: { volume, isMuted }
  } = state;

  return {
    volume,
    isMuted
  };
}

export function selectCommand(state: CombinedState): Command {
  return state.player.command;
}
