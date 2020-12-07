import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Path = styled.path`
  stroke: ${(props) => props.color ?? props.theme.color.channelItemColor};
  fill: ${(props) => props.color ?? props.theme.color.channelItemColor};
`;

const DotIcon = ({ color, size }: PropsWithChildren<{ color?: string; size?: string }>) => {
  return (
    <svg x="0px" y="0px" width={size ?? '16px'} height={size ?? '16px'} viewBox="0 0 128 512">
      <Path
        color={color}
        d="M64 208c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zM16 104c0 26.5 21.5 48 48 48s48-21.5 48-48-21.5-48-48-48-48 21.5-48 48zm0 304c0 26.5 21.5 48 48 48s48-21.5 48-48-21.5-48-48-48-48 21.5-48 48z"
      />
    </svg>
  );
};

export default DotIcon;
