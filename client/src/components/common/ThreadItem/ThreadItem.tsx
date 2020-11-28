import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubThreadRequest } from '@/store/modules/subThread';
import { Thread } from '@/types';
import styled from 'styled-components';
import { useUser } from '@/hooks/useUser';

interface ThreadItemProps {
  thread: Thread;
}

const Container = styled.div`
  background-color: white;
  border: 1px solid black;
  &:hover {
    background-color: #f8f8f8;
  }
`;

const ThreadItem: React.FC<ThreadItemProps> = ({ thread }: ThreadItemProps) => {
  const { userInfo } = useSelector(useUser);

  const dispatch = useDispatch();

  const replyClickEventHandler = (e: any) => {
    const parentId = e.target.closest('button').id;
    dispatch(getSubThreadRequest({ parentId }));
  };

  const displaySubProfile = () => {
    // subThreadId가 아니고 profile을 바로 가져와서 써버리자 그럼. id는 의미없어 이렇게 쓸거면 profile image로 바로.
    // subThread craterId로
    const results = [thread.subThreadId1, thread.subThreadId2, thread.subThreadId3];
    return results;
  };

  return (
    <Container>
      <div>{thread.userId}</div>
      <div>{thread.createdAt}</div>
      <div>{thread.content}</div>
      <button id={String(thread.id)} type="button" onClick={replyClickEventHandler}>
        {displaySubProfile()?.map((subProfile: number | null, index: number) => (
          <div key={index}>{subProfile}</div>
        ))}
        {thread.subCount}replies
      </button>
      <div>{thread.subThreadId1}</div>
    </Container>
  );
};

export default ThreadItem;
