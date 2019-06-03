import React, { HTMLAttributes } from "react";
import { NavLink } from "react-router-dom";
import styled from "../../styles/styled";
import { click } from "../../styles/effects";
import { Icon, IconType } from "../core";
import Recents from "./Recents";

const Wrapper = styled.div`
  background: ${props => props.theme.background.dark};
  box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 ${props => props.theme.thickness.medium}px;
  width: 100%;
  z-index: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.extraSmall}px) {
    box-shadow: 2px 0 4px 2px rgba(0, 0, 0, 0.2);
    padding: ${props => props.theme.thickness.medium}px 0;
    width: ${props => props.theme.thickness.extraExtraLarge}px;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.extraSmall}px) {
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: ${props => props.theme.thickness.medium}px;
  }
`;

const StyledNavLink = styled(NavLink)`
  ${click}
  align-items: center;
  color: ${props => props.theme.foreground.dark};
  display: flex;
  height: ${props => props.theme.thickness.large}px;
  padding: 0 ${props => props.theme.thickness.medium}px;

  &:hover {
    color: ${props => props.theme.foreground.default};
  }

  &.active {
    border-bottom: ${props => props.theme.thickness.extraExtraSmall}px solid
      ${props => props.theme.primaryLight};
    color: ${props => props.theme.foreground.default};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.extraSmall}px) {
    padding: 0 ${props => props.theme.thickness.large}px;

    &.active {
      border: none;
      border-right: ${props => props.theme.thickness.extraExtraSmall}px solid
        ${props => props.theme.primaryLight};
    }
  }
`;

const StyledIcon = styled(Icon)`
  margin-right: ${props => props.theme.thickness.small}px;
`;

const StyledRecents = styled(Recents)`
  overflow: hidden;
`;

const items = [
  {
    link: `${process.env.PUBLIC_URL}/browse`,
    icon: IconType.ViewModule,
    text: "Browse"
  },
  {
    link: `${process.env.PUBLIC_URL}/search`,
    icon: IconType.Search,
    text: "Search"
  }
];

const Menu = ({ className }: HTMLAttributes<HTMLElement>) => {
  return (
    <Wrapper className={className}>
      <List>
        {items.map(item => (
          <li key={item.link}>
            <StyledNavLink to={item.link}>
              <StyledIcon type={item.icon} />
              {item.text}
            </StyledNavLink>
          </li>
        ))}
      </List>

      <StyledRecents />
    </Wrapper>
  );
};

export default Menu;
