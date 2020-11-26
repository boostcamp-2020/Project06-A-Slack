/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadChannelsRequest } from '@/store/modules/channels';
import { useChannels } from '@/hooks/useChannels';
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
  const { channelList, showList, current } = useChannels();

  const callAPI = () => dispatch(loadChannelsRequest());

  useEffect(() => {
    callAPI();
  }, [dispatch]);

  return (
    <>
      {channelList?.map((channel: ChannelItem, idx: number) =>
        !showList ? (
          current === channel.id ? (
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
