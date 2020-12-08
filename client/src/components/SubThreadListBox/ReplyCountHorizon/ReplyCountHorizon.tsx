import React from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';

const Container = styled.div`
  width: 100%;
  ${flex()};
  padding: 0.5rem 1.5rem;
`;

const Text = styled.div`
  color: ${(props) => props.theme.color.black8};
  margin-right: 0.5rem;
  font-size: 0.75rem;
  font-weight: 400;
  white-space: nowrap;
`;

const Line = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: ${(props) => props.theme.color.lightGray2};
`;

interface ReplyCountHorizonProps {
  subCount: number;
}

const ReplyCountHorizon: React.FC<ReplyCountHorizonProps> = ({
  subCount,
}: ReplyCountHorizonProps) => {
  return (
    <Container>
      <Text>{subCount === 1 ? `${subCount} reply` : `${subCount} replies`}</Text>
      <Line />
    </Container>
  );
};

export default ReplyCountHorizon;
