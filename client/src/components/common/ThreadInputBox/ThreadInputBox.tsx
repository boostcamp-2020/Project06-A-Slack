import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessageRequest } from '@/store/modules/socket.slice';
import { useParams } from 'react-router-dom';
import { useChannelState, useUserState } from '@/hooks';
import { INPUT_BOX_TYPE, SOCKET_MESSAGE_TYPE, THREAD_SUBTYPE } from '@/utils/constants';
import { PaperPlaneIcon } from '@/components';
import { SubmitButton as SB } from '@/styles/shared';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import theme from '@/styles/theme';
import { setScrollable } from '@/store/modules/thread.slice';
import { Thread } from '@/types';
import { getFormattedDate } from '@/utils/utils';

interface ThreadInputBoxProps {
  inputBoxType: string;
}

interface RightSideParams {
  channelId: string | undefined;
  rightSideType: string | undefined;
  threadId: string | undefined;
}

const Container = styled.form`
  width: 100%;
  flex-shrink: 0;
  padding: 1.2rem;
  background-color: white;
  border-radius: 5px;
`;

const CommentBox = styled.div`
  border: 1px solid ${(props) => props.theme.color.black4};
  border-radius: 5px;
`;

const TextBox = styled.div`
  padding: 0.5rem;
  border-radius: 5px 5px 0 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 1.8rem;
  max-height: 15rem;
  border: 0;
  outline: 0;
  resize: none;
  line-height: 1.7;
  font-size: 0.9rem;
  &::placeholder {
    color: ${(props) => props.theme.color.gray1};
  }
`;

const ControlBox = styled.div`
  padding: 0.2rem;
  background-color: #f8f8f8;
  width: 100%;
  ${flex('center', 'flex-end')};
  border-top: 1px solid ${(props) => props.theme.color.lightGray2};
  border-radius: 0 0 5px 5px;
`;

const SubmitButton = styled(SB)`
  width: 2rem;
  height: 2rem;
  padding: 0;
  outline: 0;
  ${flex()};
  transition: 0.3s;
  &:disabled {
    transition: 0.3s;
    cursor: unset;
    background-color: unset;
    border: 1px solid transparent;
  }
`;

const Editer = styled.div`
  outline: 0;
  max-height: 10rem;
  overflow-y: auto;
  line-height: 1.8;
  font-size: 0.9rem;
`;

const getParentId = (inputBoxType: string, threadId: string | undefined) => {
  if (!threadId || inputBoxType === INPUT_BOX_TYPE.THREAD) {
    return null;
  }
  return Number(threadId);
};

const ThreadInputBox: React.FC<ThreadInputBoxProps> = ({ inputBoxType }: ThreadInputBoxProps) => {
  const { threadId }: RightSideParams = useParams();
  const { userInfo } = useUserState();

  const [disable, setDisable] = useState(true);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const parentId = getParentId(inputBoxType, threadId);

  const commentRef = useRef<HTMLTextAreaElement>(null);

  const { current } = useChannelState();

  const sendMessage = () => {
    if (!comment.trim()) {
      return;
    }

    if (userInfo) {
      const thread = {
        userId: userInfo.id,
        displayName: userInfo.displayName,
        phoneNumber: userInfo.phoneNumber,
        image: userInfo.image,
        email: userInfo.email,
        channelId: current?.id as number,
        content: comment,
        url: 'this is url',
        isEdited: 0,
        isPinned: 0,
        isDeleted: 0,
        parentId,
        emoji: [],
        subCount: 0,
        subThreadUserId1: null,
        subThreadUserId2: null,
        subThreadUserId3: null,
        createdAt: getFormattedDate(new Date()),
      };
      dispatch(
        sendMessageRequest({
          type: SOCKET_MESSAGE_TYPE.THREAD,
          thread,
          room: current?.name as string,
          subType: THREAD_SUBTYPE.CREATE_THREAD,
        }),
      );
      if (!parentId) {
        dispatch(setScrollable({ canScroll: true }));
      }
    }
  };

  const handleInput = (e: any) => {
    console.log(e.target.innerText);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setComment(value);
    if (value.trim()) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    e.target.style.height = '1px';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      /* TODO: ctrl + Enter 눌렀을 때 줄바꿈 */
      // if (e.ctrlKey) {
      //   const before = comment.substring(0, commentRef.current?.selectionStart);
      //   const after = comment.substring(commentRef.current?.selectionEnd as number, comment.length);
      //   setComment(`${before}\n${after}`);

      //   if (commentRef.current) {
      //     commentRef.current.style.height = '1px';
      //     commentRef.current.style.height = `${commentRef.current.scrollHeight + 24}px`;
      //   }
      //   return;
      // }
      e.preventDefault();
      sendMessage();
      setComment('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
    setComment('');
  };

  return (
    <Container onSubmit={handleSubmit}>
      <CommentBox>
        <TextBox>
          {/* <Editer
            contentEditable
            onInput={handleInput}
            placeholder={parentId ? 'Reply...' : `Send a message ${current?.name}`}
          /> */}

          <TextArea
            onChange={handleChange}
            onKeyPress={handleKey}
            placeholder={parentId ? 'Reply...' : `Send a message ${current?.name}`}
            ref={commentRef}
            value={comment}
          />
        </TextBox>
        <ControlBox>
          <SubmitButton disabled={disable}>
            <PaperPlaneIcon size="14px" color={disable ? theme.color.gray4 : 'white'} />
          </SubmitButton>
        </ControlBox>
      </CommentBox>
    </Container>
  );
};

export default ThreadInputBox;
