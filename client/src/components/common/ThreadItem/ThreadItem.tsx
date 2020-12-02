import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Thread } from '@/types';
import { USER_DEFAULT_PROFILE_URL } from '@/utils/constants';

import ReplyButton from './ReplyButton/ReplyButton';
import ThreadPopup from './ThreadPopup/ThreadPopup';

const Container = styled.div`
  background-color: white;
  border: 1px solid black;
  &:hover {
    background-color: #f8f8f8;
  }
`;

interface IsSameUserStyleProp {
  isSameUserStyleProp: boolean;
}

const ContentBox = styled.div<IsSameUserStyleProp>`
  display: ${(props) => (props.isSameUserStyleProp ? 'block' : 'flex')};
`;

const UserImg = styled.img`
  height: 2.25rem;
  width: 2.25rem;
`;
const Popup = styled.div`
  display: none;
  position: relative;
  border: 1px solid black;
  ${Container}:hover & {
    display: block;
  }
`;

const SameUserBox = styled.div<IsSameUserStyleProp>`
  display: ${(props) => (props.isSameUserStyleProp ? 'flex' : 'block')};
`;

const NotSameUserBox = styled.div<IsSameUserStyleProp>`
  display: ${(props) => (props.isSameUserStyleProp ? 'block' : 'flex')};
`;

interface ThreadItemProps {
  thread: Thread;
  isParentThreadOfRightSideBar?: boolean;
  prevThreadUserId?: number;
}
const THIS_IS_FIRST_THREAD_OR_SUB_THREAD = 0;

const ThreadItem: React.FC<ThreadItemProps> = ({
  thread,
  isParentThreadOfRightSideBar,
  prevThreadUserId,
}: ThreadItemProps) => {
  const [isSameUser, setIsSameUser] = useState(false);
  const [createdDate, setCreatedDate] = useState('');

  useEffect(() => {
    setIsSameUser(prevThreadUserId === thread.userId);
    setCreatedDate(new Date(thread.createdAt).toLocaleString('en-US'));
  }, [isSameUser, createdDate]);

  return (
    <Container>
      <ContentBox isSameUserStyleProp={isSameUser}>
        {!isSameUser && (
          <UserImg
            src={thread.image === null ? USER_DEFAULT_PROFILE_URL : thread.image}
            alt="userImg"
          />
        )}
        <SameUserBox isSameUserStyleProp={isSameUser}>
          <NotSameUserBox isSameUserStyleProp={isSameUser}>
            {!isSameUser && <div>{thread.displayName}</div>}
            <div>{createdDate}</div>
          </NotSameUserBox>
          <div>{thread.content}</div>
        </SameUserBox>
      </ContentBox>
      {!(thread.subCount === 0 || isParentThreadOfRightSideBar) && <ReplyButton thread={thread} />}
      <Popup>
        <ThreadPopup />
      </Popup>
    </Container>
  );
};
ThreadItem.defaultProps = {
  isParentThreadOfRightSideBar: false,
  prevThreadUserId: THIS_IS_FIRST_THREAD_OR_SUB_THREAD,
};
export default ThreadItem;
