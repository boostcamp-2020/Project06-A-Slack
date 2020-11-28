import React from 'react';
import styled from 'styled-components';
import ChannelList from './ChannelList/ChannelList';
import ChannelListHeader from './ChannelListHeader/ChannelListHeader';

const ChannelListBoxWrapper = styled.div`
  padding: 10px;
`;

const ChannelListBox = () => {
  return (
    <ChannelListBoxWrapper>
      <ChannelListHeader />
      <ChannelList />
    </ChannelListBoxWrapper>
  );
};

export default ChannelListBox;
