/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { openChannelList, openAddChannelModal } from '@/store/modules/channel';
import styled from 'styled-components';
import { useChannel } from '@/hooks/useChannel';
import { flex } from '@/styles/mixin';
import { useOnClickOutside } from '@/hooks/useOnClickOutsideState';

interface Props {
  pick: boolean;
  theme: any;
  ref: any;
}

const Container = styled.div`
  ${flex('center', 'space-between')}
  margin-bottom: 10px;
`;

const PopupBox = styled.div`
  position: relative;
`;

const Button = styled.button`
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

const Content = styled.div`
  color: #fff;
  font-size: 12px;
`;

const Popup = styled.div<Props>`
  position: absolute;
  border-radius: 5px;
  display: ${(props) => (props.pick ? 'block' : 'none')};
  top: 30px;
  left: -10px;
  width: 200px;
  padding: ${(props) => props.theme.size.l} 0;
  background: ${(props) => props.theme.color.white};
`;

const PopupItem = styled.div`
  padding: 5px 30px;
  font-size: ${(props) => props.theme.size.m};
  color: ${(props) => props.theme.color.black3};
  &:hover {
    background: ${(props) => props.theme.color.blue};
  }
`;

const ChannelListBox = () => {
  const ref = useRef();
  const [addPopupVisible, setAddPopupVisible] = useState(false);
  const [morePopupVisible, setMorePopupVisible] = useState(false);

  const dispatch = useDispatch();
  const { channelListVisible } = useChannel();

  const clickChannel = () => dispatch(openChannelList());
  useOnClickOutside(ref, () => setAddPopupVisible(false));
  useOnClickOutside(ref, () => setMorePopupVisible(false));

  const clickAdd = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setAddPopupVisible((state) => !state);
  };

  const clickMore = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setMorePopupVisible((state) => !state);
  };

  const clickAddChannelModal = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(openAddChannelModal());
  };

  return (
    <Container>
      <SubWrapper>
        <Button onClick={clickChannel}>{channelListVisible ? '▽' : '▷'}</Button>
        <Content onClick={clickChannel}>Channels</Content>
      </SubWrapper>
      <SubWrapper>
        <PopupBox onClick={clickMore}>
          <Button>፧</Button>
          <Popup pick={morePopupVisible} ref={ref}>
            <PopupItem onClick={clickAddChannelModal}>Add Channels</PopupItem>
            <PopupItem>Browse Channels</PopupItem>
          </Popup>
        </PopupBox>
        <PopupBox onClick={clickAdd}>
          <Button>+</Button>
          <Popup pick={addPopupVisible} ref={ref}>
            <PopupItem onClick={clickAddChannelModal}>Add Channels</PopupItem>
            <PopupItem>Browse Channels</PopupItem>
          </Popup>
        </PopupBox>
      </SubWrapper>
    </Container>
  );
};

export default ChannelListBox;
