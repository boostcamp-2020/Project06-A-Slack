import React, { useEffect, useRef, PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import { flex } from '@/styles/mixin';
import { ModalCloseBox } from '@/components';
import { useOnClickOutside } from '@/hooks';

interface DimLayerProps {
  visible: boolean;
}

const DimLayer = styled.div<DimLayerProps>`
  position: fixed;
  top: 0;
  left: 0;
  ${flex()};
  ${(props) =>
    !props.visible &&
    css`
      display: none;
    `}
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 10;
`;

interface ContainerProps {
  width?: string;
  height?: string;
}

const Container = styled.div<ContainerProps>`
  ${flex('center', 'center', 'column')}
  width: ${(props) => props.width ?? '43rem'};
  height: auto;
  max-height: 90vh;
  background-color: white;
  border-radius: 5px;
  outline: 0;
  overflow: hidden;
`;

const Header = styled.div`
  position: relative;
  ${flex()}
  width: 100%;
  padding: 12px 28px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
`;

const Title = styled.div`
  flex: 1;
`;

interface BodyProps {
  bodyScroll: boolean;
}

const Body = styled.div<BodyProps>`
  width: 100%;
  border-radius: 0 0 5px 5px;
  ${(props) =>
    props.bodyScroll &&
    css`
      overflow: auto;
    `}
`;

const CloseIcon = styled.div`
  position: absolute;
  right: 20px;
`;

interface DimModalProps {
  header: React.ReactNode;
  body: React.ReactNode;
  visible: boolean;
  setVisible: (a: any) => any;
  width?: string;
  bodyScroll?: boolean;
}

const DimModal: React.FC<PropsWithChildren<DimModalProps>> = ({
  header,
  body,
  visible,
  setVisible,
  width,
  bodyScroll = true,
}: PropsWithChildren<DimModalProps>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setVisible(false);
  };

  useOnClickOutside(containerRef, () => setVisible(false));

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <DimLayer visible={visible}>
      <Container ref={containerRef} width={width}>
        <Header>
          <Title>{header}</Title>
          <CloseIcon>
            <ModalCloseBox handleClose={handleClose} />
          </CloseIcon>
        </Header>
        <Body bodyScroll={bodyScroll}>{body}</Body>
      </Container>
    </DimLayer>
  );
};

export default DimModal;
