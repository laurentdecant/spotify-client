import { UserProfile } from "../types";
import { UserProfileActionType as ActionType } from "../actions";
import { UserProfileSuccessAction } from "../actions/userProfile";
import createReducer from "./createReducer";

export interface State {
  userProfile?: UserProfile;
}

export const initialState: State = {};

export default createReducer(initialState, {
  [ActionType.UserProfileSuccess]: (
    state: State,
    action: UserProfileSuccessAction
  ) => ({
    ...state,
    userProfile: action.payload
  })
});
