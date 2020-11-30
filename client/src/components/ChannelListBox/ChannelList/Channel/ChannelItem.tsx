import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrent, loadChannelRequest } from '@/store/modules/channel';
import styled from 'styled-components';
import { useChannelList, useChannel } from '@/hooks/useChannel';

interface Args {
  key: number;
  idx: number;
}

interface Props {
  pick: boolean;
  theme: any;
}

const Channel = styled.div<Props>`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.size.m};
  font-size: ${(props) => props.theme.size.m};
  color: #fff;
  &:hover {
    ${(props) => (!props.pick ? 'background: rgba(0, 0, 0, 0.2);' : '')}
  }
  background: ${(props) => (props.pick ? props.theme.color.blue : 'transparent')};
`;

const Icon = styled.div`
  margin-right: 15px;
`;

const Name = styled.div``;

const ChannelItem = (args: Args) => {
  const dispatch = useDispatch();
  const { id, name, isPublic } = useChannelList(args.idx);
  const { current } = useChannel();

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    dispatch(setCurrent(args.idx));
    dispatch(loadChannelRequest(id));
  };

  return (
    <Channel onClick={onClick} pick={id === current?.id}>
      <Icon>{isPublic ? '#' : 'O'}</Icon>
      <Name>{name}</Name>
    </Channel>
  );
};

export default ChannelItem;
