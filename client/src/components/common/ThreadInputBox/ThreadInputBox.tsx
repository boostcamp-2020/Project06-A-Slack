import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createThreadRequest } from '@/store/modules/thread';
import { useParams } from 'react-router-dom';
import { useUser } from '@/hooks';
import { INPUT_BOX_TYPE } from '@/utils/constants';

interface ThreadInputBoxProps {
  inputBoxType: string;
}

interface RightSideParams {
  channelId: string | undefined;
  rightSideType: string | undefined;
  threadId: string | undefined;
}

const getParentId = (inputBoxType: string, threadId: string | undefined) => {
  if (threadId === undefined || inputBoxType === INPUT_BOX_TYPE.THREAD) {
    return null;
  }
  return Number(threadId);
};

const ThreadInputBox: React.FC<ThreadInputBoxProps> = ({ inputBoxType }: ThreadInputBoxProps) => {
  const { channelId, threadId }: RightSideParams = useParams();
  const { userInfo } = useUser();

  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const inputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <form onSubmit={submitHandler}>
      <input type="text" onChange={inputValueHandler} />
      <input type="submit" value=">" />
    </form>
  );
};

export default ThreadInputBox;
