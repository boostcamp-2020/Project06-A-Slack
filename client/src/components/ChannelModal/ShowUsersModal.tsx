/* eslint-disable @typescript-eslint/ban-types */
import React, { useState, useRef, ReactElement } from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import { useChannel } from '@/hooks';
import { JoinUser } from '@/types';
import AddUsersModal from '@/components/ChannelModal/AddUsersModal';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  ${flex()};
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
`;

const Container = styled.div`
  border-radius: 10px;
  padding: ${(props) => props.theme.size.xxl};
  background: ${(props) => props.theme.color.white};
  width: 500px;
  box-shadow: ${(props) => props.theme.boxShadow.darkgray};
`;

const Header = styled.div`
  ${flex('center', 'space-between')};
  margin-bottom: 20px;
  font-size: ${(props) => props.theme.size.xxxl};
  color: ${(props) => props.theme.color.black1};
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.color.gray2};
  font-size: ${(props) => props.theme.size.xxxl};
  &:hover {
    transition: 0.3s;
    background: ${(props) => props.theme.color.gray5};
  }
`;

const HeaderContent = styled.div`
  font-size: ${(props) => props.theme.size.l};
`;

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

const Main = styled.div`
  margin-top: 1rem;
`;

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

const ShowUsersModal = ({
  setShowUsersModalVisible,
}: {
  setShowUsersModalVisible: (fn: (state: boolean) => boolean) => void;
}): ReactElement => {
  const { users, current } = useChannel();
  const [addUsersModalVisible, setAddUsersModalVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const clickClose = () => {
    setShowUsersModalVisible((state: boolean) => !state);
  };

  useOnClickOutside(ref, clickClose);

  const clickAddUser = () => {
    // setShowUsersModalVisible((state: boolean) => !state);
    setAddUsersModalVisible(true);
  };

  return (
    <>
      {addUsersModalVisible && <AddUsersModal setAddUserModalVisible={setAddUsersModalVisible} />}
      <ModalBackground>
        <Container ref={ref}>
          <Header>
            <HeaderContent>
              {users.length} members in {current?.isPublic} {current?.name}
            </HeaderContent>
            <CloseButton onClick={clickClose}>X</CloseButton>
          </Header>
          <AddButton onClick={clickAddUser}>Add People</AddButton>
          <Main>
            {users?.map((user: JoinUser) => (
              <Item key={user.userId}>
                <UserInfo>
                  <Img src="https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg" />
                  <Name>{user.displayName}</Name>
                </UserInfo>
                <Remove>Remove</Remove>
              </Item>
            ))}
          </Main>
        </Container>
      </ModalBackground>
    </>
  );
};

export default ShowUsersModal;
