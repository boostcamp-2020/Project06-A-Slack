/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import { joinChannelRequset } from '@/store/modules/channel';
import { getUsersRequest } from '@/store/modules/user';
import { useUser } from '@/hooks';
import { User } from '@/types';
import { useDispatch } from 'react-redux';
import { userInfo } from 'os';

const InputContainer = styled.div`
  ${flex()}
  z-index: 5;
`;

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
  width: 7rem;
  padding: 5px;
  ${flex('center', 'space-between')}
`;

const UserInfo = styled.span`
  width: 7rem;
  ${flex('center', 'flex-start')}
`;

const Img = styled.img`
  display: block;
  width: 1rem;
  height: 1rem;
  border-radius: 2px;
`;

const Name = styled.div`
  font-size: 0.8rem;
  margin-left: 10px;
`;

const Remove = styled.button`
  font-size: 1rem;
  background: none;
  border: none;
  border-radius: 3px;
`;

interface AddUsersModalBodyProps {
  setAddUsersModalVisble: (fn: (state: boolean) => boolean) => void;
}

const AddUsersModalBody: React.FC<AddUsersModalBodyProps> = ({
  setAddUsersModalVisble,
}: AddUsersModalBodyProps) => {
  const dispatch = useDispatch();
  const { usersInfo } = useUser();
  const [text, setText] = useState('');
  const [empty, setEmpty] = useState(true);
  let matchUsers: User[] = [];
  useEffect(() => {
    dispatch(getUsersRequest());
  }, []);

  console.log(userInfo);

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (e.target.value === '') {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
    if (!empty) {
      matchUsers = [];
      usersInfo?.map(
        (user) => (user.email === text || user.displayName === text) && matchUsers.push(user),
      );
      usersInfo?.map((user) => {
        console.log(user);
      });
    }
  };

  return (
    <InputContainer>
      <Input onChange={changeText} value={text} />
      {console.log(matchUsers)}
    </InputContainer>
  );
};

export default AddUsersModalBody;
