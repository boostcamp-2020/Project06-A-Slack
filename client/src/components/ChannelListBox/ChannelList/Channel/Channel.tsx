/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { RootState } from '@/store/modules';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onChangeCurrent } from '@/store/modules/channels';
import styled from 'styled-components';

interface Args {
  key: number;
  idx: number;
}

const ChannelWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 20px;
  font-size: 20px;
  color: #fff;
  &: hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const IconWrapper = styled.div`
  margin-right: 15px;
`;

const NameWrapper = styled.div``;

const Channel = (args: Args) => {
  const dispatch = useDispatch();
  const { id, name, isPublic, current } = useSelector((state: RootState) => ({
    id: state.channels.channelList[args.idx].id,
    name: state.channels.channelList[args.idx].name,
    isPublic: state.channels.channelList[args.idx].isPublic,
    current: state.channels.current,
  }));

  const onClick = useCallback(() => {
    dispatch(onChangeCurrent(id));
  }, []);

  return (
    <ChannelWrapper onClick={onClick} role="button">
      <IconWrapper>{isPublic === 1 ? '#' : 'O'}</IconWrapper>
      <NameWrapper>{name}</NameWrapper>
    </ChannelWrapper>
  );
};

export default Channel;
