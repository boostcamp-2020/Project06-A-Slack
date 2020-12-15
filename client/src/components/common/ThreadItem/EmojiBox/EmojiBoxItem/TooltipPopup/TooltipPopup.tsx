import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

interface ContainerProps {
  top?: string;
  left?: string;
}

const Container = styled.div<ContainerProps>`
  position: fixed;
  top: ${(props) => props.top ?? 0};
  left: ${(props) => props.left ?? 0};
  border-radius: 5px;
  outline: 0;
  z-index: 15;
  transform: translateY(-100%);
`;

interface TooltipProps {
  anchorEl: HTMLElement;
  top?: number;
  left?: number;
}

const TooltipPopup: FC<PropsWithChildren<TooltipProps>> = ({
  children,
  anchorEl,
  top = 0,
  left = 0,
}: PropsWithChildren<TooltipProps>) => {
  const parentBox = anchorEl.getBoundingClientRect();

  const TOP = top + parentBox.top;
  const LEFT = left + parentBox.left;

  return (
    <Container top={`${TOP}px`} left={`${LEFT}px`}>
      {children}
    </Container>
  );
};

export default TooltipPopup;
