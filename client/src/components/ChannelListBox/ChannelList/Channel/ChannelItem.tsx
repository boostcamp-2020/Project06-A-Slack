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
  background: boolean;
}

const ChannelWrapper = styled.div<Props>`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 20px;
  font-size: 20px;
  color: #fff;
  &:hover {
    ${(props: Props) => (!props.background ? 'background: rgba(0, 0, 0, 0.2);' : '')}
  }
  background: ${(props: Props) => (props.background ? 'blue' : 'transparent')};
`;

const IconWrapper = styled.div`
  margin-right: 15px;
`;

const NameWrapper = styled.div``;

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
    <ChannelWrapper onClick={onClick} role="button" background={id === current?.id}>
      <IconWrapper>{isPublic === 1 ? '#' : 'O'}</IconWrapper>
      <NameWrapper>{name}</NameWrapper>
    </ChannelWrapper>
  );
};

export default ChannelItem;
