import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getThreadRequest } from '@/store/modules/thread.slice';
import styled from 'styled-components';
import { Thread } from '@/types';
import { ThreadItem } from '@/components';
import { useThreadState } from '@/hooks';
import { useParams } from 'react-router-dom';
import { isNumberTypeValue } from '@/utils/utils';
import { flex } from '@/styles/mixin';

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
    </Container>
  );
};

export default ThreadList;
