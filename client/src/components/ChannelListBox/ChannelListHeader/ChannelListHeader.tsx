/* eslint-disable @typescript-eslint/ban-types */
import React, { useState, useRef, ReactElement } from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import { useOnClickOutside } from '@/hooks';
import { CHANNELTYPE } from '@/utils/constants';
import { DimModal, MenuModal } from '@/components/common';
import { CreateChannelModalHeader, CreateChannelModalBody } from './CreateChannelModal';

interface Props {
  pick: boolean;
}

const Container = styled.div`
  position: relative;
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

const ModalListItem = styled.div`
  width: 100%;
  padding: 0.4rem 1.2rem;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: ${(props) => props.theme.color.blue1};
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
  const [addChannelsModalVisible, setAddChannelsModalVisible] = useState(false);
  const [sectionOptionsModalVisible, setSectionOptionsModalVisible] = useState(false);
  const [createChannelModalVisible, setCreateChannelModalVisible] = useState(false);
  const [secret, setSecret] = useState(false);

  const clickChannel = () => {
    setChannelListVisible((state: boolean) => !state);
  };

  const toggleAddChannelsModal = () => {
    setAddChannelsModalVisible((state) => !state);
  };

  const toggleSectionOptionsModal = () => {
    setSectionOptionsModalVisible((state) => !state);
  };

  const clickCreateChannelModal = () => {
    setCreateChannelModalVisible((state) => !state);
  };
  return (
    <>
      {createChannelModalVisible && (
        <DimModal
          header={<CreateChannelModalHeader secret={secret} />}
          body={
            <CreateChannelModalBody
              secret={secret}
              setCreateChannelModalVisible={setCreateChannelModalVisible}
              setSecret={setSecret}
            />
          }
          visible={createChannelModalVisible}
          setVisible={setCreateChannelModalVisible}
        />
      )}
      <Container>
        {addChannelsModalVisible && (
          <MenuModal
            top="1.5rem"
            right="-5rem"
            visible={addChannelsModalVisible}
            setVisible={setAddChannelsModalVisible}
          >
            <ModalListItem onClick={clickCreateChannelModal}>
              {channelType === CHANNELTYPE.CHANNEL ? '채널 추가' : '대화 상대 추가'}
            </ModalListItem>
            <ModalListItem>{channelType === CHANNELTYPE.CHANNEL && '채널 검색'}</ModalListItem>
          </MenuModal>
        )}
        {sectionOptionsModalVisible && (
          <MenuModal
            top="1.5rem"
            right="-3.5rem"
            visible={sectionOptionsModalVisible}
            setVisible={setSectionOptionsModalVisible}
          >
            <ModalListItem onClick={clickCreateChannelModal}>
              {channelType === CHANNELTYPE.CHANNEL ? '채널 추가' : '대화 상대 추가'}
            </ModalListItem>
            <ModalListItem>{channelType === CHANNELTYPE.CHANNEL && '채널 검색'}</ModalListItem>
          </MenuModal>
        )}
        <SubWrapper>
          <Button onClick={clickChannel}>{channelListVisible ? '▽' : '▷'}</Button>
          <Content onClick={clickChannel}>
            {channelType === CHANNELTYPE.CHANNEL ? 'Channels' : 'Direct Messages'}
          </Content>
        </SubWrapper>
        <SubWrapper>
          <PopupBox onClick={toggleSectionOptionsModal}>
            <Button>፧</Button>
          </PopupBox>
          <PopupBox onClick={toggleAddChannelsModal}>
            <Button>+</Button>
          </PopupBox>
        </SubWrapper>
      </Container>
    </>
  );
};

export default ChannelListBox;
