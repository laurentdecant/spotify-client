import React from "react";
import { RouteComponentProps, NavLink, withRouter } from "react-router-dom";
import styled from "../../styles/styled";

const List = styled.ul`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-size: ${props => props.theme.fontSize.medium};
  justify-content: center;
  margin-bottom: 0;
  position: relative;
  top: -25px;

  @media (min-width: ${({ theme }) => theme.breakpoints.extraSmall}px) {
    margin-bottom: ${props => props.theme.thickness.medium}px;
    top: 0;
  }
`;

const Item = styled.li``;

const StyledNavLink = styled(NavLink)`
  align-items: center;
  color: ${props => props.theme.foreground.dark};
  display: flex;
  height: ${props => props.theme.thickness.large}px;
  justify-content: center;
  padding: 0 ${props => props.theme.thickness.medium}px;
  position: relative;

  &:hover {
    color: ${props => props.theme.foreground.default};
  }

  &.active {
    color: ${props => props.theme.foreground.default};
  }

  &.active::after {
    background: ${props => props.theme.primaryLight};
    bottom: 0;
    content: "";
    height: ${props => props.theme.thickness.extraExtraSmall}px;
    left: 50%;
    position: absolute;
    transform: translate(-50%, 0);
    width: ${props => props.theme.thickness.large}px;
  }
`;

interface Props extends RouteComponentProps {
  items: { path: string; text: string }[];
}

function SubMenu({ match, items }: Props) {
  return (
    <List>
      {items.map(item => (
        <Item key={item.path}>
          <StyledNavLink to={`${match.url}/${item.path}`}>
            {item.text}
          </StyledNavLink>
        </Item>
      ))}
    </List>
  );
}

export default withRouter(SubMenu);