import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import { matchUsersRequest } from '@/store/modules/user.slice';
import { useChannelState, useUserState } from '@/hooks';
import { createChannelRequest } from '@/store/modules/channel.slice';
import { sendMessageRequest } from '@/store/modules/socket.slice';
import { JoinedUser, User } from '@/types';
import { CHANNEL_SUBTYPE, SOCKET_MESSAGE_TYPE } from '@/utils/constants';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeDMRoomName } from '@/utils/utils';
import { Channel } from 'redux-saga';

interface Props {
  visible: boolean;
}

const Container = styled.div``;

const Input = styled.input`
  display: block;
  width: 100%;
  font-size: ${(props) => props.theme.size.l};
  border: 1px ${(props) => props.theme.color.gray4} solid;
  border-radius: 3px;
  width: 100%;
  height: 50px;
  padding: 0 5px;
  &:focus {
    transition: 0.3s;
    box-shadow: ${(props) => props.theme.boxShadow.skyblue};
  }
`;

const Item = styled.div`
  padding: 5px;
  ${flex('center', 'flex-start')}
`;

const Img = styled.img`
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 2px;
`;

const Name = styled.div`
  font-size: 0.8rem;
  margin-left: 10px;
`;

const MatchUsersInfoBox = styled.div<Props>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  margin-top: 1rem;
  overflow-y: scroll;
`;

const PickUsersBox = styled.div`
  ${flex('center', 'flex-start')}
`;

const PickUserItem = styled.div`
  border: 1px ${(props) => props.theme.color.gray4} solid;
  border-radius: 2px;
  display: inline-flex;
  margin: 0 0 5px 10px;
  padding: 2px;
`;

const PickUserInfo = styled.div`
  ${flex()}
  margin-right: 5px;
`;

const RemoveButton = styled.button`
  font-size: 0.8rem;
`;

const SubmitButton = styled.button`
  font-size: 1.5rem;
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
  const { matchUsersInfo } = useUserState();
  const [visible, setVisible] = useState(false);
  const [pickUsers, setPickUsers] = useState<User[]>([]);
  const { channelId }: RightSideParams = useParams();
  const { current } = useChannelState();
  const { userInfo } = useUserState();

  useEffect(() => {
    const debounce = setTimeout(() => {
      dispatch(matchUsersRequest({ isDM, pickUsers, displayName: text, channelId: +channelId }));
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
    setPickUsers([...pickUsers, user]);
    setVisible(false);
    setText('');
  };

  const clickRemoveButton = (userId: number) => {
    setPickUsers(pickUsers.filter((user: User) => user.id !== userId));
  };

  const clickSubmitButton = () => {
    if (!isDM && pickUsers.length !== 0) {
      if (current && pickUsers) {
        // TODO !! 로직 변경
        const users = pickUsers.map((pu) => ({
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
      const name = makeDMRoomName(pickUsers, userInfo.displayName);

      const users: JoinedUser[] = pickUsers.reduce(
        (acc: any, cur) => {
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
      <PickUsersBox>
        {pickUsers.map((user) => (
          <PickUserItem key={user.id}>
            <PickUserInfo>
              <Img src={user.image} />
              <Name>{user.displayName}</Name>
            </PickUserInfo>
            <RemoveButton onClick={() => clickRemoveButton(user.id)}>삭제</RemoveButton>
          </PickUserItem>
        ))}
      </PickUsersBox>
      <Input onChange={changeText} value={text} />
      <MatchUsersInfoBox visible={visible}>
        {matchUsersInfo?.map((user: User) => (
          <Item key={user.id} onClick={() => clickUser(user)}>
            <Img src={user.image} />
            <Name>{user.displayName}</Name>
          </Item>
        ))}
      </MatchUsersInfoBox>
      <SubmitButton onClick={clickSubmitButton} disabled={pickUsers.length === 0}>
        제출
      </SubmitButton>
    </Container>
  );
};

export default AddUsersModalBody;
