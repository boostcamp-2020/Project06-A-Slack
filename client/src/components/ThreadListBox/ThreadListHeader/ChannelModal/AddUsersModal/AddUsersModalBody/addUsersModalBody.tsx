/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import { joinChannelRequset } from '@/store/modules/channel.slice';
import { getUsersRequest, matchUsersRequest } from '@/store/modules/user.slice';
import { useChannelState, useUserState } from '@/hooks';
import { User } from '@/types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

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
  setAddUsersModalVisible: (fn: (state: boolean) => boolean) => void;
  first: boolean;
}

interface RightSideParams {
  channelId: string;
}

const AddUsersModalBody: React.FC<AddUsersModalBodyProps> = ({
  setAddUsersModalVisible,
  first,
}: AddUsersModalBodyProps) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const { matchUsersInfo } = useUserState();
  const [visible, setVisible] = useState(false);
  const [pickUsers, setPickUsers] = useState<User[]>([]);
  const { channelId }: RightSideParams = useParams();

  useEffect(() => {
    const throttle = setTimeout(() => {
      dispatch(matchUsersRequest({ pickUsers, displayName: text, channelId: +channelId }));
      setVisible(true);
    }, 500);

    return () => {
      window.clearTimeout(throttle);
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
    if (!first) {
      dispatch(joinChannelRequset({ users: pickUsers, channelId: +channelId }));
      setAddUsersModalVisible((state) => !state);
    }
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
