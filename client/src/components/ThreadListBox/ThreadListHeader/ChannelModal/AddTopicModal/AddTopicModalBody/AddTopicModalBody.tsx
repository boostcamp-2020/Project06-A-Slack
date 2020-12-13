import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import { useDispatch } from 'react-redux';
import { useChannelState } from '@/hooks';
import { sendMessageRequest } from '@/store/modules/socket.slice';
import { SOCKET_MESSAGE_TYPE, CHANNEL_SUBTYPE } from '@/utils/constants';
import { FormInput, SubmitButton as SB, CancelButton as CB } from '@/styles/shared';

const ModalBody = styled.div`
  ${flex()};
  padding: 0 0.5rem;
`;

const TextArea = styled(FormInput)`
  width: 100%;
  height: 90px;
  font-size: ${(props) => props.theme.size.m};
  resize: none;
`;

const ModalFooter = styled.div`
  width: 100%;
  height: 100%;
  margin: 1.5rem 0;
  border-radius: 0 0 5px 5px;
  ${flex('center', 'flex-end')};
`;

const CancelButton = styled(CB)`
  font-weight: 800;
  margin: 0 0.5rem;
`;

const SubmitButton = styled(SB)`
  font-weight: 800;
  margin: 0 0.5rem;
`;

interface AddTopicModalBodyProps {
  setAddTopicModalVisible: (fn: (state: boolean) => boolean) => void;
}

const AddTopicModalBody: React.FC<AddTopicModalBodyProps> = ({
  setAddTopicModalVisible,
}: AddTopicModalBodyProps) => {
  const { current } = useChannelState();
  const [content, setContent] = useState(current?.topic ?? '');
  const dispatch = useDispatch();

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const clickCancel = () => {
    setAddTopicModalVisible((state: boolean) => !state);
  };

  const clickSubmit = () => {
    if (current?.id) {
      dispatch(
        sendMessageRequest({
          type: SOCKET_MESSAGE_TYPE.CHANNEL,
          subType: CHANNEL_SUBTYPE.UPDATE_CHANNEL_TOPIC,
          channel: { ...current, topic: content },
          room: current?.name as string,
        }),
      );
      setAddTopicModalVisible((state: boolean) => !state);
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <>
      <ModalBody>
        <TextArea value={content} as="textarea" onChange={changeContent} ref={textareaRef} />
      </ModalBody>
      <ModalFooter>
        <CancelButton onClick={clickCancel}>Cancel</CancelButton>
        <SubmitButton onClick={clickSubmit}>Set Topic</SubmitButton>
      </ModalFooter>
    </>
  );
};

export default AddTopicModalBody;
