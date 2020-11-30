import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getSubThreadRequest } from '@/store/modules/subThread';
import { Thread } from '@/types';
import { useUser } from '@/hooks';
import { flex } from '@/styles/mixin';
import { getNotNullDataInArray } from '@/utils/utils';

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
  isParentThreadOfRightSideBar: boolean;
}

const ThreadItem: React.FC<ThreadItemProps> = ({
  thread,
  isParentThreadOfRightSideBar,
}: ThreadItemProps) => {
  const { userInfo } = useUser();
  const buttonEl = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();

  const replyClickEventHandler = (clickedThread: any) => {
    const parentId = Number(buttonEl.current?.id);
    dispatch(getSubThreadRequest({ parentId, parentThread: clickedThread }));
  };

  const getDisplayReplyData = () => {
    // 추후 subThreadUserId 값을 이용해, 채널 멤버의 user 정보를 활용하여 프로필을 뿌려준다.
    const replyData = [
      { subThreadUserId: thread.subThreadUserId1, subThreadProfile: thread.subThreadUserId1 },
      { subThreadUserId: thread.subThreadUserId2, subThreadProfile: thread.subThreadUserId2 },
      { subThreadUserId: thread.subThreadUserId3, subThreadProfile: thread.subThreadUserId3 },
    ];
    const results = getNotNullDataInArray(replyData)('subThreadUserId');
    return results;
  };

  return (
    <Container>
      {thread.parentId}
      <div>{thread.userId}</div>
      <div>{thread.createdAt}</div>
      <div>{thread.content}</div>
      {thread.subCount === 0 || isParentThreadOfRightSideBar ? (
        ''
      ) : (
        <Button
          ref={buttonEl}
          id={String(thread.id)}
          type="button"
          onClick={() => replyClickEventHandler(thread)}
        >
          {getDisplayReplyData().map((el) => {
            const { subThreadUserId, subThreadProfile } = el;
            return <div key={`${thread.id}${subThreadUserId}`}>{subThreadProfile}</div>;
          })}
          {thread.subCount}replies
        </Button>
      )}
    </Container>
  );
};

export default ThreadItem;
