import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setScrollable } from '@/store/modules/thread.slice';
import { Thread } from '@/types';
import { ThreadItem } from '@/components';
import { useThreadState, useUserState } from '@/hooks';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`;

const Bottom = styled.div``;

const ThreadList = () => {
  const { threadList, canScroll } = useThreadState();
  const { userInfo } = useUserState();
  const dispatch = useDispatch();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (threadList && threadList.length) {
      if (canScroll) {
        bottomRef.current?.scrollIntoView();
        dispatch(setScrollable({ canScroll: false }));
      }
      if (threadList[threadList.length - 1].userId === userInfo?.id) {
        bottomRef.current?.scrollIntoView();
      }
    }
  }, [threadList?.length]);

  return (
    <Container>
      {threadList?.map((thread: Thread, index: number) => (
        <ThreadItem
          key={thread.id}
          thread={thread}
          prevThreadUserId={threadList[index - 1]?.userId}
        />
      ))}
      <Bottom ref={bottomRef} />
    </Container>
  );
};

export default ThreadList;
