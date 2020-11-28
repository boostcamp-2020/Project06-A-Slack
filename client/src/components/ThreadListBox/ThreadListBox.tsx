import React from 'react';
import styled from 'styled-components';
import ThreadListHeader from './ThreadListHeader/ThreadListHeader';
import ThreadList from './ThreadList/ThreadList';
import ThreadInputBox from './ThreadInputBox/ThreadInputBox';

const StyledThreadListBox = styled.div`
  background-color: pink;
  width: 100%;
`;

const ThreadListBox = () => {
  return (
    <StyledThreadListBox>
      <div>BoxTop</div>
      <ThreadListHeader />
      <ThreadList />
      <ThreadInputBox />
    </StyledThreadListBox>
  );
};

export default ThreadListBox;
