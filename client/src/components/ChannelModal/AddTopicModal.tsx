import React from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  ${flex()};
  background: ${(props) => props.theme.color.gray2};
`;

const Container = styled.div`
  border-radius: 10px;
  padding: 10px;
`;

const Header = styled.div`
  ${flex(undefined, 'space-between')};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.color.gray4};
`;

const HeaderContent = styled.div`
  font-size: ${(props) => props.theme.size.l};
`;

const textArea = styled.textarea`
  border-radius: 3px;
  height: 80px;
  &:focus {
    transition: 0.3s;
    box-shadow: ${(props) => props.theme.boxShadow.skyblue};
  }
`;

const ButtonBox = styled.div`
  ${flex(undefined, 'flex-end')}
`;

const CancelButton = styled.button`
  border: 1px ${(props) => props.theme.color.gray6} solid;
  border-radius: 3px;
  color: ${(props) => props.theme.color.gray2};
  background: ${(props) => props.theme.color.white};
`;
