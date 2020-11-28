import React from 'react';
import styled from 'styled-components';
import SubThreadInputBox from '@/components/SubThreadListBox/SubThreadListBox';
import ThreadListHeader from './ThreadListHeader/ThreadListHeader';
import ThreadList from './ThreadList/ThreadList';
import ThreadInputBox from './ThreadInputBox/ThreadInputBox';

const Container = styled.div`
  background-color: pink;
`;

const ThreadListBox = () => {
  const channel = {
    id: 1,
    name: 'slack-클론-구현팀',
  };

  return (
    <Container>
      <div>BoxTop</div>
      <ThreadListHeader channel={channel} />
      <ThreadList />
      <ThreadInputBox />
      <SubThreadInputBox />
    </Container>
  );
};

export default ThreadListBox;
