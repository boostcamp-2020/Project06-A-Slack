import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getUserRequest } from '@/store/modules/user.slice';
import { flex } from '@/styles/mixin';
import { useAuthState, useUserState } from '@/hooks';
import { logoutRequest } from '@/store/modules/auth.slice';
import { DimModal, UserStateIcon, MenuModal, ClockIcon } from '@/components';
import { UserProfileModalHeader, UserProfileModalBody } from './UserProfileBox';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 2.5rem;
  background-color: ${(props) => props.theme.color.purple1};
  flex-shrink: 0;
  ${flex()};
`;

const Title = styled.div`
  color: ${(props) => props.theme.color.gray5};
  ${flex()};
  user-select: none;
`;

const TitleText = styled.span`
  font-size: 0.8rem;
  padding-bottom: 0.2rem;
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
  height: 1.9rem;
  border-radius: 0.35rem;
  object-fit: cover;
`;

const Icon = styled.div`
  position: absolute;
  right: -1.5px;
  bottom: -1.5px;
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

const TitleClockIcon = styled.div`
  margin: 0 0.5rem;
`;

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const { userId } = useAuthState();
  const { userInfo } = useUserState();

  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [menuModalVisible, setMenuModalVisible] = useState(false);

  const toggleMenuModal = () => setMenuModalVisible((state) => !state);

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
      <Title>
        <TitleClockIcon>
          <ClockIcon />
        </TitleClockIcon>
        <TitleText>{workspaceName}</TitleText>
      </Title>
      {editProfileVisible && (
        <DimModal
          header={<UserProfileModalHeader />}
          body={<UserProfileModalBody handleClose={closeEditModal} />}
          visible={editProfileVisible}
          setVisible={setEditProfileVisible}
        />
      )}
      {menuModalVisible && (
        <MenuModal
          top="2.5rem"
          right="1rem"
          visible={menuModalVisible}
          setVisible={setMenuModalVisible}
        >
          <ModalListItem onClick={openEditModal}>Edit profile</ModalListItem>
          <ModalListItem>View profile</ModalListItem>
          <Line />
          <Logout onClick={handleLogout}>Sign out of {workspaceName}</Logout>
        </MenuModal>
      )}
      <ProfileBox onMouseDown={toggleMenuModal}>
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
