import { loadNotJoinedChannelsRequest } from '@/store/modules/findChannel.slice';
import { sendMessageRequest } from '@/store/modules/socket.slice';
import React, { useEffect, useState } from 'react';
import { flex } from '@/styles/mixin';
import styled from 'styled-components';
import { useFindChannelState, useUserState } from '@/hooks';
import { useDispatch } from 'react-redux';
import { Channel } from '@/types';
import { CHANNEL_SUBTYPE, SOCKET_MESSAGE_TYPE } from '@/utils/constants';

const Container = styled.div``;
const ChannelInfo = styled.div``;
const JoinButton = styled.button``;
const ChannelName = styled.div``;

interface FindChannelModalProps {
  setFindChannelModalVisible: (fn: (state: boolean) => boolean) => void;
}

const FindChannelModalBody: React.FC<FindChannelModalProps> = ({
  setFindChannelModalVisible,
}: FindChannelModalProps) => {
  const { userInfo } = useUserState();
  const dispatch = useDispatch();
  const { notJoinedchannelList } = useFindChannelState();

  useEffect(() => {
    if (userInfo) {
      dispatch(loadNotJoinedChannelsRequest({ userId: userInfo.id }));
    }
  }, []);

  const clickJoinButton = ({ channel }: { channel: Channel }) => {
    console.log(channel);
    if (userInfo) {
      const users = [
        { userId: userInfo.id, displayName: userInfo.displayName, image: userInfo.image },
      ];
      dispatch(
        sendMessageRequest({
          type: SOCKET_MESSAGE_TYPE.CHANNEL,
          subType: CHANNEL_SUBTYPE.UPDATE_CHANNEL_USERS,
          channel,
          users,
          room: channel.name,
        }),
      );
      setFindChannelModalVisible((state) => !state);
    }
  };

  return (
    <Container>
      {notJoinedchannelList.map((channel) => (
        <ChannelInfo key={channel.id}>
          <ChannelName>{channel.name}</ChannelName>
          <JoinButton onClick={() => clickJoinButton({ channel })}>Join</JoinButton>
        </ChannelInfo>
      ))}
    </Container>
  );
};

export default FindChannelModalBody;
