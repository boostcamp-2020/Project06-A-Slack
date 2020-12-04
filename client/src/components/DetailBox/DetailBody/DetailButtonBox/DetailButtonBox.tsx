import React from 'react';
import styled from 'styled-components';
import { flex } from '@/styles/mixin';

const Container = styled.div`
  ${flex('center', 'space-between')}
  padding: 10px 30px;
`;

const Label = styled.label`
  ${flex('center', 'center', 'column')}
  color: ${(props) => props.theme.color.gray1};
`;

const Button = styled.button`
  ${flex()}
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: ${(props) => props.theme.color.gray3};
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
