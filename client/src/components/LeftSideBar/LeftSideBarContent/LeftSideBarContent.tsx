import React, { ReactElement } from 'react';
import styled from 'styled-components';
import ChannelListBox from '@/components/ChannelListBox/ChannelListBox';
import { CHANNEL_TYPE } from '@/utils/constants';

const Container = styled.div`
  /* overflow-y: scroll; */
`;

const LeftSideBarContent = (): ReactElement => {
  return (
    <Container>
      <ChannelListBox channelType={CHANNEL_TYPE.CHANNEL} />
      <ChannelListBox channelType={CHANNEL_TYPE.DM} />
    </Container>
  );
};

export default LeftSideBarContent;
