import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getUserRequest } from '@/store/modules/user';
import { flex } from '@/styles/mixin';
import { useAuth, useUser } from '@/hooks';
import { logoutRequest } from '@/store/modules/auth';
import { DimModal, UserStateIcon, MenuModal } from '@/components';
import { UserProfileModalHeader, UserProfileModalBody } from './UserProfileBox';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 2.5rem;
  background-color: ${(props) => props.theme.color.main};
  flex-shrink: 0;
  ${flex()};
`;

const Title = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.color.gray5};
  ${flex()};
  user-select: none;
`;

const ProfileBox = styled.div`
  position: absolute;
  right: 0.9rem;
  height: 1.9rem;
  border-radius: 0.35rem;
  cursor: pointer;
`;

const ProfileBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 0.35rem;
  z-index: 1;
  &:hover {
    opacity: 0.25;
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

const ProfileImg = styled.img`
  width: 1.9rem;
  border-radius: 0.35rem;
`;

const Icon = styled.div`
  position: absolute;
  right: -1.5px;
  bottom: -1.5px;
`;

const Modal = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 1rem;
`;

const Line = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: ${(props) => props.theme.color.lightGray1};
`;

const ModalListItem = styled.div`
  width: 100%;
  padding: 0.4rem 1.2rem;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: ${(props) => props.theme.color.blue1};
  }
`;

const Logout = styled(ModalListItem)``;

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const { userId } = useAuth();
  const { userInfo } = useUser();

  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [menuModalVisible, setMenuModalVisible] = useState(false);

  const closeMenuModal = () => setMenuModalVisible(false);
  const openMenuModal = () => setMenuModalVisible(true);

  const closeEditModal = () => setEditProfileVisible(false);
  const openEditModal = () => setEditProfileVisible(true);

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUserRequest({ userId: Number(userId) }));
    }
  }, [dispatch, userId]);

  const workspaceName = '부스트캠프 2020 멤버십';

  return (
    <Container>
      <Title>{workspaceName}</Title>
      {editProfileVisible && (
        <DimModal
          header={<UserProfileModalHeader />}
          body={<UserProfileModalBody handleClose={closeEditModal} />}
          visible={editProfileVisible}
          setVisible={setEditProfileVisible}
        />
      )}
      {menuModalVisible && (
        <Modal onClick={closeMenuModal}>
          <MenuModal width="auto" visible={menuModalVisible} setVisible={setMenuModalVisible}>
            <ModalListItem onClick={openEditModal}>Edit profile</ModalListItem>
            <ModalListItem>View profile</ModalListItem>
            <Line />
            <Logout onClick={handleLogout}>Sign out of {workspaceName}</Logout>
          </MenuModal>
        </Modal>
      )}
      <ProfileBox onClick={openMenuModal}>
        <ProfileBackground />
        <ProfileImg src={userInfo?.image} />
        <Icon>
          <UserStateIcon />
        </Icon>
      </ProfileBox>
    </Container>
  );
};

export default Header;
