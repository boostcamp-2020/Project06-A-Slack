import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import { Link } from 'react-router-dom';
import { CloseIconBox } from '@/components';

const Container = styled.div`
  ${flex('center', 'space-between')}
  width: 100%;
  height: 4.3rem;
  flex-shrink: 0;
  padding: 0 1.3rem;
  border-bottom: 1px solid ${(props) => props.theme.color.lightGray2};
  background-color: white;
`;

const LeftBox = styled.div``;
interface RightSideBarHeaderProps {
  url: string;
  children: React.ReactNode;
}

const RightSideBarHeader: React.FC<PropsWithChildren<RightSideBarHeaderProps>> = ({
  url,
  children,
}: PropsWithChildren<RightSideBarHeaderProps>) => {
  return (
    <Container>
      <LeftBox>{children}</LeftBox>
      <Link to={url}>
        <CloseIconBox />
      </Link>
    </Container>
  );
};

export default RightSideBarHeader;
