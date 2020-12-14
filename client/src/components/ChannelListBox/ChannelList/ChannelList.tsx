/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadMyChannelsRequest, setReloadMyChannelListFlag } from '@/store/modules/channel.slice';
import { useChannelState, useAuthState } from '@/hooks';
import { Channel } from '@/types';
import ChannelItem from './ChannelItem/ChannelItem';

const ChannelList = ({
  channelType,
  channelListVisible,
}: {
  channelType: number;
  channelListVisible: boolean;
}): ReactElement => {
  const dispatch = useDispatch();
  const { myChannelList, current, reloadMyChannelList } = useChannelState();
  const { userId } = useAuthState();

  useEffect(() => {
    if (userId) {
      dispatch(loadMyChannelsRequest({ userId: +userId }));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (reloadMyChannelList) {
      if (userId) {
        dispatch(loadMyChannelsRequest({ userId: +userId }));
      }
      dispatch(setReloadMyChannelListFlag({ reloadMyChannelList: false }));
    }
  }, [reloadMyChannelList]);

  return (
    <>
      {myChannelList?.map(
        (channel: Channel, idx: number) =>
          channelType === channel.channelType &&
          (!channelListVisible ? (
            current?.id === channel.id && <ChannelItem idx={idx} key={channel.id} />
          ) : (
            <ChannelItem idx={idx} key={channel.id} />
          )),
      )}
    </>
  );
};

export default ChannelList;
