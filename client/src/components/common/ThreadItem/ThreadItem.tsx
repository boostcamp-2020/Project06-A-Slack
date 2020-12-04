import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Thread } from '@/types';
import { flex, hoverUnderline } from '@/styles/mixin';
import ReplyButton from './ReplyButton/ReplyButton';
import ThreadPopup from './ThreadPopup/ThreadPopup';

interface IsSameUserStyleProp {
  isSameUserStyleProp: boolean;
}

// const SameUserBox = styled.div<IsSameUserStyleProp>`
//   display: ${(props) => (props.isSameUserStyleProp ? 'flex' : 'block')};
// `;

// const NotSameUserBox = styled.div<IsSameUserStyleProp>`
//   display: ${(props) => (props.isSameUserStyleProp ? 'block' : 'flex')};
// `;

const Container = styled.div`
  position: relative;
  display: flex;
  background-color: white;
  width: 100%;
  padding: 0.5rem 1.25rem;
  &:hover {
    background-color: ${(props) => props.theme.color.threadHover};
  }
`;

const Popup = styled.div`
  display: none;
  position: absolute;
  right: 1rem;
  top: -0.75rem;
  border-radius: 5px;
  ${Container}:hover & {
    display: flex;
  }
`;

const UserImgBox = styled.div``;
const ContentBox = styled.div`
  padding-left: 0.5rem;
  ${flex('flex-start', 'center', 'column')}
  flex: 1;
  color: ${(props) => props.theme.color.black6};
  font-weight: 200;
`;

const ContentTop = styled.div`
  ${flex('flex-end')};
`;
const ContentBottom = styled.div`
  margin-top: 0.3rem;
  white-space: pre-wrap;
  line-height: 1.45;
  ${flex('center', 'flex-start')}
`;

const UserImg = styled.img`
  width: 2.25rem;
  height: 2.25rem;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
`;

const UserNameBox = styled.span`
  font-weight: 800;
  font-size: 1rem;
  color: ${(props) => props.theme.color.lightBlack};
  ${(props) => hoverUnderline(props.theme.color.lightBlack)}
  cursor: pointer;
`;

const DateTimeBox = styled.span`
  font-size: 0.75rem;
  color: ${(props) => props.theme.color.black6};
  margin-left: 0.5rem;
  ${(props) => hoverUnderline(props.theme.color.black6, '1px')}
  cursor: pointer;
`;

interface ThreadItemProps {
  thread: Thread;
  isParentThreadOfRightSideBar?: boolean;
  prevThreadUserId?: number;
}
const THIS_IS_FIRST_THREAD_OR_SUB_THREAD = 0;

const get12HourTime = (dataString: string, noSuffix?: boolean) => {
  if (!dataString) {
    return '';
  }
  const result = new Date(dataString).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  if (noSuffix) {
    return result.split(' ')[0];
  }
  return result;
};

const ThreadItem: React.FC<ThreadItemProps> = ({
  thread,
  isParentThreadOfRightSideBar,
  prevThreadUserId,
}: ThreadItemProps) => {
  const isSameUser = prevThreadUserId === thread.userId;

  return (
    <Container>
      <UserImgBox>
        <UserImg src={thread.image} />
      </UserImgBox>
      <ContentBox>
        <ContentTop>
          <UserNameBox>{thread.displayName}</UserNameBox>
          <DateTimeBox>{get12HourTime(thread.createdAt)}</DateTimeBox>
        </ContentTop>
        <ContentBottom>{thread.content}</ContentBottom>
        {thread.subCount > 0 && !isParentThreadOfRightSideBar && <ReplyButton thread={thread} />}
      </ContentBox>
      <Popup>
        <ThreadPopup thread={thread} />
      </Popup>
    </Container>
  );
};
ThreadItem.defaultProps = {
  isParentThreadOfRightSideBar: false,
  prevThreadUserId: THIS_IS_FIRST_THREAD_OR_SUB_THREAD,
};
export default ThreadItem;
