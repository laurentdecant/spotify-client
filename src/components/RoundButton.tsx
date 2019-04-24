import React from "react";
import styled from "styled-components";
import { ripple } from "../styles/effects";
import Icon, { IconType } from "./Icon";

const StyedButton = styled.button`
  ${ripple}
  border-radius: 50%;
  display: flex;
  margin: 10px;
  padding: 5px;
`;

const StyledIcon = styled(Icon)`
  font-size: 25px;
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconType: IconType;
}

function RoundButton({ iconType: iconType, ...rest }: Props) {
  return (
    <StyedButton {...rest}>
      <StyledIcon type={iconType} />
    </StyedButton>
  );
}

export default RoundButton;