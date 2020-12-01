import React, { useState } from 'react';
import { useChannel } from '@/hooks/useChannel';
import styled from 'styled-components';
import { makeUserIcons } from '@/utils/utils';
import { JoinUser } from '@/types';
import { useDispatch } from 'react-redux';
import AddUsersModal from '@/components/ChannelModal/AddUsersModal';
import AddTopicModal from '@/components/ChannelModal/AddTopicModal';
import ShowUsersModal from '@/components/ChannelModal/ShowUsersModal';

const Container = styled.div`
  max-width: 80%;
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

const RightUser = styled.div`
  display: block;
  width: 30px;
  height: 30px;
  border: 1px solid black;
  background: red;
`;

const RightButton = styled.button`
  background: none;
  border: none;
  outline: none;
  font-size: 30px;
`;

const ThreadListHeader = (): React.FC | any => {
  const { current, users, topic } = useChannel();
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [addTopicModalVisible, setAddTopicModalVisible] = useState(false);
  const [showUsersModalVisible, setShowUsersModalVisible] = useState(false);

  const clickDetail = () => {
    // LinkTo 작업
  };

  const clickShowUsersModal = () => {
    setShowUsersModalVisible((state) => !state);
  };

  const clickAddUserModal = () => {
    setAddUserModalVisible((state) => !state);
  };

  const clickAddTopicModal = () => {
    setAddTopicModalVisible((state) => !state);
  };

  return current && users ? (
    <>
      {addUserModalVisible && <AddUsersModal setAddUserModalVisible={clickAddUserModal} />}
      {addTopicModalVisible && <AddTopicModal setAddTopicModalVisible={clickAddTopicModal} />}
      {showUsersModalVisible && <ShowUsersModal setShowUsersModalVisible={clickShowUsersModal} />}
      <Container>
        <Left>
          <LeftTitle>
            {current.isPublic} {current.name}
          </LeftTitle>
          {current.channelType === 1 && (
            <LeftButtonBox>
              <LeftButton>핀</LeftButton>
              <LeftButton onClick={clickAddTopicModal}>{topic}</LeftButton>
            </LeftButtonBox>
          )}
        </Left>
        <Right>
          {current.channelType === 1 && (
            <RightUserBox onClick={clickShowUsersModal}>
              {makeUserIcons(users).map((icon: JoinUser) => (
                <RightUser key={icon.userId}>{icon.userId}</RightUser>
              ))}
              {users?.length}
            </RightUserBox>
          )}
          <RightButton onClick={clickAddUserModal}>O</RightButton>
          <RightButton onClick={clickDetail}>i</RightButton>
        </Right>
      </Container>
    </>
  ) : (
    <></>
  );
};

export default ThreadListHeader;
