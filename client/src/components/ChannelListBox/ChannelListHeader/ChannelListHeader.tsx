/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import { useDispatch } from 'react-redux';
import { openChannelList } from '@/store/modules/channel';
import styled from 'styled-components';
import { useChannel } from '@/hooks/useChannel';
import { flex } from '@/styles/mixin';

const ChannelListHeaderWrapper = styled.div`
  ${flex(undefined, 'space-between')}
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.button`
  color: ${(props) => props.theme.color.white};
  font-size: ${(props) => props.theme.size.m};
  background: transparent;
  border: none;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  outline: 0;
`;

const SubWrapper = styled.div`
  ${flex()}
`;

const ChannelListHeaderContent = styled.div`
  color: #fff;
  font-size: 12px;
`;

const ChannelListBox = () => {
  const dispatch = useDispatch();
  const { channelListVisible } = useChannel();

  const onClick = () => dispatch(openChannelList());

  return (
    <ChannelListHeaderWrapper>
      <SubWrapper>
        <ButtonWrapper onClick={onClick}>{channelListVisible ? '▽' : '▷'}</ButtonWrapper>
        <ChannelListHeaderContent onClick={onClick}>Channels</ChannelListHeaderContent>
      </SubWrapper>
      <SubWrapper>
        <ButtonWrapper>፧</ButtonWrapper>
        <ButtonWrapper>+</ButtonWrapper>
      </SubWrapper>
    </ChannelListHeaderWrapper>
  );
};

export default ChannelListBox;
