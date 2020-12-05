import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Path = styled.path`
  stroke: ${(props) => props.color ?? props.theme.color.channelItemColor};
  fill: ${(props) => props.color ?? props.theme.color.channelItemColor};
`;

const PaperPlaneIcon = ({ color, size }: PropsWithChildren<{ color?: string; size?: string }>) => {
  return (
    <svg width={size ?? '16px'} height={size ?? '16px'} viewBox="0 0 512 512">
      <Path
        color={color}
        d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
        className=""
      />
    </svg>
  );
};

export default PaperPlaneIcon;
