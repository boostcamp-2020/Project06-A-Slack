import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getThreadRequest } from '@/store/modules/thread.slice';
import styled from 'styled-components';
import { Thread } from '@/types';
import { ThreadItem } from '@/components';
import { useThreadState } from '@/hooks';
import { useParams } from 'react-router-dom';
import { isNumberTypeValue } from '@/utils/utils';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`;

interface RightSideParams {
  channelId: string | undefined;
}

const ThreadList = () => {
  const { channelId }: RightSideParams = useParams();
  const { threadList } = useThreadState();
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  /* 
    TODO: 
    스크롤이 끝까지 가도록 변경(현재 어중간하게 이동함), 
    아이템 추가할 때는 스크롤하지 않도록 변경(위에꺼 보는게 새 메시지가 와도 맨 밑으로 스크롤 될 필요 x)
  */
  useEffect(() => {
    ref.current?.scrollTo({
      top: ref.current?.getBoundingClientRect().bottom,
    });
  }, [threadList]);

  useEffect(() => {
    if (isNumberTypeValue(channelId)) {
      dispatch(getThreadRequest({ channelId: Number(channelId) }));
    }
  }, [dispatch, channelId]);

  return (
    <Container ref={ref}>
      {threadList?.map((thread: Thread, index: number) => (
        <ThreadItem
          key={thread.id}
          thread={thread}
          prevThreadUserId={threadList[index - 1]?.userId}
        />
      ))}
    </Container>
  );
};

export default ThreadList;
