import React, { useEffect, useRef, PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import { flex, modalBoxShadow } from '@/styles/mixin';
import { useOnClickOutside } from '@/hooks';

interface ContainerProps {
  width?: string;
  backgroundColor?: string;
  top: string;
  left?: string;
  right?: string;
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
  ${(props) =>
    props.right &&
    css`
      right: ${props.right};
    `}
  width: ${(props) => props.width ?? 'auto'};
  height: auto;
  background-color: ${(props) => props.backgroundColor ?? props.theme.color.modalWhite};
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.color.gray3};
  outline: 0;
  ${modalBoxShadow}
  ${flex('center', 'center', 'column')}
  z-index: 2;
`;

interface MenuModalProps {
  width?: string;
  top: string;
  left?: string;
  right?: string;
  backgroundColor?: string;
  visible: boolean;
  setVisible: (a: any) => void;
}

const MenuModal: React.FC<PropsWithChildren<MenuModalProps>> = ({
  width,
  top,
  left,
  right,
  backgroundColor,
  visible,
  setVisible,
  children,
}: PropsWithChildren<MenuModalProps>) => {
  if (!left && !right) {
    throw new Error('MenuModal은 left 또는 right 값이 필요합니다');
  }
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => setVisible(false));

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current) {
      return;
    }
    setVisible(false);
  };

  return visible ? (
    <Container
      width={width}
      top={top}
      left={left}
      right={right}
      ref={containerRef}
      backgroundColor={backgroundColor}
      onClick={handleClick}
    >
      {children}
    </Container>
  ) : null;
};

export default MenuModal;
