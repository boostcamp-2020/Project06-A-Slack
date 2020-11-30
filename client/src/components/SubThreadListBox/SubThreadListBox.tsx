import React from 'react';
import styled from 'styled-components';
import SubThreadList from './SubThreadList/SubThreadList';

const Container = styled.div`
  background-color: green;
`;

const SubThreadListBox = () => {
  return (
    <Container>
      <div>subThreadListBox</div>
      <div> parent component </div>
      <SubThreadList />
    </Container>
  );
};

export default SubThreadListBox;
