import React from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import { Link } from 'react-router-dom';

const Container = styled.div`
  background-color: orange;
  ${flex('center', 'space-between')};
`;

const LeftSideBox = styled.div``;

interface RightSideBarHeaderProps {
  title: string;
  channelId: number;
  channelName: string;
}

const RightSideBarHeader: React.FC<RightSideBarHeaderProps> = ({
  title,
  channelId,
  channelName,
}: RightSideBarHeaderProps) => {
  return (
    <Container>
      <LeftSideBox>
        <div>{title}</div>
        <div>{channelName}</div>
      </LeftSideBox>
      <Link to={`/client/1/${channelId}`}>
        <button type="button">X</button>
      </Link>
    </Container>
  );
};

export default RightSideBarHeader;
