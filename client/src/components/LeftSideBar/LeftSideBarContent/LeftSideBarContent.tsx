import React from 'react';
import styled from 'styled-components';
import ChannelListBox from '@/components/ChannelListBox/ChannelListBox';

const Container = styled.div`
  /* overflow-y: scroll; */
`;

const LeftSideBarContent = () => {
  return (
    <Container>
      <ChannelListBox />
    </Container>
  );
};

export default LeftSideBarContent;
