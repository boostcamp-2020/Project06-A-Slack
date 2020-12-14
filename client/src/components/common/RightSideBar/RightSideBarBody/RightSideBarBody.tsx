import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`;

interface RightSideBarBodyProps {
  children: React.ReactNode;
}

const RightSideBarBody: React.FC<PropsWithChildren<RightSideBarBodyProps>> = ({
  children,
}: PropsWithChildren<RightSideBarBodyProps>) => {
  return <Container>{children}</Container>;
};

export default RightSideBarBody;
