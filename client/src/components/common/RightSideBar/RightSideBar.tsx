import React from 'react';
import styled from 'styled-components';
import RightSideBarHeader from './RightSideBarHeader/RightSideBarHeader';
import RightSideBarBody from './RightSideBarBody/RightSideBarBody';

const Container = styled.div`
  background-color: orange;
`;

interface RightSideBarProps {
  type: string;
  channelId: number;
}

const RightSideBar: React.FC<RightSideBarProps> = ({ type, channelId }: RightSideBarProps) => {
  return (
    <Container>
      <RightSideBarHeader title={type} channelId={channelId} channelName="channel name" />
      <RightSideBarBody type={type} />
    </Container>
  );
};

export default RightSideBar;
