/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadMyChannelsRequest } from '@/store/modules/channel';
import { useChannel, useAuth } from '@/hooks';
import { Channel } from '@/types';
import ChannelItem from './Channel/ChannelItem';

const ChannelList = ({
  channelType,
  channelListVisible,
}: {
  channelType: number;
  channelListVisible: boolean;
}) => {
  const dispatch = useDispatch();
  const { joinChannelList, current } = useChannel();
  const { userId } = useAuth();

  const callAPI = () => dispatch(loadMyChannelsRequest(userId));

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <>
      {joinChannelList?.map((channel: Channel, idx: number) =>
        channelType === channel.channelType ? (
          !channelListVisible ? (
            current?.id === channel.id ? (
              <ChannelItem idx={idx} key={channel.id} />
            ) : (
              ''
            )
          ) : (
            <ChannelItem idx={idx} key={channel.id} />
          )
        ) : (
          ''
        ),
      )}
    </>
  );
};

export default ChannelList;
