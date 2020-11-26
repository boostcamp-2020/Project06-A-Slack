import React from 'react';
import styled from 'styled-components';
import ThreadListHeader from './ThreadListHeader/ThreadListHeader';
import ThreadList from './ThreadList/ThreadList';
import ThreadInputBox from './ThreadInputBox/ThreadInputBox';

const StyledThreadListBox = styled.div`
  background-color: pink;
`;

const ThreadListBox = () => {
  const channel = {
    id: 1,
    name: 'slack-클론-구현팀',
  };

  return (
    <StyledThreadListBox>
      <div>BoxTop</div>
      <ThreadListHeader channel={channel} />
      <ThreadList />
      <ThreadInputBox />
    </StyledThreadListBox>
  );
};

export default ThreadListBox;
