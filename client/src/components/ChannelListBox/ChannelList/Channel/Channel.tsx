/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { RootState } from '@/store/modules';
import React, { Component, ReactChild, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onChangeCurrent } from '@/store/modules/channels';
import styled from 'styled-components';
import { useChannelList, useChannels } from '@/hooks/useChannels';

interface Args {
  key: number;
  idx: number;
}

interface Props {
  background: boolean;
}

const ChannelWrapper = styled.div<Props>`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 20px;
  font-size: 20px;
  color: #fff;
  &: hover {
    background: rgba(0, 0, 0, 0.2);
  }
  background: ${(props: Props) => (props.background ? 'blue' : 'transparent')};
`;

const IconWrapper = styled.div`
  margin-right: 15px;
`;

const NameWrapper = styled.div``;

const Channel = (args: Args) => {
  const dispatch = useDispatch();
  const { id, name, isPublic } = useChannelList(args.idx);
  const { current } = useChannels();

  const onClick = useCallback(() => {
    dispatch(onChangeCurrent(id));
  }, []);

  return (
    <ChannelWrapper onClick={onClick} role="button" background={id === current}>
      <IconWrapper>{isPublic === 1 ? '#' : 'O'}</IconWrapper>
      <NameWrapper>{name}</NameWrapper>
    </ChannelWrapper>
  );
};

export default Channel;
