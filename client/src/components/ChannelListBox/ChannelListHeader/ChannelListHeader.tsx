import React, { useState, ReactElement, useRef } from 'react';
import styled, { css } from 'styled-components';
import { flex } from '@/styles/mixin';
import { CHANNEL_TYPE } from '@/utils/constants';
import { DimModal, ArrowDownIcon, PlusIcon, DotIcon, Popover } from '@/components';
import {
  AddUsersModalHeader,
  AddUsersModalBody,
} from '@/components/ThreadListBox/ThreadListHeader/ChannelModal/AddUsersModal';
import { CreateChannelModalHeader, CreateChannelModalBody } from './CreateChannelModal';

const Container = styled.div`
  position: relative;
  ${flex('center', 'space-between')}
  margin-bottom: 0.65rem;
  cursor: pointer;
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
  cursor: pointer;
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
  rotated: boolean;
}

const ArrowIcon = styled.div<ArrowProps>`
  ${flex()}
  width: 2rem;
  height: 2rem;
  margin: 0 0.4rem;
  color: ${(props) => props.theme.color.white};
  font-size: ${(props) => props.theme.size.m};
  background: transparent;
  border: none;
  border-radius: 5px;
  transition: 0.3s;
  ${(props) =>
    props.rotated &&
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
  const [addUsersModalVisible, setAddUsersModalVisible] = useState(false);
  const [secret, setSecret] = useState(false);

  const toggleChannelList = () => {
    setChannelListVisible((state: boolean) => !state);
  };

  const toggleAddChannelsModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setAddChannelsModalVisible((state) => !state);
  };

  const toggleSectionOptionsModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSectionOptionsModalVisible((state) => !state);
  };

  const clickCreateChannelModal = () => {
    setCreateChannelModalVisible(true);
  };

  const clickAddUsersModal = () => {
    setAddUsersModalVisible((state) => !state);
  };

  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      {createChannelModalVisible && (
        <DimModal
          header={<CreateChannelModalHeader secret={secret} />}
          body={
            // eslint-disable-next-line react/jsx-wrap-multilines
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
      {addUsersModalVisible && (
        <DimModal
          header={<AddUsersModalHeader isDM={channelType !== CHANNEL_TYPE.CHANNEL} />}
          body={<AddUsersModalBody setAddUsersModalVisible={setAddUsersModalVisible} isDM />}
          visible={addUsersModalVisible}
          setVisible={setAddUsersModalVisible}
        />
      )}
      <Container onClick={toggleChannelList}>
        <SubWrapper>
          <ArrowIcon rotated={!channelListVisible}>
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
          <PopupBox onClick={toggleAddChannelsModal} ref={ref}>
            <PlusIconBox>
              <PlusIcon size="22.5px" />
            </PlusIconBox>
          </PopupBox>
        </Controls>
      </Container>
      {addChannelsModalVisible && ref.current && (
        <Popover
          anchorEl={ref.current}
          offset={{ top: 0, left: 5 }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          visible={addChannelsModalVisible}
          setVisible={setAddChannelsModalVisible}
        >
          <ModalListItem
            onClick={
              channelType === CHANNEL_TYPE.CHANNEL ? clickCreateChannelModal : clickAddUsersModal
            }
          >
            {channelType === CHANNEL_TYPE.CHANNEL ? '채널 추가' : '대화 상대 추가'}
          </ModalListItem>
          {channelType === CHANNEL_TYPE.CHANNEL && <ModalListItem>채널 검색</ModalListItem>}
        </Popover>
      )}
    </>
  );
};

export default ChannelListBox;
