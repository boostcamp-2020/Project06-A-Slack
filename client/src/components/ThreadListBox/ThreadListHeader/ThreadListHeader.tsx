import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useChannel } from '@/hooks/useChannel';
import styled from 'styled-components';
import { makeUserIcons } from '@/utils/utils';
import { CHANNEL_TYPE } from '@/utils/constants';
import { JoinUser } from '@/types';
import { useParams } from 'react-router-dom';
import { loadChannelRequest, modifyLastChannelRequest } from '@/store/modules/channel';
import { useUser } from '@/hooks';
import { DimModal } from '@/components/common';
import { AddUsersModalHeader, AddUsersModalBody } from './ChannelModal/AddUsersModal';
import { AddTopicModalHeader, AddTopicModalBody } from './ChannelModal/AddTopicModal';
import { ShowUsersModalHeader, ShowUsersModalBody } from './ChannelModal/ShowUsersModal';

const Container = styled.div`
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid black;
`;

const Left = styled.div`
  border: 1px solid black;
`;

const LeftTitle = styled.div`
  font-size: 20px;
  border: 1px solid black;
`;

const LeftButton = styled.button`
  background: none;
  border: none;
  outline: none;
  font-size: 12px;
`;

const LeftButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80px;
  border: 1px solid black;
  font-size: 16px;
`;

const Right = styled.div`
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
`;

const RightUserBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
`;

const RightUser = styled.img`
  display: block;
  width: 30px;
  height: 30px;
  border: 1px solid black;
`;

const RightButton = styled.button`
  background: none;
  border: none;
  outline: none;
  font-size: 30px;
`;

interface RightSideParams {
  channelId: string;
}

const ThreadListHeader = (): ReactElement | any => {
  const dispatch = useDispatch();
  const { current, users } = useChannel();
  const { userInfo } = useUser();
  const [addUsersModalVisible, setAddUsersModalVisible] = useState(false);
  const [addTopicModalVisible, setAddTopicModalVisible] = useState(false);
  const [showUsersModalVisible, setShowUsersModalVisible] = useState(false);
  const { channelId }: RightSideParams = useParams();

  useEffect(() => {
    dispatch(loadChannelRequest(channelId));
    if (userInfo) {
      dispatch(modifyLastChannelRequest({ lastChannelId: +channelId, userId: userInfo.id }));
    }
  }, [userInfo]);

  const clickDetail = () => {
    // LinkTo 작업
  };

  const clickShowUsersModal = () => {
    setShowUsersModalVisible((state) => !state);
  };

  const clickAddUsersModal = () => {
    setAddUsersModalVisible((state) => !state);
  };

  const clickAddTopicModal = () => {
    setAddTopicModalVisible((state) => !state);
  };

  return (
    <>
      {addUsersModalVisible && (
        <DimModal
          header={<AddUsersModalHeader />}
          body={<AddUsersModalBody setAddUsersModalVisble={clickAddUsersModal} />}
          visible={addUsersModalVisible}
          setVisible={clickAddUsersModal}
        />
      )}
      {addTopicModalVisible && (
        <DimModal
          header={<AddTopicModalHeader />}
          body={<AddTopicModalBody setAddTopicModalVisible={clickAddTopicModal} />}
          visible={addTopicModalVisible}
          setVisible={clickAddTopicModal}
        />
      )}
      {showUsersModalVisible && (
        <DimModal
          header={<ShowUsersModalHeader />}
          body={<ShowUsersModalBody setShowUsersModalVisible={clickShowUsersModal} />}
          visible={showUsersModalVisible}
          setVisible={clickShowUsersModal}
        />
      )}
      <Container>
        <Left>
          <LeftTitle>
            {current?.isPublic} {current?.name}
          </LeftTitle>
          {current?.channelType === CHANNEL_TYPE.CHANNEL && (
            <LeftButtonBox>
              <LeftButton>핀</LeftButton>
              <LeftButton onClick={clickAddTopicModal}>
                {current?.topic === null ? 'Add a topic' : current?.topic}
              </LeftButton>
            </LeftButtonBox>
          )}
        </Left>
        <Right>
          {current?.channelType === CHANNEL_TYPE.CHANNEL && (
            <RightUserBox onClick={clickShowUsersModal}>
              {makeUserIcons(users).map((icon: JoinUser) => (
                <RightUser key={icon.userId} src={icon.image} />
              ))}
              {users?.length}
            </RightUserBox>
          )}
          <RightButton onClick={clickAddUsersModal}>O</RightButton>
          <RightButton onClick={clickDetail}>i</RightButton>
        </Right>
      </Container>
    </>
  );
};

export default ThreadListHeader;
