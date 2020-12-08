import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useJoinChannelListState, useChannelState } from '@/hooks';
import { flex } from '@/styles/mixin';
import { LockIcon, PoundIcon } from '@/components';

interface ChannelProps {
  picked: boolean;
}

const Channel = styled.div<ChannelProps>`
  ${flex('center', 'flex-center')}
  height: 1.75rem;
  padding: 1rem 0 1rem 1.75rem;
  font-size: 0.95rem;
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
  const { id, name, isPublic } = useJoinChannelListState(idx);
  const { current } = useChannelState();

  const picked = id === current?.id;

  return (
    <Link to={`/client/1/${id}`}>
      <Channel picked={picked}>
        <Icon>
          {isPublic ? (
            <PoundIcon size="12px" color={picked ? 'white' : undefined} />
          ) : (
            <LockIcon size="11.2px" color={picked ? 'white' : undefined} />
          )}
        </Icon>
        <Name>{name}</Name>
      </Channel>
    </Link>
  );
};

export default ChannelItem;
