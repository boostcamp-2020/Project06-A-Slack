import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Thread } from '@/types';
import { Link } from 'react-router-dom';
import { Popover, ReactionIcon, CommentIcon, DotIcon, EmojiListModal } from '@/components';
import { flex, hoverActive } from '@/styles/mixin';
import { useDispatch } from 'react-redux';
import theme from '@/styles/theme';
import { sendMessageRequest } from '@/store/modules/socket.slice';
import { SOCKET_MESSAGE_TYPE, THREAD_SUBTYPE } from '@/utils/constants';
import { useChannelState, useUserState } from '@/hooks';

const Container = styled.div`
  position: relative;
  ${flex()};
  border-radius: 5px;
  background-color: white;
  border: 1.5px solid ${(props) => props.theme.color.lightGray1};
  button {
    font-size: ${(props) => props.theme.size.xs};
  }
`;

const Modal = styled.div`
  position: absolute;
  top: -0.5rem;
  right: -8rem;
`;

const ModalListItem = styled.div`
  width: 100%;
  padding: 0.4rem 1.2rem;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: ${(props) => props.theme.color.blue1};
  }
`;

const ModalItems = styled.div`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 5px;
  ${hoverActive};
  ${flex()};
`;

const ReactionBox = styled(ModalItems)`
  padding-bottom: 0.2rem;
`;
const CommentBox = styled(ModalItems)``;
const MoreActionBox = styled(ModalItems)`
  position: relative;
`;

interface ThreadPopupProps {
  thread: Thread;
  isParentThreadOfRightSideBar?: boolean;
}

const ThreadPopup: React.FC<ThreadPopupProps> = ({
  thread,
  isParentThreadOfRightSideBar,
}: ThreadPopupProps) => {
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [reactionModalVisible, setReactionModalVisible] = useState(false);

  const { current } = useChannelState();
  const dispatch = useDispatch();
  const { userInfo } = useUserState();

  const openMenuModal = () => setMenuModalVisible(true);
  const openReactionModal = () => setReactionModalVisible(true);

  const popoverRef = useRef<HTMLDivElement>(null);
  const reactionBoxRef = useRef<HTMLDivElement>(null);

  const clickDeleteMessage = () => {
    dispatch(
      sendMessageRequest({
        type: SOCKET_MESSAGE_TYPE.THREAD,
        room: current?.name as string,
        subType: THREAD_SUBTYPE.DELETE_THREAD,
        thread,
      }),
    );
  };

  return (
    <Container>
      <ReactionBox onClick={openReactionModal} ref={reactionBoxRef}>
        <ReactionIcon size="23px" color={theme.color.black5} />
      </ReactionBox>
      {!thread.parentId && !isParentThreadOfRightSideBar && (
        <Link to={`/client/1/${thread.channelId}/thread/${thread.id}`}>
          <CommentBox>
            <CommentIcon size="18px" color={theme.color.black5} />
          </CommentBox>
        </Link>
      )}
      {userInfo?.id === thread.userId && (
        <MoreActionBox onClick={openMenuModal} ref={popoverRef}>
          <DotIcon color={theme.color.black5} />
        </MoreActionBox>
      )}
      {menuModalVisible && popoverRef.current && (
        <Popover
          anchorEl={popoverRef.current}
          offset={{ top: 0, left: 5 }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'center', horizontal: 'right' }}
          visible={menuModalVisible}
          setVisible={setMenuModalVisible}
        >
          <ModalListItem>Edit message</ModalListItem>
          <ModalListItem onClick={clickDeleteMessage}>Delete message</ModalListItem>
        </Popover>
      )}
      {reactionModalVisible && reactionBoxRef.current && (
        <Popover
          anchorEl={reactionBoxRef.current}
          offset={{ top: 0, left: 5 }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'center', horizontal: 'right' }}
          visible={reactionModalVisible}
          setVisible={setReactionModalVisible}
        >
          <EmojiListModal thread={thread} />
        </Popover>
      )}
    </Container>
  );
};

ThreadPopup.defaultProps = {
  isParentThreadOfRightSideBar: false,
};

export default ThreadPopup;
