import React from "react";
import { connect } from "react-redux";
import styled from "../../styles/styled";
import {
  toggleShuffle,
  previous,
  playPause,
  next,
  toggleLoop
} from "../../actions/player";
import { State } from "../../reducers";
import {
  selectCanNext,
  selectCanPrevious,
  selectCanPlayPause,
  selectIsLooped,
  selectIsPlaying,
  selectIsShuffled
} from "../../selectors/player";
import { IconType, RoundButton, ToggleButton } from "../core";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
`;

const StyledRoundButton = styled(RoundButton)`
  margin: 0 ${props => props.theme.thickness.extraSmall}px;
`;

const StyledToggleButton = styled(ToggleButton)`
  margin: 0 ${props => props.theme.thickness.extraSmall}px;
`;

const ShuffleButton = styled(StyledToggleButton).attrs(() => ({
  iconType: IconType.Shuffle
}))``;

const PreviousButton = styled(StyledRoundButton).attrs(() => ({
  iconType: IconType.SkipPrevious
}))``;

const PlayButton = styled(StyledRoundButton)``;

const NextButton = styled(StyledRoundButton).attrs(() => ({
  iconType: IconType.SkipNext
}))``;

const LoopButton = styled(StyledToggleButton).attrs(() => ({
  iconType: IconType.Loop
}))``;

interface Props {
  isPlaying: boolean;
  isShuffled: boolean;
  canPrevious: boolean;
  canPlayPause: boolean;
  canNext: boolean;
  isLooped: boolean;
  toggleShuffle: () => void;
  previous: () => void;
  playPause: () => void;
  next: () => void;
  toggleLoop: () => void;
}

function Controls({
  isPlaying,
  isShuffled,
  canPrevious,
  canPlayPause,
  canNext,
  isLooped,
  toggleShuffle,
  previous,
  playPause,
  next,
  toggleLoop
}: Props) {
  return (
    <Wrapper>
      <ShuffleButton
        data-testid="shuffleButton"
        onClick={toggleShuffle}
        isToggled={isShuffled}
      />
      <PreviousButton
        data-testid="previousButton"
        disabled={!canPrevious}
        onClick={previous}
      />

      <PlayButton
        data-testid="playButton"
        disabled={!canPlayPause}
        onClick={playPause}
        iconType={isPlaying ? IconType.Pause : IconType.PlayArrow}
      />

      <NextButton data-testid="nextButton" disabled={!canNext} onClick={next} />
      <LoopButton
        data-testid="loopButton"
        onClick={toggleLoop}
        isToggled={isLooped}
      />
    </Wrapper>
  );
}

const mapState = (state: State) => ({
  isPlaying: selectIsPlaying(state),
  isShuffled: selectIsShuffled(state),
  canPrevious: selectCanPrevious(state),
  canPlayPause: selectCanPlayPause(state),
  canNext: selectCanNext(state),
  isLooped: selectIsLooped(state)
});

const mapDispatch = {
  toggleShuffle,
  previous,
  playPause,
  next,
  toggleLoop
};

export default connect(
  mapState,
  mapDispatch
)(Controls);
