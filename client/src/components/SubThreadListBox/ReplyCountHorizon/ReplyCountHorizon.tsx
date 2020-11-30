import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: orange;
`;

interface ReplyCountHorizonProps {
  subCount: number;
}

const ReplyCountHorizon: React.FC<ReplyCountHorizonProps> = ({
  subCount,
}: ReplyCountHorizonProps) => {
  return <Container>{subCount}reply</Container>;
};

export default ReplyCountHorizon;
