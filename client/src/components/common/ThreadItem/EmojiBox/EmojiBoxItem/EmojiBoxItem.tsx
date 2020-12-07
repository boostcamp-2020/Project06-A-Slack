import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Emoji } from '@/types/thread';
import { flex } from '@/styles/mixin';
import { useChannelState } from '@/hooks';

const Container = styled.div`
  background-color: #e8f5fa;
  border: 1px solid #1d9bd1;
  ${flex('center', 'flex-start', 'row')};
  position: relative;
  cursor: pointer;
`;

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

const ToolTipDescribe = styled.div``;

interface EmojiBoxItemProps {
  emoji: Emoji;
}

const EmojiBoxItem: React.FC<EmojiBoxItemProps> = ({ emoji }: EmojiBoxItemProps) => {
  const { users } = useChannelState();

  const emojiList = {
    emoji: [
      {
        id: 1,
        name: 'thumbsup',
        url:
          'https://a.slack-edge.com/production-standard-emoji-assets/10.2/google-medium/1f44d.png',
      },
      {
        id: 2,
        name: 'party-blob',
        url: 'https://emoji.slack-edge.com/T019JFET9H7/party-blob/8d60acb47866b650.gif',
      },
      {
        id: 3,
        name: 'clapping-all',
        url: 'https://emoji.slack-edge.com/T019JFET9H7/clapping-all/a2cf33ed57ed94f4.gif',
      },
    ],
  };

  const getUserListNameInEmoji = (emojiProp: Emoji) => {
    return emojiProp.userList.reduce((acc, userId, idx, arr) => {
      const userInfo = users.find((user) => user.userId === userId);
      if (idx === arr.length - 1) {
        return `${acc} ${userInfo?.displayName} `;
      }
      return `${acc} ${userInfo?.displayName}, `;
    }, '');
  };

  const getEmojiName = (emojiId: number) => {
    return emojiList.emoji.find((emojiEl) => {
      return emojiEl.id === emojiId;
    })?.name;
  };

  const getToolTipDescribe = (emojiId: number) => {
    return `reacted width ${getEmojiName(emojiId)}`;
  };

  const getEmojiUrl = (emojiId: number) => {
    return emojiList.emoji.find((emojiEl) => {
      return emojiEl.id === emojiId;
    })?.url;
  };

  return (
    <Container>
      <EmojiToolTip>
        <img
          key={`${emoji.id}ToolTip`}
          src={getEmojiUrl(Number(emoji.id))}
          alt="emoji url"
          width="36px"
          height="36px"
        />
        <ToolTipDescribe>
          {getUserListNameInEmoji(emoji)}
          {getToolTipDescribe(Number(emoji.id))}
        </ToolTipDescribe>
      </EmojiToolTip>
      <img
        key={`${emoji.id}`}
        src={getEmojiUrl(Number(emoji.id))}
        alt="emoji url"
        width="16px"
        height="16px"
      />
      {emoji.userList && <span key={`${emoji.id}length`}>{emoji.userList.length}</span>}
    </Container>
  );
};

export default EmojiBoxItem;
