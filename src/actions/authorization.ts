import { Action, Dispatch } from "redux";
import { authorize } from "../utils/authorization";

export enum ActionType {
  RequestAuthorization = "REQUEST_AUTHORIZATION",
  ReceiveAuthorization = "RECEIVE_AUTHORIZATION"
}

export interface RequestAuthorizationAction
  extends Action<ActionType.RequestAuthorization> {}

function requestAuthorization(): RequestAuthorizationAction {
  return {
    type: ActionType.RequestAuthorization
  };
}

export interface ReceiveAuthorizationAction
  extends Action<ActionType.ReceiveAuthorization> {}

export function receiveAuthorization(): ReceiveAuthorizationAction {
  return {
    type: ActionType.ReceiveAuthorization
  };
}

export function getAuthorization() {
  return async (
    dispatch: Dispatch<RequestAuthorizationAction | ReceiveAuthorizationAction>
  ) => {
    dispatch(requestAuthorization());
    await authorize();
    dispatch(receiveAuthorization());
  };
}
