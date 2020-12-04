import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useChannelState, useUserState } from '@/hooks';
import styled from 'styled-components';
import { CHANNEL_TYPE } from '@/utils/constants';
import { JoinedUser } from '@/types';
import { Link, useParams } from 'react-router-dom';
import { loadChannelRequest, modifyLastChannelRequest } from '@/store/modules/channel.slice';
import { DimModal, LockIcon, PoundIcon, WarningIcon, AddUserIcon } from '@/components';
import theme from '@/styles/theme';
import { flex, hoverActive } from '@/styles/mixin';
import { AddUsersModalHeader, AddUsersModalBody } from './ChannelModal/AddUsersModal';
import { AddTopicModalHeader, AddTopicModalBody } from './ChannelModal/AddTopicModal';
import { ShowUsersModalHeader, ShowUsersModalBody } from './ChannelModal/ShowUsersModal';

const Container = styled.div`
  ${flex('center', 'space-between')}
  width: 100%;
  height: 4.3rem;
  padding: 0 1.3rem;
  border: 1px solid ${(props) => props.theme.color.lightGray2};
  background-color: white;
`;

const LeftBox = styled.div``;

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
  ${flex()}
`;

const UserImgBox = styled.div`
  ${flex()}
  padding:0.1rem;
  margin-right: 0.5rem;
  cursor: pointer;
  border-radius: 5px;
  ${hoverActive}
`;

const UserImg = styled.img`
  display: block;
  width: 1.6rem;
  height: 1.6rem;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  margin-left: -0.5rem;
`;

const UserCount = styled.span`
  margin: 0 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;
  color: ${(props) => props.theme.color.black3};
`;

const AddUserBox = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  ${flex()};
  border-radius: 5px;
  margin-left: 0.2rem;
  ${hoverActive}
`;

const InfoIconBox = styled(AddUserBox)``;

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
            <UserImgBox onClick={clickShowUsersModal}>
              {users.slice(0, 3).map((icon: JoinedUser) => (
                <UserImg key={icon.userId} src={icon.image} />
              ))}
              <UserCount>{users?.length}</UserCount>
            </UserImgBox>
          )}
          <AddUserBox onClick={clickAddUsersModal}>
            <AddUserIcon size="1.4rem" />
          </AddUserBox>
          <Link to={`/client/1/${channelId}/detail`}>
            <InfoIconBox>
              <WarningIcon size="1.1rem" color={theme.color.black5} />
            </InfoIconBox>
          </Link>
        </RightBox>
      </Container>
    </>
  );
};

export default ThreadListHeader;
