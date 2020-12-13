import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  addThreadListRequest,
  getThreadRequest,
  setFirstScrollUsed,
  setScrollable,
} from '@/store/modules/thread.slice';
import { Thread } from '@/types';
import { ThreadItem } from '@/components';
import { useInfinteScroll, useThreadState, useUserState } from '@/hooks';
import { flex } from '@/styles/mixin';
import loadingColorIcon from '@/public/icon/loading-color.svg';
import { useParams } from 'react-router-dom';

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
  height: 5rem;
  flex-shrink: 0;
  background-color: white;
  ${flex()};
`;

const LoadingIcon = styled.img`
  width: 35px;
  height: 35px;
  padding-top: 5px;
`;

const ThreadList = () => {
  const { channelId }: { channelId: string } = useParams();

  const dispatch = useDispatch();

  const bottomRef = useRef<HTMLDivElement>(null);
  const LoadingBoxRef = useRef<HTMLDivElement>(null);

  const { userInfo } = useUserState();
  const { threadList, canScroll, loading, nextThreadId, firstScrollUsed } = useThreadState();

  const onIntersect = ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
    // console.log('call');
    if (isIntersecting) {
      // console.log('inter');
    }
    if (!firstScrollUsed) {
      // console.log('dont fetch');
      return;
    }
    if (isIntersecting && !loading) {
      console.log('get list from id:', nextThreadId);
      if (nextThreadId !== -1) {
        dispatch(addThreadListRequest({ channelId: +channelId, nextThreadId }));
      }
    }
  };

  useEffect(() => {
    if (Number.isInteger(+channelId)) {
      console.log('reload');
      dispatch(getThreadRequest({ channelId: Number(channelId) }));
    }
  }, [channelId]);

  useEffect(() => {
    if (threadList && threadList.length) {
      if (!firstScrollUsed) {
        bottomRef.current?.scrollIntoView();
        dispatch(setFirstScrollUsed({ firstScrollUsed: true }));
      }
      if (canScroll && threadList[threadList.length - 1].userId === userInfo?.id) {
        bottomRef.current?.scrollIntoView();
        dispatch(setScrollable({ canScroll: false }));
      }
    }
  }, [threadList?.length]);

  useInfinteScroll({ target: LoadingBoxRef.current, onIntersect, threshold: 0.9 });
  console.log('id', nextThreadId);

  return (
    <Container>
      {nextThreadId && nextThreadId !== -1 && (
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
