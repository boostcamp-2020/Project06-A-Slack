import React from 'react';
import styled from 'styled-components';
import ChannelList from './ChannelList/ChannelList';
import ChannelListHeader from './ChannelListHeader/ChannelListHeader';

const Container = styled.div`
  padding: ${(props) => props.theme.size.s} 0;
`;

const ChannelListBox = () => {
  return (
    <Container>
      <ChannelListHeader />
      <ChannelList />
    </Container>
  );
};

export default ChannelListBox;
