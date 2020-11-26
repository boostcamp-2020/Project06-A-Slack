import React from 'react';
import { useDispatch } from 'react-redux';
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

  const onClick = () => dispatch(onChangeCurrent(id));

  return (
    <ChannelWrapper onClick={onClick} role="button" background={id === current}>
      <IconWrapper>{isPublic === 1 ? '#' : 'O'}</IconWrapper>
      <NameWrapper>{name}</NameWrapper>
    </ChannelWrapper>
  );
};

export default Channel;
