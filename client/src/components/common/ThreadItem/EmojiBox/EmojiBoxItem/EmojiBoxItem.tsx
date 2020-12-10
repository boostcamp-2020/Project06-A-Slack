import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EmojiOfThread, Thread } from '@/types/thread';
import { flex } from '@/styles/mixin';
import { useChannelState, useEmojiState, useUserState } from '@/hooks';
import { useDispatch } from 'react-redux';
import { SOCKET_MESSAGE_TYPE } from '@/utils/constants';
import { sendMessageRequest } from '@/store/modules/socket.slice';
import { JoinedUser } from '@/types';

const Container = styled.div`
  background-color: ${(props) => props.color};
  border: 1px solid #1d9bd1;
  ${flex('center', 'flex-start', 'row')};
  position: relative;
  cursor: pointer;
`;
// EFEFEF

const EmojiToolTip = styled.div`
  background-color: black;
  /* color: #505050; */
  color: white;
  border: 1px solid black;
  visibility: hidden;
  position: absolute;
  z-index: 1;
  bottom: 2rem;
  width: 10rem;
  ${Container}:hover & {
    visibility: visible;
  }
`;

const EmojiItem = styled.div``;

const ToolTipDescribe = styled.div``;

interface EmojiBoxItemProps {
  emoji: EmojiOfThread;
  thread: Thread;
}

const EmojiBoxItem: React.FC<EmojiBoxItemProps> = ({ emoji, thread }: EmojiBoxItemProps) => {
  const { userInfo } = useUserState();
  const { users, current } = useChannelState();
  const { emojiList } = useEmojiState();
  const dispatch = useDispatch();
  const [backgroundColor, setbackgroundColor] = useState('#EFEFEF');

  useEffect(() => {
    if (userInfo && emoji.userList.includes(userInfo.id)) {
      setbackgroundColor('#E2EFF4');
    }
  }, []);

  const getUserListNameInEmoji = (emojiProp: EmojiOfThread) => {
    return emojiProp.userList.reduce((acc, userIdInEmojiOfThread, idx, arr) => {
      const displayName = users.find((user) => user.userId === userIdInEmojiOfThread)?.displayName;
      const userId = users.find((user) => user.userId === userIdInEmojiOfThread)?.userId;
      const emojiUserName = userId === userInfo?.id ? 'you' : displayName;

      if (arr.length === 1) {
        if (emojiUserName === 'you') {
          return `${acc}you `;
        }
        return `${acc}${emojiUserName} `;
      }
      if (idx === arr.length - 1) {
        return `${acc} and ${emojiUserName} `;
      }
      return `${acc} ${emojiUserName}, `;
    }, '');
  };

  const getEmojiName = (emojiId: number) => {
    return emojiList?.find((emojiEl) => {
      return emojiEl.id === emojiId;
    })?.name;
  };

  const getToolTipDescribe = (emojiId: number) => {
    return `reacted width ${getEmojiName(emojiId)}`;
  };

  const getEmojiUrl = (emojiId: number) => {
    return emojiList?.find((emojiEl) => {
      return emojiEl.id === emojiId;
    })?.url;
  };

  const clickEmojiHandler = () => {
    if (userInfo) {
      dispatch(
        sendMessageRequest({
          type: SOCKET_MESSAGE_TYPE.EMOJI,
          emojiId: emoji.id,
          userId: Number(userInfo.id),
          threadId: Number(thread.id),
          room: current?.name as string,
        }),
      );
    }
    if (backgroundColor === '#EFEFEF') {
      return setbackgroundColor('#E2EFF4');
    }
    return setbackgroundColor('#EFEFEF');
  };

  return (
    <Container color={backgroundColor}>
      <EmojiToolTip>
        <img
          key={`${emoji.id}ToolTip`}
          src={getEmojiUrl(emoji.id)}
          alt="emoji url"
          width="36px"
          height="36px"
        />
        <ToolTipDescribe>
          {getUserListNameInEmoji(emoji)}
          {getToolTipDescribe(emoji.id)}
        </ToolTipDescribe>
      </EmojiToolTip>
      <EmojiItem onClick={clickEmojiHandler}>
        <img
          key={emoji.id}
          src={getEmojiUrl(emoji.id)}
          alt="emoji url"
          width="16px"
          height="16px"
        />
        {emoji.userList && <span key={`${emoji.id}length`}>{emoji.userList.length}</span>}
      </EmojiItem>
    </Container>
  );
};

export default EmojiBoxItem;
