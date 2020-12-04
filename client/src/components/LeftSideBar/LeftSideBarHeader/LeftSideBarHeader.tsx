import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';

const Container = styled.div`
  padding: 15px;
  background: ${(props) => props.theme.color.purple2};
  ${flex('center', 'space-between')}
`;

const Content = styled.div`
  color: ${(props) => props.theme.color.white};
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) => props.theme.color.white};
  border: none;
`;

const LeftSideBar = (): ReactElement => {
  return (
    <Container>
      <Content>부캠하이</Content>
      <Button />
    </Container>
  );
};

export default LeftSideBar;
