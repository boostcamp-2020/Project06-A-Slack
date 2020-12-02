import React, { useEffect, useRef, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { flex, modalBoxShadow } from '@/styles/mixin';
import { useOnClickOutside } from '@/hooks';

interface ContainerProps {
  width: string;
  backgroundColor?: string;
}

const Container = styled.div<ContainerProps>`
  width: ${(props) => props.width};
  height: auto;
  background-color: ${(props) => props.backgroundColor ?? props.theme.color.modalWhite};
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.color.gray3};
  outline: 0;
  ${modalBoxShadow}
  ${flex('center', 'center', 'column')}
`;

interface MenuModalProps {
  width: string;
  backgroundColor?: string;
  visible: boolean;
  setVisible: (a: any) => any;
}

const MenuModal: React.FC<PropsWithChildren<MenuModalProps>> = ({
  width,
  backgroundColor,
  visible,
  setVisible,
  children,
}: PropsWithChildren<MenuModalProps>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => setVisible(false));

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return visible ? (
    <Container width={width} ref={containerRef} backgroundColor={backgroundColor}>
      {children}
    </Container>
  ) : null;
};

export default MenuModal;
