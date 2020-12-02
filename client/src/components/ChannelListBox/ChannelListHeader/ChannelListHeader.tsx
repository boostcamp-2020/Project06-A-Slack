/* eslint-disable @typescript-eslint/ban-types */
import React, { useState, useRef, ReactElement } from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import { useOnClickOutside } from '@/hooks';
import CreateChannelModal from '@/components/ChannelModal/CreateChannelModal';
import { CHANNELTYPE } from '@/utils/constants';

interface Props {
  pick: boolean;
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
    background: ${(props) => props.theme.color.blue1};
  }
`;

const ChannelListBox = ({
  channelType,
  channelListVisible,
  setChannelListVisible,
}: {
  channelType: number;
  setChannelListVisible: (fn: (state: boolean) => boolean) => void;
  channelListVisible: boolean;
}): ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const [addChannelsModalVisible, setAddChannelsModalVisible] = useState(false);
  const [sectionOptionsModalVisible, setSectionOptionsModalVisible] = useState(false);
  const [createChannelModalVisible, setCreateChannelModalVisible] = useState(false);

  const clickChannel = () => {
    setChannelListVisible((state: boolean) => !state);
  };

  useOnClickOutside(ref, () => setAddChannelsModalVisible(false));
  useOnClickOutside(ref, () => setSectionOptionsModalVisible(false));

  const clickAdd = () => {
    setAddChannelsModalVisible((state) => !state);
  };

  const clickMore = () => {
    setSectionOptionsModalVisible((state) => !state);
  };

  const clickAddChannelModal = () => {
    setCreateChannelModalVisible((state) => !state);
  };

  return (
    <>
      {createChannelModalVisible && (
        <CreateChannelModal setCreateChannelModalVisible={setCreateChannelModalVisible} />
      )}
      <Container>
        <SubWrapper>
          <Button onClick={clickChannel}>{channelListVisible ? '▽' : '▷'}</Button>
          <Content onClick={clickChannel}>
            {channelType === CHANNELTYPE.CHANNEL ? 'Channels' : 'Direct Messages'}
          </Content>
        </SubWrapper>
        <SubWrapper>
          <PopupBox onClick={clickMore}>
            <Button>፧</Button>
            <Popup pick={sectionOptionsModalVisible} ref={ref}>
              <PopupItem onClick={clickAddChannelModal}>Add Channels</PopupItem>
              <PopupItem>Browse Channels</PopupItem>
            </Popup>
          </PopupBox>
          <PopupBox onClick={clickAdd}>
            <Button>+</Button>
            <Popup pick={addChannelsModalVisible} ref={ref}>
              <PopupItem onClick={clickAddChannelModal}>
                {channelType === CHANNELTYPE.CHANNEL ? 'Add Channels' : '임시 유저 추가'}
              </PopupItem>
            </Popup>
          </PopupBox>
        </SubWrapper>
      </Container>
    </>
  );
};

export default ChannelListBox;
