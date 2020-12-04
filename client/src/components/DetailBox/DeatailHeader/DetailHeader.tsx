import React from 'react';
import { useChannelState } from '@/hooks';
import { useDispatch } from 'react-redux';
import { flex } from '@/styles/mixin';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid red;
  width: 100%;
  ${flex('center', 'space-between')}
`;
const Left = styled.div`
  padding: ${(props) => props.theme.size.m};
`;

const Title = styled.div`
  font-size: 20px;
`;

const Content = styled.div`
  font-size: 12px;
`;

const Button = styled.button`
  font-size: 25px;
  background: none;
  border: none;
  padding: ${(props) => props.theme.size.m};
`;

const DetailHeader: React.FC = () => {
  const { current } = useChannelState();
  const dispatch = useDispatch();
  const onClick = () => {
    // Link로 연결하는 작업
  };
  return (
    <Container>
      <Left>
        <Title>Details</Title>
        <Content>
          {current?.isPublic} {current?.name}
        </Content>
      </Left>
      <Button onClick={onClick}>X</Button>
    </Container>
  );
};

export default DetailHeader;
