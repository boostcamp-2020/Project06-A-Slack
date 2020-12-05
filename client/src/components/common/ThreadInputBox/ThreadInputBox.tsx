import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createThreadRequest } from '@/store/modules/thread.slice';
import { useParams } from 'react-router-dom';
import { useChannelState, useUserState } from '@/hooks';
import { INPUT_BOX_TYPE } from '@/utils/constants';
import { PaperPlaneIcon } from '@/components';
import { SubmitButton as SB } from '@/styles/shared';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';

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
  height: 5rem;
  flex-shrink: 0;
  border: 1px solid ${(props) => props.theme.color.lightGray1};
`;

const TextBox = styled.textarea`
  width: 100%;
`;

const ControlBox = styled.div`
  width: 100%;
  ${flex('center', 'flex-end')};
`;

const SubmitButton = styled(SB)`
  width: 2rem;
  height: 2rem;
  padding: 0;
  outline: 0;
  ${flex()};
`;

const getParentId = (inputBoxType: string, threadId: string | undefined) => {
  if (threadId === undefined || inputBoxType === INPUT_BOX_TYPE.THREAD) {
    return null;
  }
  return Number(threadId);
};

const ThreadInputBox: React.FC<ThreadInputBoxProps> = ({ inputBoxType }: ThreadInputBoxProps) => {
  const { channelId, threadId }: RightSideParams = useParams();
  const { userInfo } = useUserState();

  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const { current } = useChannelState();

  const inputValueHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInfo !== null) {
      const userId = Number(userInfo.id);
      const parentId = getParentId(inputBoxType, threadId);
      const content = inputValue;
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
      <TextBox onChange={inputValueHandler} placeholder={`Send a message ${current?.name}`} />
      <ControlBox>
        <SubmitButton>
          <PaperPlaneIcon size="14px" color="white" />
        </SubmitButton>
      </ControlBox>
    </Container>
  );
};

export default ThreadInputBox;
