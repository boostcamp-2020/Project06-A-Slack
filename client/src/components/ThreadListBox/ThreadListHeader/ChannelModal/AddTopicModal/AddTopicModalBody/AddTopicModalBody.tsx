import React, { ReactElement, useRef, useState } from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import { setCurrent } from '@/store/modules/channel.slice';
import { useDispatch } from 'react-redux';
import { useChannelState } from '@/hooks';
import { sendMessageRequest } from '@/store/modules/socket.slice';
import { SOCKET_MESSAGE_TYPE } from '@/utils/constants';

const TextArea = styled.textarea`
  border: 1px ${(props) => props.theme.color.gray4} solid;
  border-radius: 3px;
  width: 100%;
  height: 80px;
  margin-bottom: 15px;
  font-size: ${(props) => props.theme.size.m};
  &:focus {
    transition: 0.3s;
    box-shadow: ${(props) => props.theme.boxShadow.skyblue};
  }
`;

const ButtonBox = styled.div`
  ${flex('center', 'flex-end')}
`;

const CancelButton = styled.button`
  border: 1px ${(props) => props.theme.color.gray6} solid;
  border-radius: 3px;
  color: ${(props) => props.theme.color.gray2};
  background: ${(props) => props.theme.color.white};
  &:hover {
    transition: 0.3s;
    background: ${(props) => props.theme.color.gray5};
  }
  margin-right: 10px;
  height: 30px;
`;

const SubmitButton = styled.button`
  border: 1px ${(props) => props.theme.color.gray6} solid;
  border-radius: 3px;
  color: ${(props) => props.theme.color.white};
  background: ${(props) => props.theme.color.green1};
  &:hover {
    transition: 0.3s;
    background: ${(props) => props.theme.color.green2};
  }
  height: 30px;
`;

interface AddTopicModalBodyProps {
  setAddTopicModalVisible: (fn: (state: boolean) => boolean) => void;
}

const AddTopicModalBody: React.FC<AddTopicModalBodyProps> = ({
  setAddTopicModalVisible,
}: AddTopicModalBodyProps) => {
  const [content, setContent] = useState('');
  const { current } = useChannelState();
  const dispatch = useDispatch();

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const clickCancel = () => {
    setAddTopicModalVisible((state: boolean) => !state);
  };

  const clickSubmit = () => {
    if (current?.id) {
      // TODO !! 로직 변경
      dispatch(
        sendMessageRequest({
          type: SOCKET_MESSAGE_TYPE.CHANNEL,
          channel: { ...current, topic: content },
          room: current?.name as string,
        }),
      );
      setAddTopicModalVisible((state: boolean) => !state);
    }
  };

  return (
    <>
      <TextArea value={content} onChange={changeContent} />
      <ButtonBox>
        <CancelButton onClick={clickCancel}>Cancel</CancelButton>
        <SubmitButton onClick={clickSubmit}>Set Topic</SubmitButton>
      </ButtonBox>
    </>
  );
};

export default AddTopicModalBody;
