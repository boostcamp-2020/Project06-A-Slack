import { CHANNEL_TYPE } from '@/utils/constants';
import React, { ReactElement, useState } from 'react';
import styled, { css } from 'styled-components';
import ChannelList from './ChannelList/ChannelList';
import ChannelListHeader from './ChannelListHeader/ChannelListHeader';

interface ContainerProps {
  isDM: boolean;
}

const Container = styled.div<ContainerProps>`
  padding: ${(props) => props.theme.size.s} 0;
  ${(props) =>
    props.isDM &&
    css`
      min-height: 200px;
    `}
`;

const ChannelListBox = ({ channelType }: { channelType: number }): ReactElement => {
  const [channelListVisible, setChannelListVisible] = useState(true);
  return (
    <Container isDM={channelType === CHANNEL_TYPE.DM}>
      <ChannelListHeader
        channelType={channelType}
        setChannelListVisible={setChannelListVisible}
        channelListVisible={channelListVisible}
      />
      <ChannelList channelType={channelType} channelListVisible={channelListVisible} />
    </Container>
  );
};

export default ChannelListBox;
