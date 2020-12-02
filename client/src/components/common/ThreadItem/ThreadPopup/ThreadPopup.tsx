import React from 'react';
import styled from 'styled-components';
import { Thread } from '@/types';
import { Link } from 'react-router-dom';

const Container = styled.div`
  background-color: blue;
  button {
    font-size: ${(props) => props.theme.size.xs};
  }
`;

interface ThreadPopupProps {
  thread: Thread;
}

const ThreadPopup: React.FC<ThreadPopupProps> = ({ thread }: ThreadPopupProps) => {
  return (
    <Container>
      <button type="button">reaction</button>
      <Link to={`/client/1/${thread.channelId}/thread/${thread.id}`}>
        <button type="button">replyInThread</button>
      </Link>
      <button type="button">shareMessage</button>
      <button type="button">Save</button>
      <button type="button">MoreActions</button>
    </Container>
  );
};

export default ThreadPopup;
