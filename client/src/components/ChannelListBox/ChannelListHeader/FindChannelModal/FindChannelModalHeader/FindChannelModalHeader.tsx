import React from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';

const Container = styled.div`
  ${flex('center', 'flex-start')}
  width: 100%;
  height: 3.2rem;
  flex-shrink: 0;
  font-size: 1.4rem;
  font-weight: 800;
  background-color: white;
  color: ${(props) => props.theme.color.lightBlack};
`;

const FindChannelModalHeader: React.FC = () => {
  return <Container>Channel browser</Container>;
};

export default FindChannelModalHeader;
