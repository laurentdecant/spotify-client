import React, { Component, createRef, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Track } from "../../types";
import { State } from "../../reducers";
import { selectCurrent, Commands, selectCommands } from "../../reducers/player";
import { loaded, playing, update, paused } from "../../actions/player";

interface Props {
  track?: Track;
  commands: Commands;
  loaded: (duration: number) => void;
  playing: () => void;
  update: (elaped: number) => void;
  paused: () => void;
}

class Audio extends Component<Props> {
  audio = createRef<HTMLAudioElement>();

  componentDidUpdate() {
    const { current } = this.audio;
    if (current) {
      const { shouldPlay, shouldPause } = this.props.commands;
      if (shouldPlay) {
        current.play();
      } else if (shouldPause) {
        current.pause();
      }
    }
  }

  handleLoaded = (event: SyntheticEvent<HTMLAudioElement>) => {
    const target = event.target as HTMLAudioElement;
    this.props.loaded(target.duration);
  };

  handlePlay = () => {
    this.props.playing();
  };

  handleUpdate = (event: SyntheticEvent<HTMLAudioElement>) => {
    const target = event.target as HTMLAudioElement;
    this.props.update(target.currentTime);
  };

  handlePause = () => {
    this.props.paused();
  };

  render() {
    const { track } = this.props;

    return (
      <audio
        ref={this.audio}
        src={track && track.preview_url}
        onLoadedMetadata={this.handleLoaded}
        onPlay={this.handlePlay}
        onTimeUpdate={this.handleUpdate}
        onPause={this.handlePause}
      />
    );
  }
}

const mapState = (state: State) => ({
  track: selectCurrent(state),
  commands: selectCommands(state)
});

const mapDispatch = {
  loaded: loaded,
  playing: playing,
  update: update,
  paused: paused
};

export default connect(
  mapState,
  mapDispatch
)(Audio);
