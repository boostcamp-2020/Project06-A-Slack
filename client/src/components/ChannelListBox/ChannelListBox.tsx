import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import ChannelList from './ChannelList/ChannelList';
import ChannelListHeader from './ChannelListHeader/ChannelListHeader';

const Container = styled.div`
  padding: ${(props) => props.theme.size.s} 0;
`;

const ChannelListBox = ({ channelType }: { channelType: number }): ReactElement => {
  const [channelListVisible, setChannelListVisible] = useState(true);
  return (
    <Container>
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
