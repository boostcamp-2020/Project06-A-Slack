import styled from 'styled-components';
import React from 'react';
import { DetailList } from './DetailList/DetailList';
import { DetailButtonBox } from './DetailButtonBox/DetailButtonBox';

const Container = styled.div``;

const DetailBody: React.FC = () => {
  return (
    <Container>
      <DetailButtonBox />
      <DetailList />
    </Container>
  );
};

export default DetailBody;
