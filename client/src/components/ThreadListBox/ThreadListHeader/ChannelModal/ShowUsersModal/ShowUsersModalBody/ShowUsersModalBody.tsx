/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import { useChannelState } from '@/hooks';
import { JoinedUser } from '@/types';
import { DimModal } from '@/components';
import { AddUsersModalHeader, AddUsersModalBody } from '../../AddUsersModal';

const AddButton = styled.button`
  display: block;
  background: none;
  border: none;
  font-size: ${(props) => props.theme.size.m};
  color: ${(props) => props.theme.color.blue2};
  &:hover {
    color: ${(props) => props.theme.color.blue3};
    text-decoration: underline;
  }
`;

const Main = styled.div``;

const Item = styled.div`
  width: 100%;
  padding: 5px;
  ${flex('center', 'space-between')}
`;

const UserInfo = styled.div`
  width: 200px;
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
  background: ${(props) => props.theme.color.white};
  border: 1px ${(props) => props.theme.color.gray3} solid;
  border-radius: 3px;
`;

interface ShowUsersModalBody {
  setShowUsersModalVisible: (fn: (state: boolean) => boolean) => void;
}

const ShowUsersModalBody: React.FC<ShowUsersModalBody> = ({
  setShowUsersModalVisible,
}: ShowUsersModalBody) => {
  const { users } = useChannelState();
  const [addUsersModalVisible, setAddUsersModalVisible] = useState(false);

  const clickAddUsersModal = () => {
    // setShowUsersModalVisible((state: boolean) => !state);
    setAddUsersModalVisible(true);
  };

  return (
    <>
      {addUsersModalVisible && (
        <DimModal
          header={<AddUsersModalHeader first={false} />}
          body={
            <AddUsersModalBody setAddUsersModalVisible={setAddUsersModalVisible} first={false} />
          }
          visible={addUsersModalVisible}
          setVisible={clickAddUsersModal}
        />
      )}
      <Main>
        <AddButton onClick={clickAddUsersModal}>Add Users</AddButton>
        {users?.map((user: JoinedUser) => (
          <Item key={user.userId}>
            <UserInfo>
              <Img src={user.image} />
              <Name>{user.displayName}</Name>
            </UserInfo>
            <Remove>Remove</Remove>
          </Item>
        ))}
      </Main>
    </>
  );
};

export default ShowUsersModalBody;
