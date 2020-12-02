import React, { ReactElement } from 'react';
import styled from 'styled-components';
import ChannelListBox from '@/components/ChannelListBox/ChannelListBox';
import { CHANNELTYPE } from '@/utils/constants';

const Container = styled.div`
  /* overflow-y: scroll; */
`;

const LeftSideBarContent = (): ReactElement => {
  return (
    <Container>
      <ChannelListBox channelType={CHANNELTYPE.CHANNEL} />
      <ChannelListBox channelType={CHANNELTYPE.DM} />
    </Container>
  );
};

export default LeftSideBarContent;
