import { Dispatch } from "redux";
import { receiveLogIn } from "../actions/authorization";

const SCOPES = [
  "user-library-read",
  "user-library-modify",
  "user-follow-read",
  "user-follow-modify",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public"
];
const LOG_IN_URL = `https://accounts.spotify.com/authorize?client_id=${
  process.env.REACT_APP_CLIENT_ID
}&scope=${encodeURIComponent(
  SCOPES.join(" ")
)}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
const REGEX = /#access_token=(.*?)&token_type=(.*?)&expires_in=(.*)$/;
const ACCESS_TOKEN = "token";
const TOKEN_TYPE = "tokenType";
const EXPIRES_AT = "expiresAt";

function logInRedirect(): Promise<any> {
  return new Promise((resolve, reject) => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === ACCESS_TOKEN) {
        window.removeEventListener("storage", handleStorage);
        resolve();
      }
    };
    window.addEventListener("storage", handleStorage);
    window.location.assign(LOG_IN_URL);
  });
}

function checkRedirection(): void {
  const match = window.location.hash.match(REGEX);
  if (match) {
    localStorage[ACCESS_TOKEN] = match[1];
    localStorage[TOKEN_TYPE] = match[2];
    const date = new Date();
    date.setSeconds(date.getSeconds() + parseInt(match[3]));
    localStorage[EXPIRES_AT] = date.toString();
  }
}

function initAuthorization(dispatch: Dispatch): void {
  if (
    !!localStorage[ACCESS_TOKEN] &&
    Date.parse(localStorage[EXPIRES_AT]) > Date.now()
  ) {
    dispatch(receiveLogIn());
  }
}

function authorizedFetch(
  url: string,
  method: string = "GET"
): Promise<Response> {
  const tokenType = localStorage[TOKEN_TYPE];
  const accessToken = localStorage[ACCESS_TOKEN];

  return fetch(url, {
    method,
    headers: {
      Authorization: `${tokenType} ${accessToken}`
    }
  });
}

async function fetchJson(url: string): Promise<any> {
  const response = await authorizedFetch(url);
  return response.json();
}

export {
  logInRedirect,
  checkRedirection,
  initAuthorization,
  authorizedFetch,
  fetchJson
};
