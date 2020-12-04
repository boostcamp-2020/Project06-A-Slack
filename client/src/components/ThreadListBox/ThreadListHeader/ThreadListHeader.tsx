import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useChannelState, useUserState } from '@/hooks';
import styled from 'styled-components';
import { makeUserIcons } from '@/utils/utils';
import { CHANNEL_TYPE } from '@/utils/constants';
import { JoinUser } from '@/types';
import { Link, useParams } from 'react-router-dom';
import { loadChannelRequest, modifyLastChannelRequest } from '@/store/modules/channel.slice';
import { DimModal, LockIcon, PoundIcon } from '@/components';
import theme from '@/styles/theme';
import { flex } from '@/styles/mixin';
import { AddUsersModalHeader, AddUsersModalBody } from './ChannelModal/AddUsersModal';
import { AddTopicModalHeader, AddTopicModalBody } from './ChannelModal/AddTopicModal';
import { ShowUsersModalHeader, ShowUsersModalBody } from './ChannelModal/ShowUsersModal';

const Container = styled.div`
  ${flex('center', 'space-between')}
  width: 100%;
  padding: 0 0.4rem;
  border: 1px solid black;
  background-color: white;
`;

const LeftBox = styled.div`
  margin-left: 0.7rem;
`;

const LeftTopBox = styled.div``;

const ChannelTitle = styled.span`
  color: ${(props) => props.theme.color.lightBlack};
  font-size: 0.95rem;
  font-weight: 800;
  margin-left: 0.2rem;
`;

const AddTopicText = styled.span`
  background: unset;
  color: ${(props) => props.theme.color.black8};
  font-size: 0.7rem;
  border: none;
  outline: none;
  cursor: pointer;
`;

const RightBox = styled.div`
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RightUserBox = styled.div`
  display: flex;
  align-items: center;
`;

const RightUser = styled.img`
  display: block;
  width: 30px;
  height: 30px;
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

const ThreadListHeader = () => {
  const dispatch = useDispatch();
  const { current, users } = useChannelState();
  const { userInfo } = useUserState();
  const [addUsersModalVisible, setAddUsersModalVisible] = useState(false);
  const [addTopicModalVisible, setAddTopicModalVisible] = useState(false);
  const [showUsersModalVisible, setShowUsersModalVisible] = useState(false);
  const { channelId }: RightSideParams = useParams();

  useEffect(() => {
    dispatch(loadChannelRequest(channelId));
    if (userInfo) {
      dispatch(modifyLastChannelRequest({ lastChannelId: +channelId, userId: userInfo.id }));
    }
  }, [channelId]);

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
        <LeftBox>
          <LeftTopBox>
            {current?.isPublic ? (
              <PoundIcon size="0.7rem" color={theme.color.lightBlack} />
            ) : (
              <LockIcon size="0.7rem" color={theme.color.lightBlack} />
            )}
            <ChannelTitle>{current?.name}</ChannelTitle>
          </LeftTopBox>
          {current?.channelType === CHANNEL_TYPE.CHANNEL && (
            <AddTopicText onClick={clickAddTopicModal}>
              {current?.topic ?? 'Add a topic'}
            </AddTopicText>
          )}
        </LeftBox>
        <RightBox>
          {current?.channelType === CHANNEL_TYPE.CHANNEL && (
            <RightUserBox onClick={clickShowUsersModal}>
              {makeUserIcons(users).map((icon: JoinUser) => (
                <RightUser key={icon.userId} src={icon.image} />
              ))}
              {users?.length}
            </RightUserBox>
          )}
          <RightButton onClick={clickAddUsersModal}>O</RightButton>
          <Link to={`/client/1/${channelId}/detail`}>
            <RightButton>i</RightButton>
          </Link>
        </RightBox>
      </Container>
    </>
  );
};

export default ThreadListHeader;
