import React, { useEffect, useRef, PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
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
  z-index: 2;
`;

interface ContainerProps {
  width?: string;
  height?: string;
}

const Container = styled.form<ContainerProps>`
  width: 42rem;
  height: auto;
  max-height: 90vh;
  background-color: white;
  border-radius: 5px;
  outline: 0;
  ${flex('center', 'center', 'column')}
`;

const Header = styled.div`
  width: 100%;
  height: 5.6rem;
  padding: 1.4rem;
  padding-left: 1.7rem;
  ${flex()}
  border-radius:5px 5px 0 0;
`;

const Title = styled.div`
  flex: 1;
`;

const Body = styled.div`
  width: 100%;
  height: 24rem;
  padding: 0 1.4rem;
  ${flex()};
  flex: 1;
  overflow-y: hidden;
  .thumb-vertical {
    transition: 0.3s;
    opacity: 0;
  }
  &:hover {
    .thumb-vertical {
      transition: 0.3s;
      opacity: 1;
    }
  }
`;

const Footer = styled(Header)`
  padding: 1.4rem;
  border-radius: 0 0 5px 5px;
`;

const ScrollBar = styled.div`
  background-color: ${(props) => props.theme.color.black7};
  border-radius: 5px;
`;

interface DimModalProps {
  header: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
  visible: boolean;
  setVisible: (a: any) => any;
  handleSubmit?: (e: React.FormEvent) => void;
}

const DimModal: React.FC<PropsWithChildren<DimModalProps>> = ({
  header,
  body,
  footer,
  visible,
  setVisible,
  handleSubmit,
}: PropsWithChildren<DimModalProps>) => {
  const containerRef = useRef<HTMLFormElement>(null);

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
      <Container ref={containerRef} onSubmit={handleSubmit}>
        <Header>
          <Title>{header}</Title>
          <ModalCloseBox handleClose={handleClose} />
        </Header>
        <Body>
          <Scrollbars renderThumbVertical={() => <ScrollBar className="thumb-vertical" />}>
            {body}
          </Scrollbars>
        </Body>
        <Footer>{footer}</Footer>
      </Container>
    </DimLayer>
  );
};

export default DimModal;
