import React from 'react';
import styled from 'styled-components';
import ChannelList from './ChannelList/ChannelList';
import ChannelListHeader from './ChannelListHeader/ChannelListHeader';

const ChannelListBoxWrapper = styled.div`
  border: 2px solid red;
  width: 300px;
  background: #8e44ad;
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
