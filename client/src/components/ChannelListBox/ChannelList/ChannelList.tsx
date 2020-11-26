/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadChannelsRequest } from '@/store/modules/channels';
import { RootState } from '@/store/modules';
import { useChannels } from '@/hooks/useChannels';
import Channel from './Channel/Channel';

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
  }, []);

  return (
    <>
      {channelList?.map((channel: ChannelItem, idx: number) =>
        !showList ? (
          current === channel.id ? (
            <Channel idx={idx} key={channel.id} />
          ) : (
            ''
          )
        ) : (
          <Channel idx={idx} key={channel.id} />
        ),
      )}
    </>
  );
};

export default ChannelList;
