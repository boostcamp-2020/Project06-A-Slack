import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import { WriteIcon } from '@/components';

const Container = styled.div`
  width: 16.25rem;
  padding: 15px;
  background: ${(props) => props.theme.color.purple2};
  ${flex('center', 'space-between')}
`;

const Title = styled.div`
  color: ${(props) => props.theme.color.white};
  font-weight: bold;
`;

const Button = styled.button`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: ${(props) => props.theme.color.white};
  border: none;
  padding-top: 0.1rem;
  ${flex()};
`;

const workspace = '부스트 캠프 2020 멤버십';

const LeftSideBar = (): ReactElement => {
  return (
    <Container>
      <Title>{workspace}</Title>
      <Button>
        <WriteIcon />
      </Button>
    </Container>
  );
};

export default LeftSideBar;
