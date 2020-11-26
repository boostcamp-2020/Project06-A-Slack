import React from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import { useAuth } from '@/hooks';

const Container = styled.div`
  width: 100%;
  height: 2.5rem;
  background-color: ${(props) => props.theme.color.main};
  ${flex()};
`;

const Title = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.color.gray5};
  ${flex()};
`;

const ProfileImg = styled.img``;

const Header = () => {
  const { userId } = useAuth();
  console.log('?', userId);

  return (
    <Container>
      <Title>부스트캠프 2020 멤버십</Title>
    </Container>
  );
};

export default Header;
