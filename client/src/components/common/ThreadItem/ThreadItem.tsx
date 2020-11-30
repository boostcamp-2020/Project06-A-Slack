import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getSubThreadRequest } from '@/store/modules/subThread';
import { Thread } from '@/types';
import { useUser } from '@/hooks/useUser';
import { flex } from '@/styles/mixin';

const Container = styled.div`
  background-color: white;
  border: 1px solid black;
  &:hover {
    background-color: #f8f8f8;
  }
`;

const Button = styled.button`
  ${flex()};
`;

interface ThreadItemProps {
  thread: Thread;
}

interface ReplyData {
  subThreadUserId: number | null;
  subThreadProfile: number | null;
}

const ThreadItem: React.FC<ThreadItemProps> = ({ thread }: ThreadItemProps) => {
  const { userInfo } = useSelector(useUser);
  const buttonEl = useRef<HTMLButtonElement>(null);

  const dispatch = useDispatch();

  const replyClickEventHandler = () => {
    const parentId = Number(buttonEl.current?.id);
    dispatch(getSubThreadRequest({ parentId }));
  };

  const getFilteredReplyData = (replyData: ReplyData[]) => {
    const results = replyData.filter(({ subThreadUserId }) => {
      if (subThreadUserId === null) {
        return false;
      }
      return true;
    });
    return results;
  };

  const getDisplayReplyData = () => {
    // 추후 subThreadUserId 값을 이용해, 채널 멤버의 user 정보를 활용하여 프로필을 뿌려준다.
    const replyData = [
      { subThreadUserId: thread.subThreadUserId1, subThreadProfile: thread.subThreadUserId1 },
      { subThreadUserId: thread.subThreadUserId2, subThreadProfile: thread.subThreadUserId2 },
      { subThreadUserId: thread.subThreadUserId3, subThreadProfile: thread.subThreadUserId3 },
    ];
    const results = getFilteredReplyData(replyData);
    return results;
  };

  return (
    <Container>
      <div>{thread.userId}</div>
      <div>{thread.createdAt}</div>
      <div>{thread.content}</div>
      <Button ref={buttonEl} id={String(thread.id)} type="button" onClick={replyClickEventHandler}>
        {getDisplayReplyData().map((el) => {
          const { subThreadUserId, subThreadProfile } = el;
          return <div key={`${thread.id}${subThreadUserId}`}>{subThreadProfile}</div>;
        })}
        {thread.subCount}replies
      </Button>
    </Container>
  );
};

export default ThreadItem;
