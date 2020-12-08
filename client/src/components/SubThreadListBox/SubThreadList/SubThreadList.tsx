import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Thread } from '@/types';
import { ThreadItem } from '@/components';
import { useSubThreadState, useUserState } from '@/hooks';
import { setScrollable } from '@/store/modules/subThread.slice';
import { useDispatch } from 'react-redux';

const Container = styled.div`
  background-color: pink;
`;

const Bottom = styled.div``;
interface SubThreadListProps {
  subThreadList: Thread[] | null;
}

const SubThreadList: React.FC<SubThreadListProps> = ({ subThreadList }: SubThreadListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { userInfo } = useUserState();

  const { canScroll } = useSubThreadState();

  useEffect(() => {
    if (subThreadList && subThreadList.length) {
      if (canScroll) {
        bottomRef.current?.scrollIntoView();
        dispatch(setScrollable({ canScroll: false }));
      }
      if (subThreadList[subThreadList.length - 1].userId === userInfo?.id) {
        bottomRef.current?.scrollIntoView();
      }
    }
  }, [subThreadList?.length]);

  return (
    <Container>
      {subThreadList?.map((thread: Thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
      <Bottom ref={bottomRef} />
    </Container>
  );
};

export default SubThreadList;
