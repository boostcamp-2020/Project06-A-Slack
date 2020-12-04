import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Path = styled.path`
  fill: ${(props) => props.color ?? props.theme.color.gray1};
`;

const ArrowRightIcon = ({ color, size }: PropsWithChildren<{ color?: string; size?: string }>) => {
  return (
    <svg width={size ?? '16px'} height={size ?? '16px'} viewBox="0 0 192 512">
      <Path
        color={color}
        d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"
      />
    </svg>
  );
};

export default ArrowRightIcon;
