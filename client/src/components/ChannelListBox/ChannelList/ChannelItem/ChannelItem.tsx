import React from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { loadChannelRequest } from '@/store/modules/channel.slice';
import { useJoinChannelListState, useChannelState, useAuthState } from '@/hooks';
import { flex } from '@/styles/mixin';

interface Args {
  key: number;
  idx: number;
}

interface Props {
  pick: boolean;
}

const Channel = styled.div<Props>`
  ${flex('center', 'flex-center')}
  height: 1.75rem;
  padding-left: 2rem;
  font-size: ${(props) => props.theme.size.m};
  color: ${(props) =>
    props.pick ? props.theme.color.semiWhite : props.theme.color.channelItemColor};
  &:hover {
    ${(props) =>
      !props.pick &&
      css`
        background: rgba(0, 0, 0, 0.2);
      `}
  }
  background: ${(props) => (props.pick ? props.theme.color.blue1 : 'transparent')};
`;

const Icon = styled.div`
  margin-right: 15px;
`;

const Name = styled.div``;

const ChannelItem = (args: Args) => {
  const dispatch = useDispatch();
  const { id, name, isPublic } = useJoinChannelListState(args.idx);
  const { current } = useChannelState();

  const onClick = () => {
    dispatch(loadChannelRequest(id));
  };

  return (
    <Link to={`/client/1/${id}`}>
      <Channel onClick={onClick} pick={id === current?.id}>
        <Icon>{isPublic ? '#' : 'O'}</Icon>
        <Name>{name}</Name>
      </Channel>
    </Link>
  );
};

export default ChannelItem;
