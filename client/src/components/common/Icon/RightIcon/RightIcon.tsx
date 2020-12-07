import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Path = styled.path`
  fill: ${(props) => props.color ?? props.theme.color.black5};
`;
const RightIcon = ({ color, size }: PropsWithChildren<{ color?: string; size?: string }>) => {
  return (
    <svg width={size ?? '16px'} height={size ?? '16px'} viewBox="0 0 256 512">
      <Path
        color={color}
        d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
      />
    </svg>
  );
};

export default RightIcon;
