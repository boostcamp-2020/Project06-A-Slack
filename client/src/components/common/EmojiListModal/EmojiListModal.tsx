import React from 'react';
import styled from 'styled-components';
import { Thread } from '@/types/thread';
import { flex } from '@/styles/mixin';
import { useChannelState, useEmojiState, useUserState } from '@/hooks';
import { useDispatch } from 'react-redux';
import { sendMessageRequest } from '@/store/modules/socket.slice';
import { SOCKET_MESSAGE_TYPE } from '@/utils/constants';

const Container = styled.div`
  ${flex('center', 'flex-start', 'row')};
`;

const Emoji = styled.img`
  width: 22px;
  height: 22px;
  user-select: none;
  cursor: pointer;
`;

interface EmojiListModalProps {
  thread: Thread;
}

const EmojiListModal: React.FC<EmojiListModalProps> = ({ thread }: EmojiListModalProps) => {
  const { userInfo } = useUserState();
  const { current } = useChannelState();
  const { emojiList } = useEmojiState();
  const dispatch = useDispatch();

  const clickEmojiHandler = (emojiId: number) => {
    if (userInfo) {
      dispatch(
        sendMessageRequest({
          type: SOCKET_MESSAGE_TYPE.EMOJI,
          emojiId,
          userId: Number(userInfo.id),
          threadId: Number(thread.id),
          room: current?.name as string,
        }),
      );
    }
  };

  return (
    <Container>
      {emojiList?.map((emoji) => {
        return (
          <Emoji
            key={emoji.id}
            src={emoji.url}
            alt="emoji url"
            onClick={() => clickEmojiHandler(Number(emoji.id))}
          />
        );
      })}
    </Container>
  );
};

export default EmojiListModal;
