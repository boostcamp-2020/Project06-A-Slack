import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { THREAD, selectTHREAD, THREAD_ACTIONS } from '@/store/modules/thread';
import styled from 'styled-components';
import ThreadItem from './ThreadItem/ThreadItem';

const StyledThreadList = styled.div`
  background-color: orange;
`;

const threadListData = {
  threadList: [
    {
      id: 1,
      userId: 1,
      channelId: 1,
      parentId: null,
      content: 'init content',
      url: 'url/init',
      isEdited: 0,
      isPinned: 0,
      createdAt: 'string',
      emoji: [
        { name: 'emoji1', userId: 1 },
        { name: 'emoji1', userId: 2 },
      ],
    },
    {
      id: 1,
      userId: 1,
      channelId: 1,
      parentId: null,
      content: 'sect content',
      url: 'url/init',
      isEdited: 0,
      isPinned: 0,
      createdAt: 'string',
      emoji: [
        { name: 'emoji1', userId: 1 },
        { name: 'emoji1', userId: 2 },
      ],
    },
  ],
};

const ThreadList = () => {
  const { threadList } = useSelector(selectTHREAD);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(THREAD_ACTIONS.getThreadRequest());
  }, [dispatch]);

  return (
    <StyledThreadList>
      <div>ThreadListTop</div>
      {threadList?.map((thread: any) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </StyledThreadList>
  );
};

export default ThreadList;
