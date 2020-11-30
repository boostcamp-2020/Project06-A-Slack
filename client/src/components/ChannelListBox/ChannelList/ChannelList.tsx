/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadJoinChannelsRequest } from '@/store/modules/channel';
import { useChannel } from '@/hooks/useChannel';
import { useAuth } from '@/hooks/useAuth';
import ChannelItem from './Channel/ChannelItem';

interface ChannelItem {
  id: number;
  ownerId: number;
  name: string;
  channelType: string;
  isPublic: number;
  memberCount: number;
  description: string;
}

const ChannelList = () => {
  const dispatch = useDispatch();
  const { joinChannelList, channelListVisible, current } = useChannel();
  const { userId } = useAuth();

  const callAPI = () => dispatch(loadJoinChannelsRequest(userId));

  useEffect(() => {
    callAPI();
  }, [dispatch]);

  return (
    <>
      {joinChannelList?.map((channel: ChannelItem, idx: number) =>
        !channelListVisible ? (
          current?.id === channel.id ? (
            <ChannelItem idx={idx} key={channel.id} />
          ) : (
            ''
          )
        ) : (
          <ChannelItem idx={idx} key={channel.id} />
        ),
      )}
    </>
  );
};

export default ChannelList;
