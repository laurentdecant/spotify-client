import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Playlist } from "../../types";
import { State } from "../../reducers";
import {
  selectIsFetching,
  selectFeaturedPlaylists
} from "../../reducers/browse";
import { getFeaturedPlaylists } from "../../actions/browse";
import Covers from "./Covers";
import withLoader from "../withLoader";

interface Props extends RouteComponentProps {
  isLoading: boolean;
  playlists: Playlist[];
  getPlaylists: () => void;
}

function FeaturedPlaylists({ history, playlists, getPlaylists }: Props) {
  useEffect(getPlaylists, []);

  function handleClick(playlistId: string) {
    history.push(`${process.env.PUBLIC_URL}/playlists/${playlistId}/tracks`);
  }

  const items = playlists.map(playlist => ({
    id: playlist.id,
    image: playlist.images[0].url,
    title: playlist.name
  }));

  return <Covers items={items} onClick={handleClick} />;
}

const mapState = (state: State) => ({
  isLoading: selectIsFetching(state),
  playlists: selectFeaturedPlaylists(state)
});

const mapDispatch = {
  getPlaylists: getFeaturedPlaylists
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(withLoader(FeaturedPlaylists))
);
