import React, { useEffect, useRef, PropsWithChildren, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { flex, modalBoxShadow } from '@/styles/mixin';
import { useOnClickOutside } from '@/hooks';

const TopLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: unset;
  z-index: 15;
`;

interface ContainerProps {
  width?: string;
  backgroundColor?: string;
  top: string;
  left: string;
  trans: {
    y: number;
    x: number;
  };
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  ${(props) =>
    props.top &&
    css`
      top: ${props.top};
    `}
  ${(props) =>
    props.left &&
    css`
      left: ${props.left};
    `}
  ${(props) => `transform: translate(${props.trans.x}%, ${props.trans.y}%);`}
  width: ${(props) => props.width ?? 'auto'};
  min-width: 13rem;
  height: auto;
  background-color: ${(props) => props.backgroundColor ?? props.theme.color.modalWhite};
  border-radius: 5px;
  padding: 0.8rem 0;
  outline: 0;
  ${modalBoxShadow}
  ${flex('center', 'center', 'column')}
  z-index: 10;
`;

interface AnchorOrigin {
  vertical: 'top' | 'center' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

interface TransformOrigin {
  vertical: 'top' | 'center' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

interface Offset {
  top?: number;
  left?: number;
}

interface PopoverProps {
  anchorEl: HTMLElement;
  width?: string;
  anchorOrigin?: AnchorOrigin;
  transformOrigin?: TransformOrigin;
  offset: Offset;
  backgroundColor?: string;
  visible: boolean;
  setVisible: (a: any) => void;
}

const Popover: React.FC<PropsWithChildren<PopoverProps>> = ({
  anchorEl,
  anchorOrigin,
  transformOrigin,
  width,
  offset,
  backgroundColor,
  visible,
  setVisible,
  children,
}: PropsWithChildren<PopoverProps>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => setVisible(false));

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current) {
      return;
    }
    setVisible(false);
  };

  const parentBox = anchorEl.getBoundingClientRect();

  let top = 0;
  let left = 0;

  if (anchorOrigin) {
    const { vertical, horizontal } = anchorOrigin;
    if (vertical === 'top') {
      top = parentBox.top;
    } else if (vertical === 'center') {
      top = parentBox.top + parentBox.height / 2;
    } else if (vertical === 'bottom') {
      top = parentBox.bottom;
    }

    if (horizontal === 'left') {
      left = parentBox.left;
    } else if (horizontal === 'center') {
      left = parentBox.left + parentBox.width / 2;
    } else if (horizontal === 'right') {
      left = parentBox.right;
    }
  }

  if (offset?.top) {
    top += offset.top;
  }
  if (offset?.left) {
    left += offset.left;
  }

  let x = 0;
  let y = 0;

  if (transformOrigin) {
    const { vertical, horizontal } = transformOrigin;
    if (vertical === 'top') {
      y = 0;
    } else if (vertical === 'center') {
      y = -50;
    } else if (vertical === 'bottom') {
      y = -100;
    }

    if (horizontal === 'left') {
      x = 0;
    } else if (horizontal === 'center') {
      x = -50;
    } else if (horizontal === 'right') {
      x = -100;
    }
  }

  return visible ? (
    <TopLayer>
      <Container
        width={width}
        top={`${top}px`}
        left={`${left}px`}
        ref={containerRef}
        trans={{ x, y }}
        backgroundColor={backgroundColor}
        onClick={handleClick}
      >
        {children}
      </Container>
    </TopLayer>
  ) : null;
};

Popover.defaultProps = {
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
};

export default Popover;
