import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getSubThreadRequest } from '@/store/modules/subThread';
import { Thread } from '@/types';
import { useChannel } from '@/hooks';
import { flex } from '@/styles/mixin';
import { getNotNullDataInArray } from '@/utils/utils';

const Button = styled.button`
  ${flex()};
`;

interface ReplyButtonProps {
  thread: Thread;
}

const ReplyButton: React.FC<ReplyButtonProps> = ({ thread }: ReplyButtonProps) => {
  const { users } = useChannel();
  const buttonEl = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();

  // const getUserInfo = (userId: number) => {
  //   return users.filter((user) => user.userId === userId);
  // };

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
    // results.map((replyDatum) => {
    //   return getUserInfo(replyDatum.subThreadUserId);
    // });
    // results.map((el) => {
    //   return el.displayName;
    // });
    return results;
  };

  return (
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
  );
};

export default ReplyButton;
