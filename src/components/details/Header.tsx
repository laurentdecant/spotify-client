import React from "react";
import styled from "../../styles/styled";
import { IconType, Image, PrimaryButton, Text, ToggleButton } from "../core";
import { ImageShape } from "../core/Image";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: center;
  margin: 0 0 ${props => props.theme.thickness.small}px 0;

  @media (min-width: ${({ theme }) => theme.breakpoint.width.extraSmall}px) {
    margin: 0 0 ${props => props.theme.thickness.medium}px 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.width.small}px) {
    flex-direction: column;
    justify-content: flex-start;
    margin: 0 ${props => props.theme.thickness.medium}px 0 0;
  }
`;

const StyledImage = styled(Image)`
  box-shadow: ${props => props.theme.shadow.middle};
  flex-shrink: 0;
  margin: 0 ${props => props.theme.thickness.small}px 0 0;
  width: calc(
    100% -
      ${props =>
        props.theme.thickness.extraLarge +
        props.theme.thickness.large +
        props.theme.thickness.medium +
        props.theme.thickness.small}px
  );

  @media (min-width: ${({ theme }) => theme.breakpoint.width.extraSmall}px) {
    margin: 0 ${props => props.theme.thickness.medium}px 0 0;
    width: ${props => props.theme.thickness.extraExtraLarge}px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.width.small}px) {
    margin: 0 0 ${props => props.theme.thickness.medium}px 0;
    width: ${props => props.theme.thickness.extraExtraExtraLarge}px;
  }
`;

const Vertical = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled(Text)`
  font-size: ${props => props.theme.fontSize.extraLarge}px;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoint.width.small}px) {
    font-size: ${props => props.theme.fontSize.extraLarge}px;
    max-width: ${props => props.theme.thickness.extraExtraExtraLarge}px;
  }
`;

const SubTitle = styled(Text)`
  color: ${props => props.theme.onBackground.secondary};
  display: inline-block;
  font-size: ${props => props.theme.fontSize.medium}px;
  font-weight: ${props => props.theme.fontWeight.light};
  margin-top: ${props => props.theme.thickness.extraSmall}px;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoint.width.small}px) {
    font-size: ${props => props.theme.fontSize.large}px;
    margin-top: ${props => props.theme.thickness.small}px;
    max-width: ${props => props.theme.thickness.extraExtraExtraLarge}px;
  }
`;

const Horizontal = styled.div`
  display: flex;
  flex-orientation: row;
  margin-top: ${props => props.theme.thickness.medium}px;
`;

const FavoriteButton = styled(ToggleButton).attrs(() => ({
  iconType: IconType.Favorite
}))``;

const PlayButton = styled(PrimaryButton)`
  margin-right: ${props => props.theme.thickness.small}px;
  width: ${props => props.theme.thickness.extraLarge}px;
`;

interface Props {
  imageSource?: string;
  imageShape: ImageShape;
  title: string;
  subTitle?: string;
  canPlay: boolean;
  isPlaying: boolean;
  isFavorite: boolean;
  onTogglePlay: () => void;
  onToggleFavorite: () => void;
}

function Header({
  imageSource,
  imageShape,
  title,
  subTitle,
  canPlay,
  isPlaying,
  isFavorite,
  onTogglePlay,
  onToggleFavorite
}: Props) {
  function handleTogglePlay() {
    onTogglePlay();
  }

  return (
    <Wrapper>
      <StyledImage source={imageSource} shape={imageShape} />
      <Vertical>
        <Title>{title}</Title>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
        <Horizontal>
          <PlayButton disabled={!canPlay} onClick={handleTogglePlay}>
            {isPlaying ? "Pause" : "Play"}
          </PlayButton>
          <FavoriteButton isToggled={isFavorite} onClick={onToggleFavorite} />
        </Horizontal>
      </Vertical>
    </Wrapper>
  );
}

Header.defaultProps = {
  imageShape: ImageShape.Square,
  onTogglePlay: () => {},
  onToggleFavorite: () => {}
};

export default Header;
