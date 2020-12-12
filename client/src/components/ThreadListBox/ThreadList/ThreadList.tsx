import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setScrollable } from '@/store/modules/thread.slice';
import { Thread, User } from '@/types';
import { ThreadItem } from '@/components';
import { useInfinteScroll, useThreadState, useUserState } from '@/hooks';
import { flex } from '@/styles/mixin';
import loadingColorIcon from '@/public/icon/loading-color.svg';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`;

const Bottom = styled.div``;
const LoadingBox = styled.div`
  width: 100%;
  height: 4rem;
  flex-shrink: 0;
  background-color: white;
  ${flex()};
`;

const LoadingIcon = styled.img`
  width: 35px;
  height: 35px;
  padding-top: 5px;
`;

let isFirstLoad = true;

const ThreadList = () => {
  const dispatch = useDispatch();
  const bottomRef = useRef<HTMLDivElement>(null);
  const LoadingBoxRef = useRef<HTMLDivElement>(null);
  const nextThreadId = useState<number | null>(null);
  const { userInfo } = useUserState();
  const { threadList, canScroll, loading } = useThreadState();

  const onIntersect = () => {
    if (isFirstLoad) {
      isFirstLoad = false;
      return;
    }
    if (loading) {
      return;
    }
    console.log('reload!!');
  };

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

  useInfinteScroll({ target: LoadingBoxRef.current, onIntersect, threshold: 0.95 });

  return (
    <Container>
      {nextThreadId && (
        <LoadingBox ref={LoadingBoxRef}>
          Loading history...
          <LoadingIcon src={loadingColorIcon} />
        </LoadingBox>
      )}
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
