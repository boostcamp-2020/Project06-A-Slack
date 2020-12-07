import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getThreadRequest, setScrollable } from '@/store/modules/thread.slice';
import styled from 'styled-components';
import { Thread } from '@/types';
import { ThreadItem } from '@/components';
import { useThreadState, useUserState } from '@/hooks';
import { useParams } from 'react-router-dom';
import { isNumberTypeValue } from '@/utils/utils';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`;

const Bottom = styled.div``;

interface RightSideParams {
  channelId: string | undefined;
}

const ThreadList = () => {
  const { channelId }: RightSideParams = useParams();
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
  }, [threadList]);

  useEffect(() => {
    if (isNumberTypeValue(channelId)) {
      dispatch(getThreadRequest({ channelId: Number(channelId) }));
    }
  }, [dispatch, channelId]);

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
