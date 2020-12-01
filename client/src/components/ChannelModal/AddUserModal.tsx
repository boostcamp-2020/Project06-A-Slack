import React, { useState } from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';
import { useChannel } from '@/hooks';
import { openAddUser } from '@/store/modules/channel';
import { useDispatch } from 'react-redux';
import { JoinUser } from '@/types';

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
