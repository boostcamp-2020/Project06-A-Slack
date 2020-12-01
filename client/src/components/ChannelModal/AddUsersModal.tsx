/* eslint-disable @typescript-eslint/ban-types */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import { useChannel, useOnClickOutside } from '@/hooks';
import { joinChannelRequset } from '@/store/modules/channel';

interface Props {
  ref: any;
}

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  ${flex()};
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
`;

const Container = styled.div<Props>`
  border-radius: 10px;
  padding: ${(props) => props.theme.size.xxl};
  background: ${(props) => props.theme.color.white};
  width: 500px;
  box-shadow: ${(props) => props.theme.boxShadow.darkgray};
`;

const Header = styled.div`
  ${flex('center', 'space-between')};
  margin-bottom: 20px;
  font-size: ${(props) => props.theme.size.xxxl};
  color: ${(props) => props.theme.color.black1};
  font-weight: bold;
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

const HeaderLeft = styled.div`
  ${flex('center', 'flex-start', 'column')};
`;

const HeaderTitle = styled.div`
  font-size: ${(props) => props.theme.size.l};
`;

const ChannelName = styled.div`
  font-size: ${(props) => props.theme.size.s};
`;

const Input = styled.input`
  display: block;
  width: 100%;
  font-size: ${(props) => props.theme.size.l};
  border: 1px ${(props) => props.theme.color.gray4} solid;
  border-radius: 3px;
  width: 100%;
  height: 50px;
  padding: 0 5px;
  &:focus {
    transition: 0.3s;
    box-shadow: ${(props) => props.theme.boxShadow.skyblue};
  }
`;

const Item = styled.div`
  width: 7rem;
  padding: 5px;
  ${flex('center', 'space-between')}
`;

const UserInfo = styled.span`
  width: 7rem;
  ${flex('center', 'flex-start')}
`;

const Img = styled.img`
  display: block;
  width: 1rem;
  height: 1rem;
  border-radius: 2px;
`;

const Name = styled.div`
  font-size: 0.8rem;
  margin-left: 10px;
`;

const Remove = styled.button`
  font-size: 1rem;
  background: none;
  border: none;
  border-radius: 3px;
`;

const AddUserModal = ({
  setAddUserModalVisible,
}: {
  setAddUserModalVisible: Function;
}): React.FC | any => {
  const ref = useRef();

  const handler = () => {
    setAddUserModalVisible(false);
  };

  useOnClickOutside(ref, () => handler());

  const { current } = useChannel();

  return (
    <ModalBackground>
      <Container ref={ref}>
        <Header>
          <HeaderLeft>
            <HeaderTitle>Add People</HeaderTitle>
            <ChannelName>
              {current?.isPublic}
              {current?.name}
            </ChannelName>
          </HeaderLeft>
          <CloseButton onClick={() => setAddUserModalVisible()}>x</CloseButton>
        </Header>
        <Input />
      </Container>
    </ModalBackground>
  );
};

export default AddUserModal;
