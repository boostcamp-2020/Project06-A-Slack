import React from 'react';
import styled from 'styled-components';
import { Thread } from '@/types/thread';
import { useChannelState, useEmojiState, useUserState } from '@/hooks';
import { useDispatch } from 'react-redux';
import { sendMessageRequest } from '@/store/modules/socket.slice';
import { SOCKET_MESSAGE_TYPE } from '@/utils/constants';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`;

const EmojiBox = styled.div`
  cursor: pointer;
  transition: 0.3;
  &:hover {
    transition: 0.3;
    background-color: #b5e0fe;
  }
  border-radius: 5px;
`;

const Emoji = styled.img`
  width: 22px;
  height: 22px;
  margin: 0.2rem;
  border-radius: 5px;
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
          <EmojiBox key={emoji.id}>
            <Emoji src={emoji.url} onClick={() => clickEmojiHandler(Number(emoji.id))} />
          </EmojiBox>
        );
      })}
    </Container>
  );
};

export default EmojiListModal;
