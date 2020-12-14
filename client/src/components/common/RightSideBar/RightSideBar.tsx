import React from 'react';
import styled from 'styled-components';
import RightSideBarHeader from './RightSideBarHeader/RightSideBarHeader';
import RightSideBarBody from './RightSideBarBody/RightSideBarBody';

const Container = styled.div`
  width: 25rem;
  display: flex;
  flex-direction: column;
`;

interface RightSideBarProps {
  url: string;
  header: React.ReactNode;
  body: React.ReactNode;
}

const RightSideBar: React.FC<RightSideBarProps> = ({ url, header, body }: RightSideBarProps) => {
  return (
    <Container>
      <RightSideBarHeader url={url}>{header}</RightSideBarHeader>
      <RightSideBarBody>{body}</RightSideBarBody>
    </Container>
  );
};

export default RightSideBar;
