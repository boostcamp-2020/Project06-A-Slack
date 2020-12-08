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
  const { id, name, isPublic } = useJoinChannelListState(idx);
  const { current } = useChannelState();

  const picked = id === current?.id;

  const onClick = () => {
    // 현재 picked 된거 바꿔주는 작업 필요합, 채널 접었다 폇다 하는거 어디갓지?
    // 마지막 채널 갱신을 담당하는 사가는 삭제함, 그 작업은 채널 불러오면서 처리하기로 함
  };

  return (
    <Link to={`/client/1/${id}`}>
      <Channel onClick={onClick} picked={picked}>
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
