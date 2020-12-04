/* eslint-disable @typescript-eslint/ban-types */
import React, { useState, ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { flex } from '@/styles/mixin';
import { CHANNEL_TYPE } from '@/utils/constants';
import { DimModal, MenuModal, ArrowDownIcon, PlusIcon, DotIcon } from '@/components';
import { CreateChannelModalHeader, CreateChannelModalBody } from './CreateChannelModal';

const Container = styled.div`
  position: relative;
  ${flex('center', 'space-between')}
  margin-bottom: 10px;
`;

const PopupBox = styled.div`
  position: relative;
`;

const Controls = styled.div`
  ${flex()}
  margin-right:0.5rem;
`;

const OptionIcon = styled.button`
  ${flex()}
  width: 2rem;
  height: 2rem;
  color: ${(props) => props.theme.color.white};
  font-size: ${(props) => props.theme.size.m};
  background: transparent;
  border: none;
  border-radius: 5px;
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
  outline: 0;
`;

const DotIconBox = styled(OptionIcon)``;
const PlusIconBox = styled(OptionIcon)``;

const SubWrapper = styled.div`
  ${flex()}
`;

const Title = styled.div`
  color: ${(props) => props.theme.color.channelItemColor};
  font-size: 0.9rem;
  user-select: none;
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

interface ArrowProps {
  rotate: boolean;
}

const ArrowIcon = styled.div<ArrowProps>`
  ${flex()}
  width: 1.2rem;
  height: 1.2rem;
  margin: 0 0.5rem;
  color: ${(props) => props.theme.color.white};
  font-size: ${(props) => props.theme.size.m};
  background: transparent;
  border: none;
  transition: 0.3s;
  ${(props) =>
    props.rotate &&
    css`
      transform: rotate(-90deg);
      transition: 0.3s;
    `}
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  outline: 0;
  cursor: pointer;
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

  const toggleAddChannelsModal = (e: any) => {
    e.stopPropagation();
    setAddChannelsModalVisible((state) => !state);
  };

  const toggleSectionOptionsModal = (e: any) => {
    e.stopPropagation();
    setSectionOptionsModalVisible((state) => !state);
  };

  const clickCreateChannelModal = (e: any) => {
    e.stopPropagation();
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
      <Container onClick={clickChannel}>
        {addChannelsModalVisible && (
          <MenuModal
            top="1.5rem"
            right="-5rem"
            visible={addChannelsModalVisible}
            setVisible={setAddChannelsModalVisible}
          >
            <ModalListItem onClick={clickCreateChannelModal}>
              {channelType === CHANNEL_TYPE.CHANNEL ? '채널 추가' : '대화 상대 추가'}
            </ModalListItem>
            <ModalListItem>{channelType === CHANNEL_TYPE.CHANNEL && '채널 검색'}</ModalListItem>
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
              {channelType === CHANNEL_TYPE.CHANNEL ? '채널 추가' : '대화 상대 추가'}
            </ModalListItem>
            <ModalListItem>{channelType === CHANNEL_TYPE.CHANNEL && '채널 검색'}</ModalListItem>
          </MenuModal>
        )}
        <SubWrapper>
          <ArrowIcon rotate={!channelListVisible}>
            <ArrowDownIcon />
          </ArrowIcon>
          <Title>{channelType === CHANNEL_TYPE.CHANNEL ? 'Channels' : 'Direct Messages'}</Title>
        </SubWrapper>
        <Controls>
          <PopupBox onClick={toggleSectionOptionsModal}>
            <DotIconBox>
              <DotIcon />
            </DotIconBox>
          </PopupBox>
          <PopupBox onClick={toggleAddChannelsModal}>
            <PlusIconBox>
              <PlusIcon size="1.4rem" />
            </PlusIconBox>
          </PopupBox>
        </Controls>
      </Container>
    </>
  );
};

export default ChannelListBox;
