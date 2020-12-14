import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import { searchUserRequest } from '@/store/modules/user.slice';
import { useChannelState, useUserState } from '@/hooks';
import { sendMessageRequest } from '@/store/modules/socket.slice';
import { JoinedUser, User } from '@/types';
import { CHANNEL_SUBTYPE, SOCKET_MESSAGE_TYPE } from '@/utils/constants';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeDMRoomName } from '@/utils/utils';
import { FormInput, SubmitButton as SB, CancelButton as CB } from '@/styles/shared';
import { CloseIconBox } from '@/components';

const Container = styled.div`
  padding: 0 28px;
`;

const SearchInput = styled(FormInput)`
  width: 100%;
  height: 50px;
  margin-bottom: 1rem;
  font-size: ${(props) => props.theme.size.l};
`;

const SearchedUserContainer = styled.div`
  width: 100%;
  max-height: 10rem;
  overflow-y: scroll;
  padding: 0 0.2rem;
`;

const SearchedUserBox = styled.div`
  padding: 5px;
  border-radius: 5px;
  ${flex('center', 'flex-start')}
  cursor: pointer;
  color: ${(props) => props.theme.color.lightBlack};
  &:hover {
    color: white;
    background-color: ${(props) => props.theme.color.blue1};
  }
`;

const PickedUserBox = styled.div`
  border-radius: 5px;
  background-color: rgba(29, 155, 209, 0.1);
  ${flex()};
  margin-right: 0.5rem;
`;

const RemoveBox = styled.div``;

const ProfileImg = styled.img`
  width: 2rem;
  height: 2rem;
  object-fit: cover;
  border-radius: 5px 0 0 5px;
`;

const UserName = styled.div`
  font-size: 1rem;
  margin: 0 0.7rem;
  padding-bottom: 0.25rem;
  font-weight: bold;
`;

const SearchResultBox = styled.div`
  ${flex('center', 'flex-start')}
`;

const ModalFooter = styled.div`
  padding: 20px 0;
`;

const SubmitButton = styled(SB)`
  &:disabled {
    cursor: initial;
    color: ${(props) => props.theme.color.black3};
    background-color: ${(props) => props.theme.color.lightGray1};
    border: 1px solid ${(props) => props.theme.color.lightGray1};
  }
  ${flex()};
  margin-left: auto;
`;

interface AddUsersModalBodyProps {
  setAddUsersModalVisible: (a: any) => any;
  isDM: boolean;
}

interface RightSideParams {
  channelId: string;
}

const AddUsersModalBody: React.FC<AddUsersModalBodyProps> = ({
  setAddUsersModalVisible,
  isDM,
}: AddUsersModalBodyProps) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const { searchedUserList } = useUserState();
  const [visible, setVisible] = useState(false);
  const [pickedUsers, setPickedUsers] = useState<User[]>([]);
  const { channelId }: RightSideParams = useParams();
  const { current } = useChannelState();
  const { userInfo } = useUserState();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const debounce = setTimeout(() => {
      dispatch(
        searchUserRequest({
          isDM,
          pickedUsers,
          displayName: text,
          channelId: +channelId,
        }),
      );
      setVisible(true);
    }, 250);

    return () => {
      clearTimeout(debounce);
    };
  }, [text]);

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const clickUser = (user: User) => {
    setPickedUsers([...pickedUsers, user]);
    setVisible(false);
    setText('');
  };

  const handleRemoveUser = (userId: number) => {
    setPickedUsers(pickedUsers.filter((user: User) => user.id !== userId));
  };

  const clickSubmitButton = () => {
    if (!isDM && pickedUsers.length !== 0) {
      // 채널에 유저 추가하는 동작
      if (current && pickedUsers) {
        const users = pickedUsers.map((pu) => ({
          userId: pu.id,
          displayName: pu.displayName,
          image: pu.image,
        }));

        dispatch(
          sendMessageRequest({
            type: SOCKET_MESSAGE_TYPE.CHANNEL,
            subType: CHANNEL_SUBTYPE.UPDATE_CHANNEL_USERS,
            channel: current,
            users,
            room: current?.name as string,
          }),
        );
      }
    } else if (userInfo) {
      // DM을 생성하는 동작
      const name = makeDMRoomName(pickedUsers, userInfo.displayName);

      const users: JoinedUser[] = pickedUsers.reduce(
        (acc: JoinedUser[], cur) => {
          acc.push({ userId: cur.id, displayName: cur.displayName, image: cur.image });
          return acc;
        },
        [{ userId: userInfo.id, displayName: userInfo.displayName, image: userInfo.image }],
      );

      const channel = {
        ownerId: userInfo.id,
        name,
        channelType: 2,
        topic: '',
        isPublic: 0,
        memberCount: 0,
        description: '',
      };

      dispatch(
        sendMessageRequest({
          type: SOCKET_MESSAGE_TYPE.CHANNEL,
          subType: CHANNEL_SUBTYPE.MAKE_DM,
          channel,
          users,
        }),
      );
    }
    setAddUsersModalVisible(false);
  };

  return (
    <Container>
      <SearchResultBox>
        {pickedUsers.map((user) => (
          <PickedUserBox key={user.id}>
            <ProfileImg src={user.image} />
            <UserName>{user.displayName}</UserName>
            <RemoveBox onClick={() => handleRemoveUser(user.id)}>
              <CloseIconBox />
            </RemoveBox>
          </PickedUserBox>
        ))}
      </SearchResultBox>
      <SearchInput
        ref={inputRef}
        onChange={changeText}
        value={text}
        placeholder="Search by name, email, or user group"
      />
      {visible && (
        <SearchedUserContainer>
          {searchedUserList?.map((user: User) => (
            <SearchedUserBox key={user.id} onClick={() => clickUser(user)}>
              <ProfileImg src={user.image} />
              <UserName>{user.displayName}</UserName>
            </SearchedUserBox>
          ))}
        </SearchedUserContainer>
      )}
      <ModalFooter>
        <SubmitButton onClick={clickSubmitButton} disabled={pickedUsers.length === 0}>
          Done
        </SubmitButton>
      </ModalFooter>
    </Container>
  );
};

export default AddUsersModalBody;
