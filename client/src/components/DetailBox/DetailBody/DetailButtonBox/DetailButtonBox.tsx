import React from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';

const Container = styled.div`
  ${flex('center', 'space-around')}
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${(props) => props.theme.color.lightGray2};
`;

const Label = styled.label`
  ${flex('center', 'center', 'column')}
  color: ${(props) => props.theme.color.black8};
  font-size: 0.8rem;
  font-weight: 200;
`;

const Button = styled.button`
  ${flex()}
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: none;
  outline: none;
  background-color: #f3f3f3;
  &:hover {
    background-color: ${(props) => props.theme.color.lightGray2};
  }
  &:active {
    background-color: ${(props) => props.theme.color.lightGray1};
  }
`;

export const DetailButtonBox: React.FC = () => {
  return (
    <Container>
      <Label>
        <Button />
        Add
      </Label>
      <Label>
        <Button />
        Find
      </Label>
      <Label>
        <Button />
        Call
      </Label>
      <Label>
        <Button />
        More
      </Label>
    </Container>
  );
};
