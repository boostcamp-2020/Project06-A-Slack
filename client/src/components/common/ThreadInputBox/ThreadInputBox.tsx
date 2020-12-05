import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createThreadRequest } from '@/store/modules/thread.slice';
import { useParams } from 'react-router-dom';
import { useChannelState, useUserState } from '@/hooks';
import { INPUT_BOX_TYPE } from '@/utils/constants';
import { PaperPlaneIcon } from '@/components';
import { SubmitButton as SB } from '@/styles/shared';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import theme from '@/styles/theme';

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
  height: 1.7rem;
  max-height: 15rem;
  border: 0;
  outline: 0;
  resize: none;
  line-height: 1.6;
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

const getParentId = (inputBoxType: string, threadId: string | undefined) => {
  if (!threadId || inputBoxType === INPUT_BOX_TYPE.THREAD) {
    return null;
  }
  return Number(threadId);
};

const ThreadInputBox: React.FC<ThreadInputBoxProps> = ({ inputBoxType }: ThreadInputBoxProps) => {
  const { channelId, threadId }: RightSideParams = useParams();
  const { userInfo } = useUserState();

  const [disable, setDisable] = useState(true);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const parentId = getParentId(inputBoxType, threadId);

  const commentRef = useRef<HTMLTextAreaElement>(null);

  const { current } = useChannelState();

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

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.ctrlKey) {
        /* TODO: ctrl + Enter 커스텀하기 */
        // console.log('ctrl enter', comment);
        // const before = comment.substring(0, commentRef.current?.selectionStart);
        // const after = comment.substring(commentRef.current?.selectionEnd as number, comment.length);
        // console.log(`${before}\n${after}`);
        // setComment(`${before}\n${after}`);
      }
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInfo !== null) {
      const userId = Number(userInfo.id);
      const content = comment;
      dispatch(
        createThreadRequest({
          content,
          userId,
          channelId: Number(channelId),
          parentId,
        }),
      );
    }
  };

  return (
    <Container onSubmit={submitHandler}>
      <CommentBox>
        <TextBox>
          <TextArea
            onChange={handleChange}
            onKeyDown={handleKeyUp}
            placeholder={parentId ? 'Reply...' : `Send a message ${current?.name}`}
            ref={commentRef}
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
