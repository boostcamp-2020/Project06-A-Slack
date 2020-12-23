import React from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import loadingColorIcon from '@/public/icon/loading-color.svg';

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${flex()};
`;

const LoadingBox = styled.div`
  width: 100%;
  height: 5rem;
  flex-shrink: 0;
  font-size: 1.7rem;
  background-color: white;
  ${flex()};
`;

const LoadingIcon = styled.img`
  width: 50px;
  height: 50px;
  padding-top: 5px;
`;

const LoadingPage: React.FC = () => {
  return (
    <Container>
      <LoadingBox>
        Loading...
        <LoadingIcon src={loadingColorIcon} />
      </LoadingBox>
    </Container>
  );
};

export default LoadingPage;
