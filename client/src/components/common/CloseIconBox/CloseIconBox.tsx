import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  &:hover,
  &:active {
    background-color: ${(props) => props.theme.color.gray5};
    path {
      fill: ${(props) => props.theme.color.black4};
    }
  }
  &:active {
    background-color: ${(props) => props.theme.color.gray4};
  }
`;

const Icon = styled.svg`
  width: 12px;
  height: 12px;
`;

const Path = styled.path`
  fill: ${(props) => props.color ?? props.theme.color.black8};
`;

const CloseIconBox: React.FC = ({ color }: PropsWithChildren<{ color?: string }>) => {
  return (
    <Container>
      <Icon version="1.1" x="0px" y="0px" viewBox="0 0 400 400">
        <Path
          color={color}
          d="M235.375,200.004L392.671,42.709c9.772-9.764,9.772-25.607,0-35.371c-9.772-9.772-25.599-9.772-35.372,0  L200.004,164.633L42.701,7.338c-9.772-9.772-25.599-9.772-35.371,0c-9.773,9.764-9.773,25.607,0,35.371l157.303,157.295  L7.33,357.299c-9.773,9.765-9.773,25.607,0,35.371c4.886,4.879,11.29,7.321,17.686,7.321s12.799-2.442,17.686-7.329l157.304-157.295  l157.294,157.295c4.887,4.887,11.291,7.329,17.686,7.329c6.396,0,12.8-2.442,17.687-7.329c9.772-9.764,9.772-25.607,0-35.371  L235.375,200.004z"
        />
      </Icon>
    </Container>
  );
};

export default CloseIconBox;
