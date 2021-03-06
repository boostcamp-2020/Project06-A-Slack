import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Thread } from '@/types';
import { flex, hoverUnderline } from '@/styles/mixin';
import { USER_DEFAULT_PROFILE_URL } from '@/utils/constants';
import { TrashIcon, LazyImage } from '@/components';
import ReplyButton from './ReplyButton/ReplyButton';
import ThreadPopup from './ThreadPopup/ThreadPopup';
import EmojiBox from './EmojiBox/EmojiBox';

const Container = styled.div`
  position: relative;
  display: flex;
  background-color: white;
  width: 100%;
  padding: 0.5rem 1.25rem 0.5rem 1.25rem;
  &:hover {
    background-color: ${(props) => props.theme.color.threadHover};
  }
`;

const SameUserContainer = styled(Container)`
  padding: 0 1.25rem;
`;

interface PopupProps {
  isSubThread: boolean;
}

const Popup = styled.div<PopupProps>`
  display: none;
  position: absolute;
  ${(props) =>
    !props.isSubThread &&
    css`
      top: -0.5rem;
    `};
  right: 1rem;
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
  margin-bottom: 0.3rem;
`;
const ContentBottom = styled.div`
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
  max-width: 16rem;
  word-break: break-all;
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

const DeletedItemImgBox = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  ${flex()};
  background-color: ${(props) => props.theme.color.gray4};
  border-radius: 5px;
`;

const SameUserDateBox = styled(DeletedItemImgBox)`
  background-color: unset;
`;

interface ThreadItemProps {
  thread: Thread;
  isParentThreadOfRightSideBar?: boolean;
  prevThreadUserId?: number;
  prevThread?: Thread;
  isFirstThreadOfDate?: boolean;
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
  prevThread,
  isFirstThreadOfDate,
}: ThreadItemProps) => {
  const isSameUser = prevThreadUserId === thread.userId;

  const [popupVisible, setPopupVisible] = useState(false);

  const handleMouseEnter = () => {
    setPopupVisible(true);
  };

  const handleMouseLeave = () => {
    setPopupVisible(false);
  };

  return (
    <>
      {isSameUser &&
      !isFirstThreadOfDate &&
      prevThread &&
      !prevThread.isDeleted &&
      prevThread?.subCount === 0 &&
      !thread.isDeleted &&
      thread.subCount === 0 ? (
        <SameUserContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <SameUserDateBox>
            {popupVisible && (
              <DateTimeBox>
                {get12HourTime(thread.createdAt).replace('AM', '').replace('PM', '')}
              </DateTimeBox>
            )}
          </SameUserDateBox>
          <ContentBox>
            <ContentBottom>{thread.content}</ContentBottom>
            <EmojiBox thread={thread} />
            {thread.subCount > 0 && !isParentThreadOfRightSideBar && (
              <ReplyButton thread={thread} />
            )}
          </ContentBox>
          {popupVisible && (
            <Popup isSubThread={!!thread.parentId || !!isParentThreadOfRightSideBar}>
              <ThreadPopup
                thread={thread}
                isParentThreadOfRightSideBar={isParentThreadOfRightSideBar}
              />
            </Popup>
          )}
        </SameUserContainer>
      ) : (
        <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {thread.isDeleted ? (
            <DeletedItemImgBox>
              <TrashIcon />
            </DeletedItemImgBox>
          ) : (
            <UserImgBox>
              <LazyImage
                src={thread.image}
                width="36"
                height="36"
                errorImage={USER_DEFAULT_PROFILE_URL}
              />
            </UserImgBox>
          )}
          <ContentBox>
            {!thread.isDeleted && (
              <ContentTop>
                <UserNameBox>{thread.displayName}</UserNameBox>
                <DateTimeBox>{get12HourTime(thread.createdAt)}</DateTimeBox>
              </ContentTop>
            )}
            <ContentBottom>{thread.content}</ContentBottom>
            <EmojiBox thread={thread} />
            {thread.subCount > 0 && !isParentThreadOfRightSideBar && (
              <ReplyButton thread={thread} />
            )}
          </ContentBox>
          {popupVisible && (
            <Popup isSubThread={!!thread.parentId || !!isParentThreadOfRightSideBar}>
              <ThreadPopup
                thread={thread}
                isParentThreadOfRightSideBar={isParentThreadOfRightSideBar}
              />
            </Popup>
          )}
        </Container>
      )}
    </>
  );
};

ThreadItem.defaultProps = {
  isParentThreadOfRightSideBar: false,
  prevThreadUserId: THIS_IS_FIRST_THREAD_OR_SUB_THREAD,
  prevThread: undefined,
  isFirstThreadOfDate: undefined,
};

export default ThreadItem;
