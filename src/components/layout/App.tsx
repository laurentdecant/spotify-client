import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "../../styles/styled";
import Header from "./Header";
import Menu from "./Menu";
import Routes from "./Routes";
import NotificationList from "./NotificationList";
import Player from "../player/Player";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledHeader = styled(Header)`
  flex-shrink: 0;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(
    100% -
      ${props =>
        props.theme.thickness.extraLarge + props.theme.thickness.large}px
  );

  @media (min-width: ${({ theme }) => theme.breakpoint.extraSmall}px) {
    flex-direction: row;
  }
`;

const StyledMenu = styled(Menu)`
  flex-shrink: 0;
`;

const StyledRoutes = styled(Routes)`
  flex-grow: 1;
  flex-shrink: 1;
`;

const StyledNotificationList = styled(NotificationList)`
  height: 100%;
  position: fixed;
  right: 0;
`;

function App() {
  return (
    <Router>
      <Wrapper>
        <StyledHeader />

        <Body>
          <StyledMenu />
          <StyledRoutes />
          <StyledNotificationList />
        </Body>

        <Player />
      </Wrapper>
    </Router>
  );
}

export default App;
