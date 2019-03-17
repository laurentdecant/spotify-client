import React, { Component } from "react";
import styled from "../../styles/styled";
import { connect } from "react-redux";
import { Track } from "../../types";
import { State } from "../../reducers";
import { selectCurrent, TrackState, selectState } from "../../reducers/player";
import { loadTrack, playCurrent, pauseCurrent } from "../../actions/player";
import { joinArtistNames } from "../../helpers/utils";
import Icon, { IconType } from "../Icon";

const Button = styled.button<{ isLoaded: boolean }>`
  align-items: center;
  border-radius: 5px;
  color: ${props =>
    props.isLoaded ? props.theme.primaryLight : props.theme.foreground.default};
  display: flex;
  margin-bottom: 5px;
  padding: 10px;
  width: 100%;

  &:not(:disabled):hover {
    background: ${props => props.theme.background.hover};
  }

  &:not(:disabled):active {
    background: ${props => props.theme.background.active};
  }
`;

const StyledIcon = styled(Icon)<{
  isHidden?: boolean;
}>`
  display: ${props => (props.isHidden ? "none" : "block")};
  margin-right: 15px;

  ${Button}:not(:disabled):hover & {
    display: ${props => (props.isHidden ? "block" : "none")};
  }
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-weight: ${props => props.theme.font.weight.light};
  height: 100%;
`;

const Title = styled.span`
  align-items: center;
  display: flex;
  flex-grow: 1;
  margin-bottom: 5px;
`;

const Artist = styled.span`
  align-items: center;
  color: ${props => props.theme.foreground.dark};
  display: flex;
  flex-grow: 1;
`;

const Duration = styled.span`
  color: ${props => props.theme.foreground.dark};
`;

interface Props {
  tracks: Track[];
  current: Track | undefined;
  state: TrackState;
  loadTrack: (trackId: string) => void;
  playCurrent: () => void;
  pauseCurrent: () => void;
}

class Tracks extends Component<Props> {
  handleClick = (trackId: string) => {
    const { current, state, loadTrack, playCurrent, pauseCurrent } = this.props;

    if (state === TrackState.None || (current && current.id !== trackId)) {
      loadTrack(trackId);
    } else if (state === TrackState.isPlaying) {
      pauseCurrent();
    } else if (state === TrackState.isPaused) {
      playCurrent();
    }
  };

  isLoaded(track: Track) {
    const { current } = this.props;

    return !!current && current.id === track.id;
  }

  isDisabled(track: Track) {
    return !!track.preview_url;
  }

  renderIcon(track: Track, isLoaded: boolean) {
    const { state } = this.props;
    const hasPreview = track.preview_url;
    const isPlaying = isLoaded && state === TrackState.isPlaying;

    return hasPreview ? (
      <>
        <StyledIcon type={isPlaying ? IconType.VolumeUp : IconType.MusicNote} />
        <StyledIcon
          type={isPlaying ? IconType.Pause : IconType.PlayArrow}
          isHidden={true}
        />
      </>
    ) : (
      <StyledIcon type={IconType.MusicOff} />
    );
  }

  renderArtist(track: Track) {
    return <Artist>{joinArtistNames(track.artists)}</Artist>;
  }

  renderDuration(track: Track) {
    let seconds = track.duration_ms / 1000;
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    return (
      <Duration>{`${minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`}</Duration>
    );
  }

  render() {
    const { tracks } = this.props;

    return (
      <ul>
        {tracks.map(track => {
          const isLoaded = this.isLoaded(track);

          return (
            <li key={track.id}>
              <Button
                onClick={() => this.handleClick(track.id)}
                disabled={!this.isDisabled(track)}
                isLoaded={this.isLoaded(track)}
              >
                {this.renderIcon(track, isLoaded)}

                <Infos>
                  <Title>{track.name}</Title>
                  {this.renderArtist(track)}
                </Infos>

                {this.renderDuration(track)}
              </Button>
            </li>
          );
        })}
      </ul>
    );
  }
}

const mapState = (state: State) => ({
  current: selectCurrent(state),
  state: selectState(state)
});

const mapDispatch = {
  loadTrack: loadTrack,
  playCurrent: playCurrent,
  pauseCurrent: pauseCurrent
};

export default connect(
  mapState,
  mapDispatch
)(Tracks);