import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  addThreadListRequest,
  setFirstScrollUsed,
  setGotoPreviousTopItemPosition,
  setScrollable,
} from '@/store/modules/thread.slice';
import { Thread } from '@/types';
import { ThreadItem, LightIcon, LockIcon, PoundIcon } from '@/components';
import { useChannelState, useInfinteScroll, useThreadState, useUserState } from '@/hooks';
import { flex } from '@/styles/mixin';
import loadingColorIcon from '@/public/icon/loading-color.svg';
import { useParams } from 'react-router-dom';
import theme from '@/styles/theme';
import { ChannelLockIcon } from '@/components/common';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`;

const Bottom = styled.div``;

const Wrapper = styled.div``;

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

const ChannelInfoBox = styled.div`
  margin: 30px 20px 48px 20px;
  display: flex;
`;

const ChannelIconBox = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 5px;
  overflow: hidden;
`;

const ChannelInfoDesc = styled.div`
  padding-top: 0.2rem;
`;
const ChannelNameBox = styled.span`
  font-weight: 800;
  color: ${(props) => props.theme.color.blue1};
`;

const ChannelInfoRightBox = styled.div`
  margin-left: 0.5rem;
`;

const ThreadList = () => {
  const { channelId }: { channelId: string } = useParams();
  const { current } = useChannelState();

  const dispatch = useDispatch();

  const bottomRef = useRef<HTMLDivElement>(null);

  const [observeTarget, setObserveTarget] = useState<HTMLDivElement | null>(null);

  const { userInfo } = useUserState();
  const {
    threadList,
    canScrollToBottom,
    loading,
    nextThreadId,
    firstScrollUsed,
    prevTopThreadId,
    gotoPreviousTopItemPosition,
  } = useThreadState();

  const onIntersect = ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
    if (isIntersecting && !loading) {
      if (nextThreadId && nextThreadId !== -1) {
        dispatch(addThreadListRequest({ channelId: +channelId, nextThreadId }));
      }
    }
  };

  useEffect(() => {
    if (threadList) {
      if (!firstScrollUsed) {
        bottomRef.current?.scrollIntoView();
        dispatch(setFirstScrollUsed({ firstScrollUsed: true }));
      }
    }
  }, [threadList?.length, firstScrollUsed]);

  useEffect(() => {
    if (threadList) {
      if (
        threadList.length &&
        canScrollToBottom &&
        threadList[threadList.length - 1].userId === userInfo?.id
      ) {
        bottomRef.current?.scrollIntoView();
        dispatch(setScrollable({ canScrollToBottom: false }));
      }
      if (gotoPreviousTopItemPosition && prevTopThreadId && !canScrollToBottom) {
        const prevTopElement = document.getElementById(`thread-${prevTopThreadId}`);
        prevTopElement?.scrollIntoView();
        dispatch(setGotoPreviousTopItemPosition({ gotoPreviousTopItemPosition: false }));
      }
    }
  }, [threadList?.length]);

  useInfinteScroll({ target: observeTarget, onIntersect, threshold: 0 });

  return (
    <Container>
      {(!nextThreadId || nextThreadId === -1) && (
        <ChannelInfoBox>
          {current && (
            <>
              <ChannelIconBox>
                {current?.isPublic ? <LightIcon /> : <ChannelLockIcon size="36px" />}
              </ChannelIconBox>
              <ChannelInfoRightBox>
                <ChannelInfoDesc>
                  <ChannelNameBox>
                    {current?.isPublic ? (
                      <PoundIcon size="11px" color={theme.color.blue1} />
                    ) : (
                      <LockIcon size="11px" color={theme.color.blue1} />
                    )}{' '}
                    {current?.name}
                  </ChannelNameBox>{' '}
                  채널의 맨 첫 부분입니다.
                </ChannelInfoDesc>
              </ChannelInfoRightBox>
            </>
          )}
        </ChannelInfoBox>
      )}
      {threadList && (
        <>
          {nextThreadId && nextThreadId !== -1 && (
            <LoadingBox ref={setObserveTarget}>
              Loading history...
              <LoadingIcon src={loadingColorIcon} />
            </LoadingBox>
          )}
          {threadList?.map((thread: Thread, index: number, arr: Thread[]) => {
            if (thread.isDeleted) {
              if (thread.subCount > 0) {
                const deletedThread = { ...thread, content: 'This message was deleted.' };
                return (
                  <Wrapper id={`thread-${thread.id}`} key={thread.id}>
                    <ThreadItem
                      thread={deletedThread}
                      prevThreadUserId={arr[index - 1]?.userId}
                      prevThread={index > 0 ? arr[index - 1] : undefined}
                    />
                  </Wrapper>
                );
              }
              return;
            }
            return (
              <Wrapper id={`thread-${thread.id}`} key={thread.id}>
                <ThreadItem
                  thread={thread}
                  prevThreadUserId={arr[index - 1]?.userId}
                  prevThread={index > 0 ? arr[index - 1] : undefined}
                />
              </Wrapper>
            );
          })}
        </>
      )}
      <Bottom ref={bottomRef} />
    </Container>
  );
};

export default ThreadList;
