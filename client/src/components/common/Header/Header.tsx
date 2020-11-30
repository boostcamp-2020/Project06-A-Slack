import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getUserRequest } from '@/store/modules/user';
import { flex } from '@/styles/mixin';
import { useAuth } from '@/hooks';
import { logoutRequest } from '@/store/modules/auth';

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

const ProfileImg = styled.img``;

const LogoutButton = styled.button`
  position: absolute;
  right: 0.5rem;
`;

const Header: React.FC = () => {
  const { userId } = useAuth();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUserRequest({ userId: Number(userId) }));
    }
  }, [dispatch, userId]);

  return (
    <Container>
      <Title>부스트캠프 2020 멤버십</Title>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Container>
  );
};

export default Header;
