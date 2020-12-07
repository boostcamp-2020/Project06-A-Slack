import React from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { loadChannelRequest } from '@/store/modules/channel.slice';
import { useJoinChannelListState, useChannelState } from '@/hooks';
import { flex } from '@/styles/mixin';
import { LockIcon, PoundIcon } from '@/components';

interface ChannelProps {
  picked: boolean;
}

const Channel = styled.div<ChannelProps>`
  ${flex('center', 'flex-center')}
  height: 1.75rem;
  padding-left: 2rem;
  font-size: ${(props) => props.theme.size.m};
  color: ${(props) =>
    props.picked ? props.theme.color.semiWhite : props.theme.color.channelItemColor};
  &:hover {
    ${(props) =>
      !props.picked &&
      css`
        background: rgba(0, 0, 0, 0.2);
      `}
  }
  background: ${(props) => (props.picked ? props.theme.color.blue1 : 'transparent')};
`;

const Icon = styled.div`
  margin-right: 15px;
`;

const Name = styled.span`
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface ChannelItemProps {
  idx: number;
}

const ChannelItem = ({ idx }: ChannelItemProps) => {
  const dispatch = useDispatch();
  const { id, name, isPublic } = useJoinChannelListState(idx);
  const { current } = useChannelState();

  const picked = id === current?.id;

  const onClick = () => {
    dispatch(loadChannelRequest(id));
  };

  return (
    <Link to={`/client/1/${id}`}>
      <Channel onClick={onClick} picked={picked}>
        <Icon>
          {isPublic ? (
            <PoundIcon size="0.75rem" color={picked ? 'white' : undefined} />
          ) : (
            <LockIcon size="0.7rem" color={picked ? 'white' : undefined} />
          )}
        </Icon>
        <Name>{name}</Name>
      </Channel>
    </Link>
  );
};

export default ChannelItem;
