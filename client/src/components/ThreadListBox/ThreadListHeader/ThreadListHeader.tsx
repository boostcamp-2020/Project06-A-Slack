import React, { useState } from 'react';
import styled from 'styled-components';
import { CHANNEL_TYPE, USER_DEFAULT_PROFILE_URL } from '@/utils/constants';
import { JoinedUser, Channel } from '@/types';
import { Link, useParams } from 'react-router-dom';
import {
  DimModal,
  LockIcon,
  PoundIcon,
  WarningIcon,
  AddUserIcon,
  AddUsersModalHeader,
  AddUsersModalBody,
} from '@/components';
import theme from '@/styles/theme';
import { flex, hoverActive } from '@/styles/mixin';

import { useChannelState } from '@/hooks';
import { AddTopicModalHeader, AddTopicModalBody } from './ChannelModal/AddTopicModal';
import { ShowUsersModalHeader, ShowUsersModalBody } from './ChannelModal/ShowUsersModal';

const Container = styled.div`
  ${flex('center', 'space-between')}
  width: 100%;
  height: 4.3rem;
  flex-shrink: 0;
  padding: 0 1.3rem;
  border-bottom: 1px solid ${(props) => props.theme.color.lightGray2};
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
  padding: 1px;
  margin-right: 0.5rem;
  cursor: pointer;
  border-radius: 5px;
  ${hoverActive}
`;

interface UserImgProps {
  zIndex: number;
}

const UserImg = styled.img<UserImgProps>`
  display: block;
  width: 1.6rem;
  height: 1.6rem;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  margin-left: -0.3rem;
  z-index: ${(props) => props.zIndex};
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
  const [addUsersModalVisible, setAddUsersModalVisible] = useState(false);
  const [addTopicModalVisible, setAddTopicModalVisible] = useState(false);
  const [showUsersModalVisible, setShowUsersModalVisible] = useState(false);
  const { channelId }: RightSideParams = useParams();
  const { current, users } = useChannelState();

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
          width="520px"
          header={<AddUsersModalHeader isDM={false} />}
          body={<AddUsersModalBody setAddUsersModalVisible={clickAddUsersModal} isDM={false} />}
          visible={addUsersModalVisible}
          setVisible={clickAddUsersModal}
        />
      )}
      {addTopicModalVisible && (
        <DimModal
          width="520px"
          header={<AddTopicModalHeader />}
          body={<AddTopicModalBody setAddTopicModalVisible={clickAddTopicModal} />}
          visible={addTopicModalVisible}
          setVisible={clickAddTopicModal}
        />
      )}
      {showUsersModalVisible && (
        <DimModal
          width="520px"
          header={<ShowUsersModalHeader />}
          body={<ShowUsersModalBody />}
          visible={showUsersModalVisible}
          setVisible={clickShowUsersModal}
          bodyScroll={false}
        />
      )}
      <Container>
        <LeftBox>
          <LeftTopBox>
            {current?.isPublic ? (
              <PoundIcon size="11px" color={theme.color.lightBlack} />
            ) : (
              <LockIcon size="11px" color={theme.color.lightBlack} />
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
            <>
              <UserImgBox onClick={clickShowUsersModal}>
                {users.slice(0, 3).map((icon: JoinedUser, idx: number) => (
                  <UserImg
                    zIndex={3 - idx}
                    key={icon.userId}
                    src={icon.image}
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      e.currentTarget.src = USER_DEFAULT_PROFILE_URL;
                    }}
                  />
                ))}
                <UserCount>{users?.length}</UserCount>
              </UserImgBox>
              <AddUserBox onClick={clickAddUsersModal}>
                <AddUserIcon size="22.5px" />
              </AddUserBox>
            </>
          )}
          <Link to={`/client/1/${channelId}/detail`}>
            <InfoIconBox>
              <WarningIcon size="17.5px" color={theme.color.black5} />
            </InfoIconBox>
          </Link>
        </RightBox>
      </Container>
    </>
  );
};

export default ThreadListHeader;
