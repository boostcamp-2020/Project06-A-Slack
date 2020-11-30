import React, { useState } from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import { changeTopic, openTopicModal } from '@/store/modules/channel';
import { useDispatch } from 'react-redux';

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  ${flex()};
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
`;

const Container = styled.div`
  border-radius: 10px;
  padding: ${(props) => props.theme.size.xxl};
  background: ${(props) => props.theme.color.white};
  width: 500px;
  height: 220px;
  box-shadow: ${(props) => props.theme.boxShadow.darkgray};
`;

const Header = styled.div`
  ${flex('center', 'space-between')};
  margin-bottom: 20px;
  font-size: ${(props) => props.theme.size.xxxl};
  color: ${(props) => props.theme.color.black1};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.color.gray2};
  font-size: ${(props) => props.theme.size.xxxl};
  &:hover {
    transition: 0.3s;
    background: ${(props) => props.theme.color.gray5};
  }
`;

const HeaderContent = styled.div`
  font-size: ${(props) => props.theme.size.l};
`;

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

const AddTopicModal = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onCancel = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(openTopicModal());
  };
  const onSubmit = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(changeTopic(content));
    dispatch(openTopicModal());
  };

  return (
    <ModalBackground>
      <Container>
        <Header>
          <HeaderContent>Edit channel topic</HeaderContent>
          <CloseButton onClick={onCancel}>X</CloseButton>
        </Header>
        <TextArea value={content} onChange={onChange} />
        <ButtonBox>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
          <SubmitButton onClick={onSubmit}>Set Topic</SubmitButton>
        </ButtonBox>
      </Container>
    </ModalBackground>
  );
};

export default AddTopicModal;
