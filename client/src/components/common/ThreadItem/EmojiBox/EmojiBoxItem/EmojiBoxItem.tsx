import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { EmojiOfThread, Thread } from '@/types/thread';
import { flex } from '@/styles/mixin';
import { useChannelState, useEmojiState, useUserState } from '@/hooks';
import { useDispatch } from 'react-redux';
import { SOCKET_MESSAGE_TYPE } from '@/utils/constants';
import { sendMessageRequest } from '@/store/modules/socket.slice';
import TooltipPopup from './TooltipPopup/TooltipPopup';

const Container = styled.div`
  background-color: ${(props) => props.color};
  box-shadow: inset 0 0 0 1px rgba(29, 155, 209);
  ${flex('center', 'flex-start', 'row')};
  position: relative;
  cursor: pointer;
  padding: 0.15rem 0.4rem;
  border-radius: 999em;
  margin-right: 0.2rem;
`;

const EmojiToolTip = styled.div`
  width: 12rem;
  ${flex('center', 'center', 'column')};
  padding: 0.8rem;
  background-color: black;
  color: white;
  border: 1px solid black;
  border-radius: 8px;
`;

const EmojiItem = styled.div``;
const TooltipImg = styled.img`
  width: 36px;
  height: 36px;
  margin-bottom: 0.4rem;
  background-color: white;
  border-radius: 8px;
  padding: 4px;
`;

const ToolTipDescribe = styled.div`
  font-size: 0.9rem;
  word-break: break-all;
`;

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
    return `${getEmojiName(emojiId)}`;
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

  const ref = useRef<HTMLDivElement>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <Container
      color={backgroundColor}
      onClick={clickEmojiHandler}
      ref={ref}
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      {ref.current && tooltipVisible && (
        <TooltipPopup anchorEl={ref.current} top={-10} left={-30}>
          <EmojiToolTip>
            <TooltipImg src={getEmojiUrl(emoji.id)} />
            <ToolTipDescribe>
              {getUserListNameInEmoji(emoji)}
              {`reacted with :${getToolTipDescribe(emoji.id)}:`}
            </ToolTipDescribe>
          </EmojiToolTip>
        </TooltipPopup>
      )}
      <EmojiItem>
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
