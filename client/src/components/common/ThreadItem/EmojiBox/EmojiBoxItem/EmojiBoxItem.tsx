import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { EmojiOfThread, Thread } from '@/types/thread';
import { flex } from '@/styles/mixin';
import { useChannelState, useEmojiState, useUserState } from '@/hooks';
import { useDispatch } from 'react-redux';
import { SOCKET_MESSAGE_TYPE } from '@/utils/constants';
import { sendMessageRequest } from '@/store/modules/socket.slice';
import LazyImage from '@/components/common/LazyImage/LazyImage';
import TooltipPopup from './TooltipPopup/TooltipPopup';

interface ContainerProps {
  isMine: boolean;
}

const Container = styled.div<ContainerProps>`
  background-color: ${(props) => (props.isMine ? '#E2EFF4' : '#EFEFEF')};
  box-shadow: inset 0 0 0 1px ${(props) => (props.isMine ? '#1D9BD1' : '#EFEFEF')};
  ${flex()};
  position: relative;
  cursor: pointer;
  width: 2.6rem;
  height: 1.6rem;
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

const EmojiItem = styled.div`
  ${flex()};
`;
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

const EmojiCount = styled.span`
  font-size: 0.8rem;
  font-weight: 800;
  margin: 0 3px;
  color: ${(props) => props.theme.color.blue1};
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
  const [isMine, setIsMine] = useState(false);

  useEffect(() => {
    if (userInfo && emoji.userList.includes(userInfo.id)) {
      setIsMine(true);
    } else {
      setIsMine(false);
    }
  }, [emoji]);

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

  const getEmojiUrl = (emojiId: number): string => {
    return (
      emojiList?.find((emojiEl) => {
        return emojiEl.id === emojiId;
      })?.url ?? 'https://via.placeholder.com/40'
    );
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
    setIsMine((mine) => !mine);
  };

  const ref = useRef<HTMLDivElement>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <Container
      isMine={isMine}
      onClick={clickEmojiHandler}
      ref={ref}
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      {ref.current && tooltipVisible && (
        <TooltipPopup anchorEl={ref.current} top={-10} left={-30}>
          <EmojiToolTip>
            <LazyImage
              src={getEmojiUrl(emoji.id)}
              width="36"
              height="36"
              style={{
                marginBottom: '0.4rem',
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '4px',
              }}
            />
            <ToolTipDescribe>
              {getUserListNameInEmoji(emoji)}
              {`reacted with :${getToolTipDescribe(emoji.id)}:`}
            </ToolTipDescribe>
          </EmojiToolTip>
        </TooltipPopup>
      )}
      <EmojiItem>
        <LazyImage src={getEmojiUrl(emoji.id)} width="16px" height="16px" />
        {emoji.userList && <EmojiCount>{emoji.userList.length}</EmojiCount>}
      </EmojiItem>
    </Container>
  );
};

export default EmojiBoxItem;
